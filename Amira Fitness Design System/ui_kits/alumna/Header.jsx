/* global React */

// ─── Header ────────────────────────────────────────────────────────────────
function Header({ name = 'María', dayLabel = 'Día 2', subtitle = 'Semana 2 · Ciclo 3', theme, onToggleTheme }) {
  return (
    <header style={headerStyles.bar}>
      <div style={headerStyles.logo}>A</div>
      <div style={headerStyles.txt}>
        <h1 style={headerStyles.title}>{name} · {dayLabel}</h1>
        <p style={headerStyles.sub}>{subtitle}</p>
      </div>
      <button style={headerStyles.btn} onClick={onToggleTheme} aria-label="Cambiar tema">
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </header>
  );
}

const headerStyles = {
  bar: { background: 'var(--s)', borderBottom: '1px solid var(--b)', padding: '0.9rem 1.25rem', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 0, zIndex: 20 },
  logo: { width: 34, height: 34, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 14, color: 'var(--vd)', flexShrink: 0 },
  txt: { flex: 1 },
  title: { fontSize: 14, fontWeight: 500, color: 'var(--t)' },
  sub: { fontSize: 11, color: 'var(--tm)' },
  btn: { background: 'none', border: '1px solid var(--bm)', borderRadius: 20, padding: '4px 10px', fontSize: 13, color: 'var(--tm)' },
};

// ─── BottomNav ─────────────────────────────────────────────────────────────
function BottomNav({ active, onChange }) {
  const items = [
    { id: 'rutina', emoji: '🏋️', label: 'Rutina' },
    { id: 'progreso', emoji: '📈', label: 'Progreso' },
    { id: 'notas', emoji: '💬', label: 'Notas' },
    { id: 'perfil', emoji: '👤', label: 'Perfil' },
  ];
  return (
    <nav style={bnavStyles.wrap}>
      {items.map(it => (
        <button key={it.id} onClick={() => onChange(it.id)} style={bnavStyles.item}>
          <span style={bnavStyles.emoji}>{it.emoji}</span>
          <span style={{ ...bnavStyles.label, color: active === it.id ? 'var(--v)' : 'var(--tm)', fontWeight: active === it.id ? 500 : 400 }}>
            {it.label}
          </span>
        </button>
      ))}
    </nav>
  );
}

const bnavStyles = {
  wrap: { position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 430, margin: '0 auto', background: 'var(--s)', borderTop: '1px solid var(--b)', display: 'flex', zIndex: 25 },
  item: { flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, padding: '10px 4px' },
  emoji: { fontSize: 18 },
  label: { fontSize: 10 },
};

Object.assign(window, { Header, BottomNav });
