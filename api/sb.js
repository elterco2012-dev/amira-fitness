const SB_URL = 'https://aywkeoxwybzcexaichtv.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5d2tlb3h3eWJ6Y2V4YWljaHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcyMDIsImV4cCI6MjA5MTUxMzIwMn0.BTcWM5GFj3r7hRFF-DXH9tSvoFLRjxELKZ-UQCvnUo0';

const SB_H = {
  'Content-Type': 'application/json',
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Prefer': 'return=representation'
};

async function sbGet(table, qs = '') {
  const r = await fetch(`${SB_URL}/rest/v1/${table}${qs ? '?' + qs : ''}`, { headers: SB_H });
  if (!r.ok) { const e = await r.text(); throw new Error(`GET ${table}: ${e}`); }
  return r.json();
}

async function sbUpsert(table, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...SB_H, 'Prefer': 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`UPSERT ${table}: ${e}`); }
  return r.json();
}

async function sbPatch(table, filter, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: { ...SB_H, 'Prefer': 'return=representation' },
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`PATCH ${table}: ${e}`); }
  return r.json();
}

async function sbDelete(table, filter) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE', headers: SB_H
  });
  if (!r.ok) throw new Error(`DELETE ${table} failed`);
  return true;
}
