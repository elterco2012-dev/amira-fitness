/* global React */

// ─── Sidebar ───────────────────────────────────────────────────────────────
function Sidebar({ active, onChange }) {
  const items = [
    { sec: 'PRINCIPAL' },
    { id: 'inicio', icon: '🏠', label: 'Inicio' },
    { id: 'alumnas', icon: '👥', label: 'Alumnas', badge: 3 },
    { id: 'rutinas', icon: '📋', label: 'Rutinas' },
    { id: 'biblioteca', icon: '📚', label: 'Biblioteca' },
    { sec: 'GESTIÓN' },
    { id: 'registros', icon: '📝', label: 'Registros' },
    { id: 'mensajes', icon: '💬', label: 'Mensajes' },
    { id: 'config', icon: '⚙️', label: 'Configuración' },
  ];
  return (
    <aside style={sbStyles.bar}>
      <div style={sbStyles.brand}>
        <div style={sbStyles.logo}>A</div>
        <div>
          <strong style={sbStyles.name}>Amira Fitness</strong>
          <span style={sbStyles.role}>Panel · Profesora</span>
        </div>
      </div>
      {items.map((it, i) => it.sec ? (
        <div key={i} style={sbStyles.sec}>{it.sec}</div>
      ) : (
        <button key={it.id} onClick={() => onChange(it.id)} style={{ ...sbStyles.nav, ...(active === it.id ? sbStyles.navActive : {}) }}>
          <span style={sbStyles.icon}>{it.icon}</span>
          <span style={{ flex: 1 }}>{it.label}</span>
          {it.badge && <span style={sbStyles.badge}>{it.badge}</span>}
        </button>
      ))}
      <div style={sbStyles.bot}>
        <div style={sbStyles.conn}>
          <span style={{ ...sbStyles.dot, background: 'var(--v)' }} />
          Conectado · Supabase
        </div>
        <div style={{ fontSize: 10, color: 'var(--th)', padding: '0 12px' }}>v1.4.0</div>
      </div>
    </aside>
  );
}

const sbStyles = {
  bar: { width: 230, flexShrink: 0, background: 'var(--s)', borderRight: '1px solid var(--b)', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: 2, minHeight: '100vh' },
  brand: { display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem', padding: '0 0.5rem' },
  logo: { width: 34, height: 34, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 14, color: 'var(--vd)' },
  name: { fontSize: 14, fontWeight: 500, display: 'block', color: 'var(--t)' },
  role: { fontSize: 11, color: 'var(--tm)' },
  nav: { display: 'flex', alignItems: 'center', gap: 8, padding: '0.55rem 0.75rem', borderRadius: 'var(--rs)', fontSize: 13, color: 'var(--tm)', width: '100%', textAlign: 'left', transition: 'all .15s var(--ease)' },
  navActive: { background: 'var(--vl)', color: 'var(--vd)', fontWeight: 500 },
  icon: { width: 18, textAlign: 'center', fontSize: 14 },
  sec: { fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--th)', padding: '0.4rem 0.75rem 0.2rem', marginTop: '0.5rem' },
  badge: { background: 'var(--rd)', color: 'white', borderRadius: 99, fontSize: 10, padding: '1px 6px' },
  bot: { marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 3, paddingTop: 12, borderTop: '1px solid var(--b)' },
  conn: { display: 'flex', alignItems: 'center', gap: 6, padding: '0.4rem 0.75rem', fontSize: 11, color: 'var(--tm)' },
  dot: { width: 7, height: 7, borderRadius: '50%', flexShrink: 0 },
};

// ─── LoginScreen ───────────────────────────────────────────────────────────
function LoginScreen({ onSubmit }) {
  const [v, setV] = React.useState('');
  const [err, setErr] = React.useState(false);
  function go(e) {
    e?.preventDefault();
    if (v === 'amira') { onSubmit(); }
    else setErr(true);
  }
  return (
    <div style={lgStyles.wrap}>
      <form onSubmit={go} style={lgStyles.box}>
        <div style={lgStyles.logo}>A</div>
        <h2 className="serif" style={lgStyles.title}>Panel de Amira</h2>
        <p style={lgStyles.sub}>Ingresá tu contraseña para continuar</p>
        <input type="password" placeholder="Contraseña" style={lgStyles.input} value={v}
               onChange={e => { setV(e.target.value); setErr(false); }} autoFocus />
        <button type="submit" style={lgStyles.btn}>Entrar</button>
        {err && <div style={lgStyles.err}>Contraseña incorrecta. Probá <em>"amira"</em>.</div>}
      </form>
    </div>
  );
}

const lgStyles = {
  wrap: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' },
  box: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '2rem', width: '100%', maxWidth: 340, textAlign: 'center' },
  logo: { width: 60, height: 60, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 24, color: 'var(--vd)', margin: '0 auto 1rem' },
  title: { fontSize: '1.5rem', marginBottom: '0.25rem' },
  sub: { fontSize: 13, color: 'var(--tm)', marginBottom: '1.5rem' },
  input: { width: '100%', padding: '10px 14px', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', fontSize: 14, background: 'var(--s2)', marginBottom: 10, textAlign: 'center' },
  btn: { width: '100%', padding: 10, background: 'var(--v)', color: 'white', borderRadius: 'var(--rs)', fontSize: 14, fontWeight: 500 },
  err: { fontSize: 12, color: 'var(--rd)', marginTop: 8 },
};

Object.assign(window, { Sidebar, LoginScreen });
