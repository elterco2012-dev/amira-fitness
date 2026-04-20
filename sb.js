const SB_URL = 'https://aywkeoxwybzcexaichtv.supabase.co';
const SB_KEY = 'sb_publishable_8j3ihLED6ui6L32T0QQ5EQ_soH0TSQb';

// Usa el JWT de sesión si está disponible, cae a la anon key si no
function getSBH(extra) {
  const token = localStorage.getItem('af-access-token') || SB_KEY;
  return {
    'Content-Type': 'application/json',
    'apikey': SB_KEY,
    'Authorization': `Bearer ${token}`,
    'Prefer': 'return=representation',
    ...extra
  };
}

// Columnas del unique constraint por tabla
const ON_CONFLICT = {
  rutinas:              'alumna_id,ciclo,semana,dia',
  alumnas:              'id',
  ejercicios_biblioteca:'id',
  plantillas:           'id',
  progreso:             'alumna_id,ciclo,semana,dia,ejercicio_idx',
  registros:            'id',
  comentarios:          'id',
  push_subscriptions:   'alumna_id',
  pagos:                'alumna_id,mes',
};

async function sbGet(table, qs = '') {
  const r = await fetch(`${SB_URL}/rest/v1/${table}${qs ? '?' + qs : ''}`, { headers: getSBH() });
  if (!r.ok) { const e = await r.text(); throw new Error(`GET ${table}: ${e}`); }
  return r.json();
}

async function sbUpsert(table, body) {
  const conflict = ON_CONFLICT[table] || 'id';
  const url = `${SB_URL}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`;
  const r = await fetch(url, {
    method: 'POST',
    headers: getSBH({ 'Prefer': 'resolution=merge-duplicates,return=representation' }),
    body: JSON.stringify(body)
  });
  if (!r.ok) {
    const e = await r.text();
    console.error(`UPSERT ${table} error:`, e);
    throw new Error(`UPSERT ${table}: ${e}`);
  }
  return r.json();
}

async function sbInsert(table, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: getSBH({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`INSERT ${table}: ${e}`); }
  return r.json();
}

async function sbPatch(table, filter, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: getSBH({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`PATCH ${table}: ${e}`); }
  return r.json();
}

async function sbDelete(table, filter) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE', headers: getSBH()
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`DELETE ${table}: ${e}`); }
  return true;
}
