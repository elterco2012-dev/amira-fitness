// supabase.js — cliente compartido
const SB_URL = 'https://aywkeoxwybzcexaichtv.supabase.co';
const SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5d2tlb3h3eWJ6Y2V4YWljaHR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MzcyMDIsImV4cCI6MjA5MTUxMzIwMn0.BTcWM5GFj3r7hRFF-DXH9tSvoFLRjxELKZ-UQCvnUo0';

const SB_HEADERS = {
  'Content-Type': 'application/json',
  'apikey': SB_KEY,
  'Authorization': `Bearer ${SB_KEY}`,
  'Prefer': 'return=representation'
};

async function sbGet(table, params = '') {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?${params}`, {
    headers: SB_HEADERS
  });
  if (!res.ok) throw new Error(`sbGet ${table} failed: ${res.status}`);
  return res.json();
}

async function sbPost(table, body) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'return=representation,resolution=merge-duplicates' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`sbPost ${table} failed: ${res.status}`);
  return res.json();
}

async function sbPatch(table, filter, body) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: SB_HEADERS,
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`sbPatch ${table} failed: ${res.status}`);
  return res.json();
}

async function sbDelete(table, filter) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE',
    headers: SB_HEADERS
  });
  if (!res.ok) throw new Error(`sbDelete ${table} failed`);
  return true;
}

async function sbUpsert(table, body) {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: { ...SB_HEADERS, 'Prefer': 'resolution=merge-duplicates,return=representation' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`sbUpsert ${table} failed: ${res.status}`);
  return res.json();
}
