const SB_URL = 'https://aywkeoxwybzcexaichtv.supabase.co';
const SB_KEY = 'sb_publishable_8j3ihLED6ui6L32T0QQ5EQ_soH0TSQb';

// Usa el JWT de sesión solo si todavía es válido; si venció o no hay sesión usa SB_KEY
function getSBH(extra) {
  const stored = localStorage.getItem('af-access-token');
  const expires = parseInt(localStorage.getItem('af-token-expires') || '0');
  const token = (stored && Date.now() < expires) ? stored : SB_KEY;
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
  push_subscriptions:        'endpoint',
  amira_push_subscriptions:  'endpoint',
  pagos:                'alumna_id,mes',
  peso_alumna:          'alumna_id,fecha',
  notas_sesion:         'id',
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
  const rows = await r.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function sbInsert(table, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: getSBH({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`INSERT ${table}: ${e}`); }
  const rows = await r.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function sbPatch(table, filter, body) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'PATCH',
    headers: getSBH({ 'Prefer': 'return=representation' }),
    body: JSON.stringify(body)
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`PATCH ${table}: ${e}`); }
  const rows = await r.json();
  return Array.isArray(rows) ? rows[0] : rows;
}

async function sbDelete(table, filter) {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?${filter}`, {
    method: 'DELETE', headers: getSBH()
  });
  if (!r.ok) { const e = await r.text(); throw new Error(`DELETE ${table}: ${e}`); }
  return true;
}

// Llama al edge function notify-amira directamente desde el cliente.
// Más confiable que los Supabase Webhooks (que requieren configuración manual y pueden fallar silenciosamente).
function sbNotifyAmira(table, record) {
  if (!record) return;
  const stored = localStorage.getItem('af-alumna-token') || localStorage.getItem('af-access-token');
  const tok = stored || SB_KEY;
  fetch(`${SB_URL}/functions/v1/notify-amira`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SB_KEY,
      'Authorization': `Bearer ${tok}`
    },
    body: JSON.stringify({ type: 'INSERT', table, record })
  }).catch(() => {});
}
