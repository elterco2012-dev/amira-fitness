/* global React */
const { useState } = React;

// ─── AlumnaDrawer ──────────────────────────────────────────────────────────
function AlumnaDrawer({ alumna, onClose }) {
  const [tab, setTab] = useState('rutina');
  if (!alumna) return null;

  const tabs = [
    { id: 'rutina', label: 'Rutina' },
    { id: 'datos', label: 'Datos' },
    { id: 'historial', label: 'Historial' },
    { id: 'notas', label: 'Notas' },
    { id: 'link', label: 'Link de acceso' },
  ];

  return (
    <>
      <div style={drStyles.overlay} onClick={onClose} />
      <aside style={drStyles.drawer}>
        <div style={drStyles.head}>
          <div style={drStyles.headTop}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ ...drStyles.av, background: 'var(--vl)', color: 'var(--vd)' }}>{alumna.nombre[0]}</div>
              <div>
                <div className="serif" style={drStyles.name}>{alumna.nombre}</div>
                <div style={drStyles.sub}>{alumna.tipo} · Ciclo {alumna.ciclo}</div>
              </div>
            </div>
            <button onClick={onClose} style={drStyles.close} aria-label="Cerrar">✕</button>
          </div>
          <div style={drStyles.tabs}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ ...drStyles.tab, ...(tab === t.id ? drStyles.tabOn : {}) }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div style={drStyles.body}>
          {tab === 'rutina' && <RoutineBuilder />}
          {tab === 'datos' && <DatosTab alumna={alumna} />}
          {tab === 'historial' && <HistorialTab />}
          {tab === 'notas' && <NotasTab />}
          {tab === 'link' && <LinkTab alumna={alumna} />}
        </div>
      </aside>
    </>
  );
}

const drStyles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', zIndex: 100 },
  drawer: { position: 'fixed', top: 0, right: 0, width: 'min(620px, 100vw)', height: '100vh', background: 'var(--s)', zIndex: 101, overflowY: 'auto', boxShadow: '-4px 0 40px rgba(0,0,0,.2)', display: 'flex', flexDirection: 'column' },
  head: { position: 'sticky', top: 0, background: 'var(--s)', zIndex: 10, borderBottom: '1px solid var(--b)', padding: '1rem 1.25rem 0' },
  headTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 },
  av: { width: 44, height: 44, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 18 },
  name: { fontSize: '1.3rem' },
  sub: { fontSize: 12, color: 'var(--tm)', marginTop: 2 },
  close: { background: 'none', fontSize: 18, color: 'var(--tm)', padding: 4 },
  tabs: { display: 'flex', gap: 4, overflowX: 'auto' },
  tab: { padding: '8px 14px', fontSize: 12, color: 'var(--tm)', borderBottom: '2px solid transparent', whiteSpace: 'nowrap' },
  tabOn: { fontWeight: 600, color: 'var(--v)', borderBottomColor: 'var(--v)' },
  body: { padding: '1.25rem', flex: 1 },
};

// ─── DatosTab ───────────────────────────────────────────────────────────────
function DatosTab({ alumna }) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Datos personales</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 20px', fontSize: 13, marginBottom: '1.5rem' }}>
        {[
          ['Nombre', alumna.nombre],
          ['Tipo', alumna.tipo],
          ['Teléfono', '+54 9 11 2345 6789'],
          ['Email', 'maria@ejemplo.com'],
          ['Ciclo actual', `Ciclo ${alumna.ciclo}`],
          ['Estado', alumna.estado],
        ].map(([k, v]) => (
          <div key={k}>
            <span style={{ fontSize: 10, color: 'var(--tm)', display: 'block', marginBottom: 1 }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={btn()}>Editar datos</button>
        <button style={btn('warn')}>Pausar alumna</button>
      </div>
    </div>
  );
}

function HistorialTab() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Historial de ciclos</div>
      {[
        { c: 3, info: 'Semana 2 — en curso', check: '6 de 9 días' },
        { c: 2, info: '4 semanas · completado', check: '✓ 11/12 días' },
        { c: 1, info: '4 semanas · completado', check: '✓ 12/12 días' },
      ].map((h, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0.6rem 0', borderBottom: '1px solid var(--b)' }}>
          <div className="serif" style={{ fontSize: '1.1rem', color: 'var(--vd)', width: 60, flexShrink: 0 }}>Ciclo {h.c}</div>
          <div style={{ flex: 1, fontSize: 12, color: 'var(--tm)' }}>{h.info}</div>
          <div style={{ fontSize: 11, color: 'var(--vd)', fontWeight: 500 }}>{h.check}</div>
        </div>
      ))}
    </div>
  );
}

function NotasTab() {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Comentarios de la alumna</div>
      {[
        { date: 'Mar 12', text: 'Me costó el hollow hold, ¿hay alguna variante más simple?' },
        { date: 'Mar 8', text: 'Aumenté 2kg en sentadilla esta semana 💪' },
        { date: 'Mar 5', text: 'Las planchas con toque de hombros me cuestan mucho.' },
      ].map((n, i) => (
        <div key={i} style={{ background: 'var(--s2)', borderRadius: 'var(--rs)', padding: '10px 12px', marginBottom: 8 }}>
          <div style={{ fontSize: 10, color: 'var(--th)', marginBottom: 4 }}>{n.date}</div>
          <div style={{ fontSize: 13, color: 'var(--t)', lineHeight: 1.5 }}>{n.text}</div>
        </div>
      ))}
    </div>
  );
}

