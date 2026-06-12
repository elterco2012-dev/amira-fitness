/* global React */
const { useState } = React;

// ─── Dashboard ─────────────────────────────────────────────────────────────
function Dashboard() {
  return (
    <div>
      <h1 className="serif" style={{ fontSize: '1.6rem', marginBottom: '1.25rem' }}>Inicio</h1>
      <div style={dbStyles.metrics}>
        <Metric label="Alumnas activas" value="12" green />
        <Metric label="Pendientes" value="3" />
        <Metric label="Esta semana" value="84%" green />
        <Metric label="Comentarios sin leer" value="5" />
      </div>
      <Card title="Próximos recordatorios">
        <div style={{ fontSize: 13, color: 'var(--tm)', lineHeight: 1.7 }}>
          <Row left="Lunes 9:00 — Recordatorio de entrenamiento" right="12 alumnas" />
          <Row left="Miércoles 9:00 — Recordatorio de entrenamiento" right="12 alumnas" />
          <Row left="Domingo 10:00 — Resumen semanal" right="12 alumnas" />
        </div>
      </Card>
      <Card title="Registros pendientes">
        <div style={{ fontSize: 13, color: 'var(--tm)' }}>
          3 alumnas nuevas esperando aprobación. <a style={{ color: 'var(--v)', fontWeight: 500 }} href="#">Ver registros →</a>
        </div>
      </Card>
    </div>
  );
}

function Metric({ label, value, green }) {
  return (
    <div style={dbStyles.metric}>
      <div style={dbStyles.mlabel}>{label}</div>
      <div className="serif" style={{ fontSize: '2rem', color: green ? 'var(--vd)' : 'var(--t)', lineHeight: 1 }}>{value}</div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div style={dbStyles.card}>
      <div style={dbStyles.ctitle}>{title}</div>
      {children}
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--b)', fontSize: 13 }}>
      <span style={{ color: 'var(--t)' }}>{left}</span>
      <span style={{ color: 'var(--tm)' }}>{right}</span>
    </div>
  );
}

const dbStyles = {
  metrics: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: '1.5rem' },
  metric: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--rs)', padding: '1rem 1.25rem' },
  mlabel: { fontSize: 11, color: 'var(--tm)', marginBottom: 4 },
  card: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1.25rem 1.5rem', marginBottom: '1rem' },
  ctitle: { fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' },
};

// ─── AlumnasList ───────────────────────────────────────────────────────────
const ALUMNAS = [
  { id: 1, nombre: 'María González', tipo: 'Gimnasio · 3 días/sem', av: 'teal', estado: 'Activa', ciclo: 3 },
  { id: 2, nombre: 'Lucía Pérez', tipo: 'Casa · 4 días/sem', av: 'purple', estado: 'Activa', ciclo: 2 },
  { id: 3, nombre: 'Sofía Martínez', tipo: 'Gimnasio · 5 días/sem', av: 'amber', estado: 'Activa', ciclo: 5 },
  { id: 4, nombre: 'Camila Ruiz', tipo: 'Casa · 2 días/sem', av: 'coral', estado: 'Pausada', ciclo: 1 },
  { id: 5, nombre: 'Valentina Sosa', tipo: 'Gimnasio · 3 días/sem', av: 'teal', estado: 'Activa', ciclo: 4 },
  { id: 6, nombre: 'Florencia López', tipo: 'Casa · 4 días/sem', av: 'purple', estado: 'Pendiente', ciclo: 0 },
];

function AlumnasList({ onOpen }) {
  const [filter, setFilter] = useState('Todas');
  const filtered = ALUMNAS.filter(a => filter === 'Todas' ? true : a.estado === filter);

  return (
    <div>
      <h1 className="serif" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Alumnas</h1>
      <div style={alStyles.toolbar}>
        <div style={alStyles.chips}>
          {['Todas', 'Activa', 'Pausada', 'Pendiente'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...alStyles.chip, ...(filter === f ? alStyles.chipOn : {}) }}>{f}</button>
          ))}
        </div>
        <button style={alStyles.cta}>+ Nueva alumna</button>
      </div>
      <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '0.5rem 1.25rem' }}>
        {filtered.map(a => (
          <button key={a.id} onClick={() => onOpen(a)} style={alStyles.row}>
            <div style={{ ...alStyles.av, ...avBg(a.av) }}>{a.nombre[0]}</div>
            <div style={{ flex: 1, textAlign: 'left' }}>
              <div style={alStyles.name}>{a.nombre}</div>
              <div style={alStyles.sub}>{a.tipo} · Ciclo {a.ciclo}</div>
            </div>
            <span style={{ ...alStyles.badge, ...stateBadge(a.estado) }}>{a.estado}</span>
            <span style={{ color: 'var(--th)', fontSize: 16, marginLeft: 8 }}>›</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function avBg(c) {
  return ({
    teal:    { background: 'var(--vl)', color: 'var(--vd)' },
    purple:  { background: 'var(--p)', color: 'var(--pd)' },
    amber:   { background: 'var(--a)', color: 'var(--ad)' },
    coral:   { background: 'var(--co)', color: 'var(--cod)' },
  })[c];
}
function stateBadge(s) {
  if (s === 'Activa') return { background: 'var(--vl)', color: 'var(--vd)' };
  if (s === 'Pausada') return { background: 'var(--p)', color: 'var(--pd)' };
  return { background: 'var(--a)', color: 'var(--ad)' };
}

const alStyles = {
  toolbar: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', gap: 12, flexWrap: 'wrap' },
  chips: { display: 'flex', gap: 5, flexWrap: 'wrap' },
  chip: { padding: '5px 13px', borderRadius: 'var(--rp)', fontSize: 11, border: '1px solid var(--bm)', background: 'var(--s)', color: 'var(--tm)' },
  chipOn: { background: 'var(--p)', color: 'var(--pd)', borderColor: 'transparent', fontWeight: 500 },
  cta: { background: 'var(--v)', color: 'white', borderRadius: 'var(--rp)', padding: '8px 18px', fontSize: 12, fontWeight: 500 },
  row: { display: 'flex', alignItems: 'center', gap: 12, padding: '0.75rem 0', borderBottom: '1px solid var(--b)', width: '100%', background: 'none' },
  av: { width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 16, flexShrink: 0 },
  name: { fontSize: 14, fontWeight: 500, color: 'var(--t)' },
  sub: { fontSize: 11, color: 'var(--tm)', marginTop: 2 },
  badge: { fontSize: 10, padding: '2px 9px', borderRadius: 'var(--rp)', fontWeight: 500 },
};

Object.assign(window, { Dashboard, AlumnasList });
