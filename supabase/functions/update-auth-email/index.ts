const SB_URL  = Deno.env.get("SUPABASE_URL")!;
const SB_SVC  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const SB_ANON = Deno.env.get("SUPABASE_ANON_KEY")!;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "authorization, content-type, apikey, x-client-info",
};

// Verify the caller is the Amira admin account
async function isAdmin(authHeader: string | null): Promise<boolean> {
  if (!authHeader) return false;
  const token = authHeader.replace("Bearer ", "");
  const r = await fetch(`${SB_URL}/auth/v1/user`, {
    headers: { apikey: SB_ANON, Authorization: `Bearer ${token}` },
  });
  if (!r.ok) return false;
  const user = await r.json();
  return user?.email === "amiralezcano@gmail.com";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
  if (req.method !== "POST") return new Response("Method Not Allowed", { status: 405, headers: CORS });

  const auth = req.headers.get("authorization") ?? req.headers.get("Authorization");
  if (!(await isAdmin(auth))) {
    return new Response("Unauthorized", { status: 401, headers: CORS });
  }

  let oldEmail: string, newEmail: string, alumnaId: number;
  try {
    ({ old_email: oldEmail, new_email: newEmail, alumna_id: alumnaId } = await req.json());
    if (!oldEmail || !newEmail || !alumnaId) throw new Error("missing fields");
  } catch (e) {
    return Response.json({ error: "Invalid body: " + e.message }, { status: 400, headers: CORS });
  }

  if (oldEmail === newEmail) {
    return Response.json({ ok: true, note: "emails are the same" }, { headers: CORS });
  }

  try {
    // 1. Find auth user by old email
    const listRes = await fetch(`${SB_URL}/auth/v1/admin/users?page=1&per_page=1000`, {
      headers: { apikey: SB_SVC, Authorization: `Bearer ${SB_SVC}` },
    });
    const { users } = await listRes.json() as { users: Array<{ id: string; email: string }> };
    const authUser = users?.find((u) => u.email === oldEmail);

    if (!authUser) {
      // No auth account with old email — just update alumnas table
      await fetch(`${SB_URL}/rest/v1/alumnas?id=eq.${alumnaId}`, {
        method: "PATCH",
        headers: {
          apikey: SB_SVC,
          Authorization: `Bearer ${SB_SVC}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: newEmail }),
      });
      return Response.json({ ok: true, note: "no auth account found, alumnas updated" }, { headers: CORS });
    }

    // 2. Update auth user email
    const updateRes = await fetch(`${SB_URL}/auth/v1/admin/users/${authUser.id}`, {
      method: "PUT",
      headers: {
        apikey: SB_SVC,
        Authorization: `Bearer ${SB_SVC}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }),
    });
    if (!updateRes.ok) {
      const err = await updateRes.text();
      throw new Error(`Auth update failed: ${err}`);
    }

    // 3. Update alumnas table
    await fetch(`${SB_URL}/rest/v1/alumnas?id=eq.${alumnaId}`, {
      method: "PATCH",
      headers: {
        apikey: SB_SVC,
        Authorization: `Bearer ${SB_SVC}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email: newEmail }),
    });

    console.log(`Email updated: ${oldEmail} → ${newEmail} (auth user ${authUser.id})`);
    return Response.json({ ok: true, updated_auth_id: authUser.id }, { headers: CORS });

  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("update-auth-email error:", msg);
    return Response.json({ error: msg }, { status: 500, headers: CORS });
  }
});