function LinkTab({ alumna }) {
  const slug = alumna.nombre.split(' ')[0].toLowerCase();
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12 }}>Link personal</div>
      <p style={{ fontSize: 13, color: 'var(--tm)', lineHeight: 1.6, marginBottom: 12 }}>
        Compartile este link a {alumna.nombre.split(' ')[0]}. Lo puede instalar como app en el celular.
      </p>
      <div style={{ background: 'var(--s2)', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', padding: '0.6rem 0.9rem', fontSize: 12, color: 'var(--vd)', fontFamily: 'monospace', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span>amira-fitness.vercel.app/alumna/{slug}</span>
        <button style={{ ...btn('ghost'), padding: '4px 12px' }}>Copiar</button>
      </div>
      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <button style={btn('primary')}>Enviar por WhatsApp</button>
        <button style={btn()}>QR Code</button>
      </div>
    </div>
  );
}

// ─── RoutineBuilder (slice) ────────────────────────────────────────────────
function RoutineBuilder() {
  const [day, setDay] = useState(1);
  const [week, setWeek] = useState(2);
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--p)', borderRadius: 'var(--rp)', padding: '4px 12px', fontSize: 11, color: 'var(--pd)', fontWeight: 500 }}>
          <span className="serif" style={{ fontSize: 16, color: 'var(--pd)', lineHeight: 1 }}>3</span>
          Ciclo 3
        </span>
        <span style={{ fontSize: 12, color: 'var(--tm)' }}>· Semana {week} · Día {day}</span>
      </div>

      <div style={{ display: 'flex', gap: 5, marginBottom: 10, flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map(w => (
          <button key={w} onClick={() => setWeek(w)} style={{ padding: '4px 12px', borderRadius: 'var(--rp)', fontSize: 11, border: '1px solid var(--bm)', background: week === w ? 'var(--p)' : 'var(--s)', color: week === w ? 'var(--pd)' : 'var(--tm)', borderColor: week === w ? 'transparent' : 'var(--bm)', fontWeight: week === w ? 500 : 400 }}>
            Semana {w}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
        {[1, 2, 3].map(d => (
          <button key={d} onClick={() => setDay(d)} style={{ flex: 1, padding: '6px 4px', borderRadius: 'var(--rp)', fontSize: 11, fontWeight: 500, border: '1px solid var(--bm)', background: day === d ? 'var(--v)' : 'var(--s)', color: day === d ? 'white' : 'var(--tm)', borderColor: day === d ? 'var(--v)' : 'var(--bm)' }}>
            Día {d}
          </button>
        ))}
      </div>

      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>Ejercicios — arrastrar para reordenar</div>
      {[
        { n: 1, name: 'Hollow Hold', det: '3 series · 20-30"', grupo: 'Abdomen' },
        { n: 2, name: 'Crunch sobre esfera', det: '3 series · 15', grupo: 'Abdomen' },
        { n: 3, name: 'Sentadilla al cajón', det: '3 series · 10', grupo: 'Tren inferior' },
        { n: 4, name: 'Isquiotibiales', det: '3 series · 10', grupo: 'Tren inferior' },
      ].map(e => (
        <div key={e.n} style={{ background: 'var(--s2)', borderRadius: 'var(--rs)', padding: '0.65rem 0.9rem', marginBottom: 6, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
          <span style={{ cursor: 'grab', color: 'var(--th)', fontSize: 12, paddingTop: 2 }}>⋮⋮</span>
          <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--s)', border: '1px solid var(--bm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 500, color: 'var(--tm)', flexShrink: 0 }}>{e.n}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t)' }}>{e.name}</div>
            <div style={{ fontSize: 11, color: 'var(--tm)', marginTop: 2 }}>{e.det}</div>
            <span style={{ display: 'inline-block', fontSize: 9, background: 'var(--vl)', color: 'var(--vd)', borderRadius: 'var(--rp)', padding: '1px 7px', marginTop: 3 }}>{e.grupo}</span>
          </div>
        </div>
      ))}

      <button style={{ ...btn('primary'), marginTop: 10, width: '100%' }}>+ Agregar ejercicio desde biblioteca</button>
    </div>
  );
}

function btn(kind) {
  const base = { padding: '7px 14px', borderRadius: 'var(--rp)', fontSize: 12, fontWeight: 500, border: '1px solid var(--bm)', background: 'var(--s)', color: 'var(--t)' };
  if (kind === 'primary') return { ...base, background: 'var(--v)', color: 'white', borderColor: 'var(--v)' };
  if (kind === 'warn') return { ...base, background: 'var(--a)', color: 'var(--ad)', borderColor: 'transparent' };
  if (kind === 'ghost') return { ...base, background: 'transparent', border: 'none', color: 'var(--tm)' };
  return base;
}

Object.assign(window, { AlumnaDrawer });
