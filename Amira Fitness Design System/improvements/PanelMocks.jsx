/* global React, Icon */

// ─── Desktop frame ─────────────────────────────────────────────────────────
function Desktop({ children, width = 980, height = 620, style }) {
  return (
    <div data-theme="light" style={{ width, height, background: 'var(--bg)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 18px 60px rgba(0,0,0,.10)', display: 'flex', ...style }}>
      {children}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. SIDEBAR — Emoji + filled-active vs Lucide + edge-bar-active
// ════════════════════════════════════════════════════════════════════════════
function SidebarBefore() {
  const items = [
    { sec: 'PRINCIPAL' },
    { e: '🏠', l: 'Inicio' },
    { e: '👥', l: 'Alumnas', on: true, badge: 3 },
    { e: '📋', l: 'Rutinas' },
    { e: '📚', l: 'Biblioteca' },
    { sec: 'GESTIÓN' },
    { e: '📝', l: 'Registros' },
    { e: '💬', l: 'Mensajes' },
    { e: '⚙️', l: 'Configuración' },
  ];
  return (
    <aside style={{ width: 220, background: 'var(--s)', borderRight: '1px solid var(--b)', padding: '18px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, padding: '0 6px' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 13, color: 'var(--vd)' }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500 }}>Amira Fitness</div>
          <div style={{ fontSize: 10, color: 'var(--tm)' }}>Panel · Profesora</div>
        </div>
      </div>
      {items.map((it, i) => it.sec ? (
        <div key={i} style={{ fontSize: 9, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--th)', padding: '6px 9px 3px', marginTop: 6 }}>{it.sec}</div>
      ) : (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 9px', borderRadius: 10, fontSize: 12, color: it.on ? 'var(--vd)' : 'var(--tm)', background: it.on ? 'var(--vl)' : 'transparent', fontWeight: it.on ? 500 : 400 }}>
          <span style={{ width: 16, textAlign: 'center', fontSize: 13 }}>{it.e}</span>
          <span style={{ flex: 1 }}>{it.l}</span>
          {it.badge && <span style={{ background: 'var(--rd)', color: 'white', borderRadius: 99, fontSize: 9, padding: '1px 5px' }}>{it.badge}</span>}
        </div>
      ))}
      <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--b)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 9px', fontSize: 10, color: 'var(--tm)' }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--v)' }} />
          Conectado · Supabase
        </div>
        <div style={{ fontSize: 9, color: 'var(--th)', padding: '0 9px' }}>v1.4.0</div>
      </div>
    </aside>
  );
}

function SidebarAfter() {
  const items = [
    { sec: 'PRINCIPAL' },
    { i: 'home', l: 'Inicio' },
    { i: 'users', l: 'Alumnas', on: true, badge: 3 },
    { i: 'clipboard', l: 'Rutinas' },
    { i: 'library', l: 'Biblioteca' },
    { sec: 'GESTIÓN' },
    { i: 'inbox', l: 'Registros' },
    { i: 'msgcircle', l: 'Mensajes' },
    { i: 'settings', l: 'Configuración' },
  ];
  return (
    <aside style={{ width: 220, background: 'var(--s)', borderRight: '1px solid var(--b)', padding: '18px 10px', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, padding: '0 8px' }}>
        <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 13, color: 'var(--vd)' }}>A</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>Amira Fitness</div>
          <div style={{ fontSize: 10, color: 'var(--tm)' }}>Panel · Profesora</div>
        </div>
      </div>
      {items.map((it, i) => it.sec ? (
        <div key={i} style={{ fontSize: 10, letterSpacing: '.8px', textTransform: 'uppercase', color: 'var(--tm)', padding: '12px 11px 4px', marginTop: 4, fontWeight: 500 }}>{it.sec}</div>
      ) : (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 11px', borderRadius: 8, fontSize: 13, color: it.on ? 'var(--t)' : 'var(--tm)', fontWeight: it.on ? 500 : 400, position: 'relative', background: it.on ? 'var(--s2)' : 'transparent' }}>
          {it.on && <span style={{ position: 'absolute', left: -10, top: 6, bottom: 6, width: 3, background: 'var(--v)', borderRadius: '0 3px 3px 0' }} />}
          <Icon name={it.i} size={15} stroke={it.on ? 'var(--v)' : 'var(--tm)'} strokeWidth={it.on ? 2 : 1.6} />
          <span style={{ flex: 1 }}>{it.l}</span>
          {it.badge && <span style={{ background: 'var(--rd)', color: 'white', borderRadius: 99, fontSize: 9, padding: '1px 6px', fontWeight: 600 }}>{it.badge}</span>}
        </div>
      ))}
      <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--b)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 11px', fontSize: 10, color: 'var(--tm)' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--v)' }} />
          Sincronizado
        </div>
      </div>
    </aside>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. ALUMNAS LIST — Plain vs Search+activity
