/* global React, Header, BottomNav, WarmupCard, WeekChips, DayTabs, ProgressBar, ExerciseCard, Timer, CelebrationModal, ProgressScreen, NotesScreen */
const { useState, useEffect } = React;

const SEED = [
  { nombre: 'Hollow Hold', series: '3', reps: '20-30"', tip: 'Espalda baja siempre apoyada. Si se despega, flexioná rodillas.', video: 'https://youtube.com/shorts/o-XW-38ni2s' },
  { nombre: 'Crunch sobre esfera', series: '3', reps: '15', tip: 'Movimiento controlado, no tires del cuello. Activá abdomen.', video: 'https://youtube.com/shorts/4sORVXlsRog' },
  { nombre: 'Plancha con toque de hombros', series: '3', reps: '20', tip: 'Evitá que la cadera se mueva. Activá abdomen.', video: 'https://youtube.com/shorts/tzOH2YzP8QI' },
  { nombre: 'Cuádriceps a una pierna', series: '3', reps: '10 c/lado', tip: 'Movimiento controlado, sin impulso.', video: 'https://youtube.com/shorts/AcnKSxfj4ng' },
  { nombre: 'Sentadilla al cajón', series: '3', reps: '10', tip: 'Bajá controlado, peso en talones.', video: 'https://youtube.com/shorts/ASCwv9H6A4U' },
  { nombre: 'Isquiotibiales', series: '3', reps: '10', tip: 'Poca carga. Subí y bajá controlado.', video: 'https://youtube.com/shorts/B6t8MvbTtew' },
  { nombre: 'Vuelos laterales', series: '3', reps: '10', tip: 'No subas más allá de los hombros.', video: 'https://youtube.com/shorts/VbS0cyfH2mk' },
  { nombre: 'Vuelos frontales', series: '3', reps: '10', tip: 'Movimiento controlado, sin balanceo.', video: 'https://youtube.com/shorts/YyWAmeBkVgg' },
];

function AlumnaApp() {
  const [theme, setTheme] = useState('light');
  const [tab, setTab] = useState('rutina');
  const [week, setWeek] = useState(2);
  const [day, setDay] = useState(2);
  const [done, setDone] = useState({});
  const [timerOn, setTimerOn] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  function toggleEx(i) {
    setDone(d => {
      const next = { ...d, [i]: !d[i] };
      // celebrate when all done
      const allDone = SEED.every((_, idx) => next[idx]);
      if (allDone && !d[i]) { setTimeout(() => setCelebrate(true), 250); }
      // start timer briefly when checking off
      if (next[i]) { setTimerOn(true); setTimeout(() => setTimerOn(false), 4500); }
      return next;
    });
  }

  const doneCount = SEED.reduce((n, _, i) => n + (done[i] ? 1 : 0), 0);

  return (
    <div style={{ maxWidth: 430, margin: '0 auto', paddingBottom: 'calc(5.5rem + env(safe-area-inset-bottom,0px))', background: 'var(--bg)', minHeight: '100vh' }}>
      <Header theme={theme} onToggleTheme={() => setTheme(t => t === 'light' ? 'dark' : 'light')} />

      <main style={{ padding: '1rem 1.25rem' }}>
        {tab === 'rutina' && (
          <>
            <Hero />
            <WarmupCard />
            <WeekChips weeks={[1,2,3,4]} value={week} onChange={setWeek} />
            <DayTabs days={[1,2,3]} value={day} onChange={setDay} />
            <ProgressBar done={doneCount} total={SEED.length} />
            <div style={{ fontSize: 10, fontWeight: 500, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.6rem' }}>
              Ejercicios del día
            </div>
            {SEED.map((ej, i) => (
              <ExerciseCard key={ej.nombre} num={i+1} ej={ej} done={!!done[i]} onToggle={() => toggleEx(i)} onWeight={() => {}} />
            ))}
          </>
        )}
        {tab === 'progreso' && <ProgressScreen />}
        {tab === 'notas' && <NotesScreen />}
        {tab === 'perfil' && <ProfileScreen />}
      </main>

      <Timer show={timerOn} onSkip={() => setTimerOn(false)} />
      <BottomNav active={tab} onChange={setTab} />
      <CelebrationModal show={celebrate} onClose={() => setCelebrate(false)} />
    </div>
  );
}

function Hero() {
  return (
    <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1rem', display: 'flex', alignItems: 'center', gap: 12, marginBottom: '0.85rem' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 19, color: 'var(--pd)' }}>M</div>
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 500, marginBottom: 2, color: 'var(--t)' }}>¡Hola María!</h2>
        <p style={{ fontSize: 11, color: 'var(--tm)' }}>Cualquier molestia, avisame enseguida 💪</p>
      </div>
    </div>
  );
}

function ProfileScreen() {
  return (
    <div>
      <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>Tu perfil</h2>
      <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 32, color: 'var(--pd)' }}>M</div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 16, fontWeight: 500 }}>María González</div>
          <div style={{ fontSize: 12, color: 'var(--tm)' }}>Empezó el 1 de Marzo, 2025</div>
        </div>
      </div>
      <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1rem' }}>
        {[
          ['Tipo de entrenamiento', 'Gimnasio'],
          ['Días por semana', '3'],
          ['Ciclo actual', 'Ciclo 3 · Semana 2'],
          ['Próxima revisión', 'Domingo'],
        ].map(([k, v]) => (
          <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--b)', fontSize: 12 }}>
            <span style={{ color: 'var(--tm)' }}>{k}</span>
            <span style={{ color: 'var(--t)', fontWeight: 500 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AlumnaApp />);
