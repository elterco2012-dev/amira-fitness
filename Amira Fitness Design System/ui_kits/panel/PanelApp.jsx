/* global React, Sidebar, LoginScreen, Dashboard, AlumnasList, AlumnaDrawer */
const { useState } = React;

function PanelApp() {
  const [authed, setAuthed] = useState(true);  // start authed so the kit lands on dashboard
  const [section, setSection] = useState('alumnas');
  const [open, setOpen] = useState(null);

  if (!authed) return <LoginScreen onSubmit={() => setAuthed(true)} />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      <Sidebar active={section} onChange={setSection} />
      <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        {section === 'inicio' && <Dashboard />}
        {section === 'alumnas' && <AlumnasList onOpen={setOpen} />}
        {section === 'rutinas' && <Placeholder title="Rutinas" sub="Plantillas de ciclos reusables" />}
        {section === 'biblioteca' && <Biblioteca />}
        {section === 'registros' && <Placeholder title="Registros" sub="3 alumnas esperando aprobación" />}
        {section === 'mensajes' && <Placeholder title="Mensajes" sub="WhatsApp + comentarios" />}
        {section === 'config' && <Placeholder title="Configuración" sub="Tu cuenta, Make.com, integraciones" />}
      </main>
      {open && <AlumnaDrawer alumna={open} onClose={() => setOpen(null)} />}
    </div>
  );
}

function Placeholder({ title, sub }) {
  return (
    <div>
      <h1 className="serif" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>{title}</h1>
      <p style={{ fontSize: 13, color: 'var(--tm)' }}>{sub}</p>
      <div style={{ marginTop: 24, padding: '3rem', background: 'var(--s)', border: '1px dashed var(--bm)', borderRadius: 'var(--r)', textAlign: 'center', color: 'var(--tm)', fontSize: 13 }}>
        Sección stub — la app real tiene CRUD completo aquí.
      </div>
    </div>
  );
}

function Biblioteca() {
  const ejercicios = [
    { name: 'Hollow Hold', grupo: 'Abdomen', equip: 'Sin equipo' },
    { name: 'Sentadilla al cajón', grupo: 'Piernas', equip: 'Cajón' },
    { name: 'Press de banca', grupo: 'Pecho', equip: 'Barra' },
    { name: 'Remo cerrado', grupo: 'Espalda', equip: 'Polea' },
    { name: 'Vuelos laterales', grupo: 'Hombros', equip: 'Mancuernas' },
    { name: 'Russian Twist', grupo: 'Abdomen', equip: 'Disco' },
    { name: 'Plancha lateral', grupo: 'Abdomen', equip: 'Sin equipo' },
    { name: 'Curl bíceps', grupo: 'Brazos', equip: 'Mancuernas' },
  ];
  return (
    <div>
      <h1 className="serif" style={{ fontSize: '1.6rem', marginBottom: '1rem' }}>Biblioteca de ejercicios</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: '1rem' }}>
        <input placeholder="Buscar ejercicio…" style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', fontSize: 13, background: 'var(--s2)' }} />
        <select style={{ padding: '8px 12px', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', fontSize: 13, background: 'var(--s2)' }}>
          <option>Todos los grupos</option>
          <option>Abdomen</option><option>Piernas</option>
        </select>
        <button style={{ background: 'var(--v)', color: 'white', borderRadius: 'var(--rp)', padding: '8px 18px', fontSize: 12, fontWeight: 500 }}>+ Nuevo</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {ejercicios.map(e => (
          <div key={e.name} style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--rs)', padding: '0.85rem 1rem' }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t)' }}>{e.name}</div>
            <div style={{ fontSize: 10, color: 'var(--tm)', marginTop: 3 }}>{e.equip}</div>
            <span style={{ display: 'inline-block', fontSize: 9, background: 'rgba(29,158,117,0.1)', color: 'var(--vd)', borderRadius: 'var(--rp)', padding: '1px 7px', marginTop: 6 }}>{e.grupo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PanelApp />);
