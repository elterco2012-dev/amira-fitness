/* global React */
const { useState } = React;

// ─── ExerciseCard ──────────────────────────────────────────────────────────
function ExerciseCard({ num, ej, done, onToggle, onWeight }) {
  const [tipOpen, setTipOpen] = useState(false);

  return (
    <div style={{ ...exStyles.card, ...(done ? exStyles.cardDone : {}) }}>
      <div style={exStyles.top}>
        <div style={{ ...exStyles.num, ...(done ? exStyles.numDone : {}) }}>
          {done ? '✓' : num}
        </div>
        <div style={{ flex: 1 }}>
          <div style={exStyles.name}>{ej.nombre}</div>
          <div style={exStyles.det}>{ej.series} series · {ej.reps}</div>
        </div>
      </div>

      <div style={exStyles.btnRow}>
        <button style={exStyles.btip} onClick={() => setTipOpen(o => !o)}>💡 Tip</button>
        {ej.video && (
          <a href={ej.video} target="_blank" rel="noreferrer" style={exStyles.bvid}>
            ▶ Video
          </a>
        )}
        {onWeight && (
          <div style={exStyles.pesoRow}>
            <span style={exStyles.pesoLbl}>kg</span>
            <input type="number" style={exStyles.pesoIn} placeholder="—"
                   onChange={e => onWeight(ej.nombre, e.target.value)} />
          </div>
        )}
      </div>

      {tipOpen && ej.tip && <div style={exStyles.tipTxt}>{ej.tip}</div>}

      <button style={{ ...exStyles.bchk, ...(done ? exStyles.bchkDone : {}) }} onClick={onToggle}>
        {done ? '✓ Hecho' : 'Marcar como hecho'}
      </button>
    </div>
  );
}

const exStyles = {
  card: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '0.8rem 1rem', marginBottom: '0.5rem', transition: 'all .25s var(--ease)' },
  cardDone: { background: 'var(--vl)', borderColor: 'var(--vm)' },
  top: { display: 'flex', alignItems: 'center', gap: 10 },
  num: { width: 28, height: 28, borderRadius: '50%', background: 'var(--s2)', border: '1px solid var(--bm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500, color: 'var(--tm)', flexShrink: 0, transition: 'all .2s var(--ease)' },
  numDone: { background: 'var(--v)', color: 'white', borderColor: 'var(--v)' },
  name: { fontSize: 13, fontWeight: 500, color: 'var(--t)' },
  det: { fontSize: 11, color: 'var(--tm)', marginTop: 3 },
  btnRow: { display: 'flex', gap: 6, alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--b)', flexWrap: 'wrap' },
  btip: { background: 'var(--p)', borderRadius: 'var(--rs)', padding: '5px 11px', fontSize: 11, color: 'var(--pd)', fontWeight: 500 },
  bvid: { background: 'var(--rl)', borderRadius: 'var(--rs)', padding: '5px 11px', fontSize: 11, color: 'var(--rd)', fontWeight: 500, textDecoration: 'none' },
  pesoRow: { display: 'flex', alignItems: 'center', gap: 6, marginLeft: 'auto' },
  pesoLbl: { fontSize: 11, color: 'var(--tm)' },
  pesoIn: { width: 50, padding: '4px 8px', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', fontSize: 12, background: 'var(--s2)', textAlign: 'center' },
  tipTxt: { fontSize: 12, color: 'var(--vd)', background: 'var(--vl)', borderRadius: 'var(--rs)', padding: '8px 10px', marginTop: 8, lineHeight: 1.55 },
  bchk: { width: '100%', marginTop: 8, background: 'var(--s2)', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', padding: '9px 11px', fontSize: 12, color: 'var(--tm)', fontWeight: 500, textAlign: 'center' },
  bchkDone: { background: 'var(--vl)', color: 'var(--vd)', borderColor: 'var(--vm)' },
};

// ─── Timer (fixed above bottom nav) ────────────────────────────────────────
function Timer({ show, seconds = 45, onSkip }) {
  if (!show) return null;
  return (
    <div style={timerStyles.bar}>
      <div style={timerStyles.circle}>
        <span style={timerStyles.num}>{seconds}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={timerStyles.title}>Descansando…</div>
        <div style={timerStyles.sub}>Tocá el círculo para cambiar el tiempo</div>
      </div>
      <button style={timerStyles.skip} onClick={onSkip}>Saltar</button>
    </div>
  );
}

const timerStyles = {
  bar: { position: 'fixed', bottom: 56, left: 0, right: 0, maxWidth: 430, margin: '0 auto', background: 'var(--s)', borderTop: '1px solid var(--b)', padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 14, zIndex: 30, boxShadow: '0 -4px 20px rgba(0,0,0,.08)' },
  circle: { width: 54, height: 54, borderRadius: '50%', background: 'var(--v)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  num: { fontFamily: "'DM Serif Display',serif", fontSize: 22, color: 'white' },
  title: { fontSize: 13, fontWeight: 500, color: 'var(--t)' },
  sub: { fontSize: 11, color: 'var(--tm)', marginTop: 2 },
  skip: { background: 'none', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', padding: '6px 14px', fontSize: 12, color: 'var(--tm)' },
};

// ─── CelebrationModal ──────────────────────────────────────────────────────
function CelebrationModal({ show, dayLabel = 'Día 2', onClose }) {
  if (!show) return null;
  return (
    <div style={celStyles.overlay} onClick={onClose}>
      <div style={celStyles.card} onClick={e => e.stopPropagation()}>
        <span style={celStyles.emoji}>🎉</span>
        <h2 style={celStyles.title}>¡{dayLabel} completo!</h2>
        <div style={celStyles.badge}>Una sesión más</div>
        <p style={celStyles.msg}>Cada vez que entrenás, te alejás del "algún día" y te acercás al "ya estoy".</p>
        <button style={celStyles.btn} onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

const celStyles = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn .25s ease' },
  card: { background: 'var(--s)', borderRadius: 24, padding: '2.25rem 1.75rem 1.75rem', textAlign: 'center', maxWidth: 320, width: '100%', animation: 'celPop .45s cubic-bezier(.34,1.56,.64,1)' },
  emoji: { fontSize: '3.5rem', display: 'block', marginBottom: '0.6rem' },
  title: { fontFamily: "'DM Serif Display',serif", fontSize: '1.6rem', color: 'var(--t)', marginBottom: '0.5rem' },
  badge: { display: 'inline-block', background: 'var(--vl)', color: 'var(--vd)', fontSize: 12, fontWeight: 500, borderRadius: 'var(--rp)', padding: '5px 14px', marginBottom: '1.25rem' },
  msg: { fontSize: 13, color: 'var(--tm)', marginBottom: '1.25rem', lineHeight: 1.6 },
  btn: { width: '100%', background: 'var(--v)', color: 'white', borderRadius: 'var(--rp)', padding: 13, fontSize: 14, fontWeight: 500 },
};

Object.assign(window, { ExerciseCard, Timer, CelebrationModal });
