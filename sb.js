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

// Supabase corta cada respuesta en 1000 filas y no avisa: pedir limit=5000
// devuelve 1000 y el cliente cree que no hay más. Como el panel carga tablas
// enteras y varias ya pasaron ese tope (rutinas, progreso), las últimas filas
// desaparecían — y las rutinas de las alumnas más nuevas se veían vacías.
// Por eso sbGet trae de a páginas hasta juntar todo lo pedido.
const SB_PAGE = 1000;

async function sbGet(table, qs = '') {
  // El limit/offset del llamador los maneja la paginación; el resto del query
  // se deja tal cual para no alterar filtros, select ni order.
  const mLim = /(?:^|&)limit=(\d+)/.exec(qs);
  const mOff = /(?:^|&)offset=(\d+)/.exec(qs);
  const pedido = mLim ? parseInt(mLim[1], 10) : Infinity;
  const desde  = mOff ? parseInt(mOff[1], 10) : 0;
  const resto  = qs.replace(/(?:^|&)(?:limit|offset)=\d+/g, '').replace(/^&+/, '');

  const filas = [];
  while (filas.length < pedido) {
    const tam = Math.min(SB_PAGE, pedido - filas.length);
    const q = [resto, `limit=${tam}`, `offset=${desde + filas.length}`].filter(Boolean).join('&');
    const r = await fetch(`${SB_URL}/rest/v1/${table}?${q}`, { headers: getSBH() });
    if (!r.ok) { const e = await r.text(); throw new Error(`GET ${table}: ${e}`); }
    const page = await r.json();
    if (!Array.isArray(page)) return page;
    filas.push(...page);
    if (page.length < tam) break; // última página
  }
  return filas;
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