// ════════════════════════════════════════════════════════════════════════════
const ROWS = [
  { n: 'María González', s: 'Gimnasio · 3 días/sem · Ciclo 3', av: 'teal', est: 'Activa', last: 'hace 2h' },
  { n: 'Lucía Pérez', s: 'Casa · 4 días/sem · Ciclo 2', av: 'purple', est: 'Activa', last: 'ayer' },
  { n: 'Sofía Martínez', s: 'Gimnasio · 5 días/sem · Ciclo 5', av: 'amber', est: 'Activa', last: 'hace 3h' },
  { n: 'Camila Ruiz', s: 'Casa · 2 días/sem · Ciclo 1', av: 'coral', est: 'Pausada', last: 'hace 8 días', stale: true },
  { n: 'Valentina Sosa', s: 'Gimnasio · 3 días/sem · Ciclo 4', av: 'teal', est: 'Activa', last: 'hace 5h' },
];
const AV_BG = { teal: { bg: 'var(--vl)', fg: 'var(--vd)' }, purple: { bg: 'var(--p)', fg: 'var(--pd)' }, amber: { bg: 'var(--a)', fg: 'var(--ad)' }, coral: { bg: 'var(--co)', fg: 'var(--cod)' } };

function AlumnasBefore() {
  return (
    <div style={{ flex: 1, padding: '24px 28px', overflow: 'hidden' }}>
      <h1 className="serif" style={{ fontSize: '1.5rem', marginBottom: 14 }}>Alumnas</h1>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, gap: 12, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          {['Todas', 'Activa', 'Pausada', 'Pendiente'].map((f, i) => (
            <button key={f} style={{ padding: '5px 13px', borderRadius: 30, fontSize: 11, border: i === 0 ? 'none' : '1px solid var(--bm)', background: i === 0 ? 'var(--p)' : 'var(--s)', color: i === 0 ? 'var(--pd)' : 'var(--tm)', fontWeight: i === 0 ? 500 : 400 }}>{f}</button>
          ))}
        </div>
        <button style={{ background: 'var(--v)', color: 'white', borderRadius: 30, padding: '7px 16px', fontSize: 12, border: 'none', fontWeight: 500 }}>+ Nueva alumna</button>
      </div>
      <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 14, padding: '0 18px' }}>
        {ROWS.slice(0, 4).map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: i < 3 ? '1px solid var(--b)' : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', ...AV_BG[r.av], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 14, color: AV_BG[r.av].fg }}>{r.n[0]}</div>
            <div style={{ flex: 1, color: AV_BG[r.av].fg }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t)' }}>{r.n}</div>
              <div style={{ fontSize: 10, color: 'var(--tm)' }}>{r.s}</div>
            </div>
            <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 30, fontWeight: 500, background: r.est === 'Activa' ? 'var(--vl)' : 'var(--p)', color: r.est === 'Activa' ? 'var(--vd)' : 'var(--pd)' }}>{r.est}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlumnasAfter() {
  return (
    <div style={{ flex: 1, padding: '24px 28px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h1 className="serif" style={{ fontSize: '1.6rem', marginBottom: 2 }}>Alumnas</h1>
          <div style={{ fontSize: 11, color: 'var(--tm)' }}>12 activas · 3 pendientes · 1 pausada</div>
        </div>
        <button style={{ background: 'var(--v)', color: 'white', borderRadius: 8, padding: '8px 14px', fontSize: 12, border: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>+ Nueva alumna</button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Icon name="search" size={14} stroke="var(--tm)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
          <input placeholder="Buscar alumna…" style={{ width: '100%', padding: '8px 12px 8px 32px', border: '1px solid var(--bm)', borderRadius: 8, fontSize: 12, background: 'var(--s)', color: 'var(--t)' }} />
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {['Todas', 'Activa', 'Pausada'].map((f, i) => (
            <button key={f} style={{ padding: '6px 11px', borderRadius: 8, fontSize: 11, border: '1px solid var(--bm)', background: i === 0 ? 'var(--t)' : 'var(--s)', color: i === 0 ? 'white' : 'var(--tm)', fontWeight: i === 0 ? 500 : 400 }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 80px', gap: 10, padding: '8px 16px', background: 'var(--s2)', fontSize: 9, fontWeight: 600, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
          <div></div>
          <div>Alumna</div>
          <div>Última actividad</div>
          <div>Estado</div>
        </div>
        {ROWS.map((r, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 110px 80px', gap: 10, padding: '11px 16px', borderTop: '1px solid var(--b)', alignItems: 'center' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', ...AV_BG[r.av], display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 13, color: AV_BG[r.av].fg }}>{r.n[0]}</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t)' }}>{r.n}</div>
              <div style={{ fontSize: 10, color: 'var(--tm)', marginTop: 1 }}>{r.s}</div>
            </div>
            <div style={{ fontSize: 11, color: r.stale ? 'var(--rd)' : 'var(--tm)', fontWeight: r.stale ? 500 : 400 }}>
              {r.stale && '⚠ '}{r.last}
            </div>
            <span style={{ fontSize: 10, padding: '3px 8px', borderRadius: 99, fontWeight: 600, background: r.est === 'Activa' ? 'var(--vl)' : 'var(--p)', color: r.est === 'Activa' ? 'var(--vd)' : 'var(--pd)', justifySelf: 'start' }}>{r.est}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. FULL PANEL — Before / After (sidebar + main combined)
// ════════════════════════════════════════════════════════════════════════════
function PanelBefore() {
  return (
    <Desktop>
      <SidebarBefore />
      <AlumnasBefore />
    </Desktop>
  );
}

function PanelAfter() {
  return (
    <Desktop>
      <SidebarAfter />
      <AlumnasAfter />
    </Desktop>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. METRIC CARD — Static number vs Trend + sparkline
// ════════════════════════════════════════════════════════════════════════════
function MetricBefore() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {[['Alumnas activas', '12', true], ['Pendientes', '3'], ['Esta semana', '84%', true], ['Sin leer', '5']].map(([l, v, g], i) => (
        <div key={i} style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 10, padding: '14px 16px' }}>
          <div style={{ fontSize: 10, color: 'var(--tm)', marginBottom: 4 }}>{l}</div>
          <div className="serif" style={{ fontSize: '1.8rem', color: g ? 'var(--vd)' : 'var(--t)', lineHeight: 1 }}>{v}</div>
        </div>
      ))}
    </div>
  );
}

function MetricAfter() {
  const data = [
    { l: 'Alumnas activas', v: '12', d: '+2 esta semana', g: true, spark: [3, 5, 4, 7, 8, 9, 10, 12] },
    { l: 'Pendientes', v: '3', d: 'sin cambio', spark: [3, 4, 2, 3, 3, 4, 3, 3] },
    { l: 'Adherencia', v: '84%', d: '+6% vs últ. sem', g: true, spark: [70, 72, 75, 80, 78, 81, 84, 84] },
    { l: 'Sin leer', v: '5', d: '−2 desde ayer', g: true, spark: [9, 8, 8, 7, 6, 7, 7, 5] },
  ];
  function Sparkline({ pts, color }) {
    const max = Math.max(...pts), min = Math.min(...pts), range = max - min || 1;
    const w = 80, h = 26;
    const path = pts.map((p, i) => `${(i / (pts.length - 1)) * w},${h - ((p - min) / range) * h}`).join(' L ');
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ position: 'absolute', right: 12, top: 14, opacity: .25 }}>
        <path d={`M ${path}`} stroke={color} strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {data.map((m, i) => (
        <div key={i} style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 12, padding: '14px 16px', position: 'relative', overflow: 'hidden' }}>
          <Sparkline pts={m.spark} color={m.g ? 'var(--v)' : 'var(--tm)'} />
          <div style={{ fontSize: 10, color: 'var(--tm)', marginBottom: 4, fontWeight: 500 }}>{m.l}</div>
          <div className="serif" style={{ fontSize: '1.8rem', color: m.g ? 'var(--vd)' : 'var(--t)', lineHeight: 1, marginBottom: 4 }}>{m.v}</div>
          <div style={{ fontSize: 10, color: m.g ? 'var(--vd)' : 'var(--tm)', fontWeight: 500 }}>{m.d}</div>
        </div>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. LOGIN — One password vs Real login
// ════════════════════════════════════════════════════════════════════════════
function LoginBefore() {
  return (
    <div style={{ width: 420, padding: 40, background: 'var(--s)', borderRadius: 14, border: '1px solid var(--b)', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,.05)' }}>
      <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'var(--vd)', margin: '0 auto 16px' }}>A</div>
      <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: 4 }}>Panel de Amira</h2>
      <p style={{ fontSize: 12, color: 'var(--tm)', marginBottom: 20 }}>Ingresá tu contraseña para continuar</p>
      <input type="password" placeholder="Contraseña" style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--bm)', borderRadius: 10, fontSize: 13, background: 'var(--s2)', marginBottom: 10, textAlign: 'center' }} />
      <button style={{ width: '100%', padding: 10, background: 'var(--v)', color: 'white', borderRadius: 10, fontSize: 13, fontWeight: 500, border: 'none' }}>Entrar</button>
    </div>
  );
}

function LoginAfter() {
  return (
    <div style={{ width: 420, padding: 36, background: 'var(--s)', borderRadius: 14, border: '1px solid var(--b)', boxShadow: '0 8px 30px rgba(0,0,0,.05)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <img src="../assets/foto-amira.jpg" alt="" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', objectPosition: 'center 70%' }} />
        <div>
          <h2 className="serif" style={{ fontSize: '1.4rem', lineHeight: 1, marginBottom: 4 }}>Hola, Amira</h2>
          <p style={{ fontSize: 12, color: 'var(--tm)' }}>Bienvenida de vuelta</p>
        </div>
      </div>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontSize: 11, color: 'var(--tm)', display: 'block', marginBottom: 5, fontWeight: 500 }}>Email</label>
        <input value="amira@amirafitness.com" readOnly style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--bm)', borderRadius: 8, fontSize: 12, background: 'var(--s2)', color: 'var(--t)' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <label style={{ fontSize: 11, color: 'var(--tm)', fontWeight: 500 }}>Contraseña</label>
          <a style={{ fontSize: 11, color: 'var(--v)', textDecoration: 'none', fontWeight: 500 }}>¿Olvidaste tu contraseña?</a>
        </div>
        <input type="password" value="●●●●●●●●" readOnly style={{ width: '100%', padding: '9px 12px', border: '1px solid var(--bm)', borderRadius: 8, fontSize: 12, background: 'var(--s2)', color: 'var(--t)' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 12, color: 'var(--tm)' }}>
        <span style={{ width: 16, height: 16, borderRadius: 4, background: 'var(--v)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Icon name="check" size={11} strokeWidth={3} />
        </span>
        Mantenerme conectada
      </div>
      <button style={{ width: '100%', padding: '11px', background: 'var(--v)', color: 'white', borderRadius: 8, fontSize: 13, fontWeight: 600, border: 'none' }}>Entrar al panel</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6. DRAWER HEADER — Plain vs Overflow menu + photo avatar
// ════════════════════════════════════════════════════════════════════════════
function DrawerBefore() {
  return (
    <div style={{ width: 480, background: 'var(--s)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--b)' }}>
      <div style={{ padding: '18px 22px 0', borderBottom: '1px solid var(--b)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--vl)', color: 'var(--vd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 18 }}>M</div>
            <div>
              <div className="serif" style={{ fontSize: '1.2rem' }}>María González</div>
              <div style={{ fontSize: 11, color: 'var(--tm)', marginTop: 1 }}>Gimnasio · 3 días/sem · Ciclo 3</div>
            </div>
          </div>
          <button style={{ background: 'none', border: 'none', fontSize: 16, color: 'var(--tm)', padding: 2 }}>✕</button>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {['Rutina', 'Datos', 'Historial', 'Notas', 'Link'].map((t, i) => (
            <div key={t} style={{ padding: '8px 12px', fontSize: 11, color: i === 0 ? 'var(--v)' : 'var(--tm)', fontWeight: i === 0 ? 600 : 400, borderBottom: i === 0 ? '2px solid var(--v)' : '2px solid transparent', marginBottom: -1 }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: 22, fontSize: 12, color: 'var(--tm)', minHeight: 60 }}>Contenido del drawer …</div>
    </div>
  );
}

function DrawerAfter() {
  return (
    <div style={{ width: 480, background: 'var(--s)', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--b)' }}>
      <div style={{ padding: '18px 22px 0', borderBottom: '1px solid var(--b)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'var(--vl)', color: 'var(--vd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 18 }}>M</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="serif" style={{ fontSize: '1.2rem' }}>María González</span>
                <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 99, background: 'var(--vl)', color: 'var(--vd)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em' }}>Activa</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--tm)', marginTop: 3, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span>Gimnasio · 3 días</span>
                <span>·</span>
                <span>Ciclo 3 · Semana 2</span>
                <span>·</span>
                <span style={{ color: 'var(--vd)' }}>● hace 2h</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <button style={{ background: 'transparent', border: '1px solid var(--b)', borderRadius: 8, padding: 6, color: 'var(--tm)', display: 'flex' }} title="Más"><Icon name="more" size={14} /></button>
            <button style={{ background: 'transparent', border: '1px solid var(--b)', borderRadius: 8, padding: 6, color: 'var(--tm)', display: 'flex' }} title="Cerrar"><Icon name="x" size={14} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 2 }}>
          {['Rutina', 'Datos', 'Historial', 'Notas', 'Link'].map((t, i) => (
            <div key={t} style={{ padding: '8px 12px', fontSize: 11, color: i === 0 ? 'var(--v)' : 'var(--tm)', fontWeight: i === 0 ? 600 : 500, borderBottom: i === 0 ? '2px solid var(--v)' : '2px solid transparent', marginBottom: -1 }}>{t}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: 22, fontSize: 12, color: 'var(--tm)', minHeight: 60 }}>Contenido del drawer …</div>
    </div>
  );
}

Object.assign(window, { Desktop, SidebarBefore, SidebarAfter, AlumnasBefore, AlumnasAfter, PanelBefore, PanelAfter, MetricBefore, MetricAfter, LoginBefore, LoginAfter, DrawerBefore, DrawerAfter });
