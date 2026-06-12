/* global React */
const { useState } = React;

// ─── ProgressScreen ────────────────────────────────────────────────────────
function ProgressScreen() {
  return (
    <div>
      <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>Tu progreso</h2>
      <div style={progScreenStyles.stats}>
        <div style={progScreenStyles.stat}>
          <span style={progScreenStyles.num}>12</span>
          <div style={progScreenStyles.lbl}>Días completados</div>
        </div>
        <div style={progScreenStyles.stat}>
          <span style={progScreenStyles.num}>8</span>
          <div style={progScreenStyles.lbl}>Semanas activa</div>
        </div>
        <div style={progScreenStyles.stat}>
          <span style={progScreenStyles.num}>3</span>
          <div style={progScreenStyles.lbl}>Ciclos hechos</div>
        </div>
        <div style={progScreenStyles.stat}>
          <span style={progScreenStyles.num}>92%</span>
          <div style={progScreenStyles.lbl}>Esta semana</div>
        </div>
      </div>

      <div style={progScreenStyles.section}>
        <div style={progScreenStyles.ctit}>Evolución de pesos · Sentadilla común</div>
        <ChartPlaceholder />
      </div>

      <div style={progScreenStyles.section}>
        <div style={progScreenStyles.ctit}>Logros desbloqueados</div>
        <div style={progScreenStyles.badges}>
          <span style={{ ...progScreenStyles.badge, ...progScreenStyles.badgeEarned }}>🏁 Primer ciclo</span>
          <span style={{ ...progScreenStyles.badge, ...progScreenStyles.badgeEarned }}>🔥 5 días seguidos</span>
          <span style={progScreenStyles.badge}>💪 10 ciclos</span>
          <span style={progScreenStyles.badge}>⭐ 100 ejercicios</span>
        </div>
      </div>
    </div>
  );
}

function ChartPlaceholder() {
  return (
    <svg viewBox="0 0 320 160" style={{ width: '100%', height: 160, display: 'block' }} aria-hidden>
      <line x1="0" y1="120" x2="320" y2="120" stroke="rgba(0,0,0,0.08)" />
      <line x1="0" y1="80" x2="320" y2="80" stroke="rgba(0,0,0,0.05)" />
      <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(0,0,0,0.05)" />
      <polyline fill="none" stroke="#1D9E75" strokeWidth="2.5" points="20,120 80,100 140,90 200,70 260,50 300,40" />
      {[[20,120],[80,100],[140,90],[200,70],[260,50],[300,40]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="4" fill="#fff" stroke="#1D9E75" strokeWidth="2" />
      ))}
    </svg>
  );
}

const progScreenStyles = {
  stats: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: '1rem' },
  stat: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--rs)', padding: '0.85rem 1rem' },
  num: { fontFamily: "'DM Serif Display',serif", fontSize: '1.75rem', color: 'var(--v)', display: 'block' },
  lbl: { fontSize: 11, color: 'var(--tm)', marginTop: 2 },
  section: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1rem', marginBottom: '1rem' },
  ctit: { fontSize: 13, fontWeight: 500, color: 'var(--t)', marginBottom: 8 },
  badges: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  badge: { display: 'flex', alignItems: 'center', gap: 5, background: 'var(--s2)', borderRadius: 'var(--rs)', padding: '6px 10px', fontSize: 11, color: 'var(--tm)' },
  badgeEarned: { background: 'var(--vl)', color: 'var(--vd)' },
};

// ─── NotesScreen ───────────────────────────────────────────────────────────
function NotesScreen() {
  const [notes, setNotes] = useState([
    { from: 'amira', date: 'Mar 10', text: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.' },
    { from: 'alumna', date: 'Mar 12', text: 'Me costó el hollow hold, ¿hay alguna variante más simple?' },
    { from: 'amira', date: 'Mar 13', text: 'Sí, hacelo con rodillas flexionadas en vez de piernas estiradas. Cuando lo hagas fluido, vamos a la versión completa 💪' },
  ]);
  const [draft, setDraft] = useState('');

  function send() {
    if (!draft.trim()) return;
    setNotes(n => [...n, { from: 'alumna', date: 'Hoy', text: draft.trim() }]);
    setDraft('');
  }

  return (
    <div>
      <h2 className="serif" style={{ fontSize: '1.4rem', marginBottom: '0.85rem' }}>Notas con Amira</h2>
      <div style={notesStyles.section}>
        <div style={notesStyles.hint}>Dejá cualquier duda o comentario sobre la rutina. Amira lo lee y te responde.</div>
        {notes.map((n, i) => (
          <div key={i} style={notesStyles.item}>
            <div style={notesStyles.meta}>{n.from === 'amira' ? '👩 Amira' : 'Vos'} · {n.date}</div>
            <div>{n.text}</div>
          </div>
        ))}
      </div>
      <div style={notesStyles.composer}>
        <textarea
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="Escribir un comentario…"
          style={notesStyles.input}
        />
        <button style={notesStyles.send} onClick={send}>Enviar</button>
      </div>
    </div>
  );
}

const notesStyles = {
  section: { background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1rem', marginBottom: '1rem' },
  hint: { fontSize: 11, color: 'var(--tm)', marginBottom: 10, lineHeight: 1.5 },
  item: { background: 'var(--s2)', borderRadius: 'var(--rs)', padding: '8px 10px', marginBottom: 6, fontSize: 12, color: 'var(--t)', lineHeight: 1.5 },
  meta: { fontSize: 10, color: 'var(--th)', marginBottom: 3 },
  composer: { display: 'flex', gap: 8, alignItems: 'flex-end' },
  input: { flex: 1, padding: '8px 10px', border: '1px solid var(--bm)', borderRadius: 'var(--rs)', fontSize: 12, background: 'var(--s2)', minHeight: 40, resize: 'none' },
  send: { background: 'var(--v)', color: 'white', borderRadius: 'var(--rs)', padding: '8px 14px', fontSize: 12, fontWeight: 500 },
};

Object.assign(window, { ProgressScreen, NotesScreen });
