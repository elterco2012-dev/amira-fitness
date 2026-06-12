/* global React, Icon */
const { useState } = React;

// ─── Generic phone frame for mobile mockups ─────────────────────────────────
function Phone({ children, theme = 'light', width = 380, height = 720, style }) {
  return (
    <div data-theme={theme} style={{ width, height, background: 'var(--bg)', borderRadius: 28, overflow: 'hidden', boxShadow: '0 0 0 1px rgba(0,0,0,.08), 0 18px 60px rgba(0,0,0,.10)', position: 'relative', display: 'flex', flexDirection: 'column', ...style }}>
      {children}
    </div>
  );
}

function PhoneHeader({ name, sub, theme, icon }) {
  return (
    <header style={{ background: 'var(--s)', borderBottom: '1px solid var(--b)', padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 13, color: 'var(--vd)' }}>A</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t)' }}>{name}</div>
        <div style={{ fontSize: 10, color: 'var(--tm)' }}>{sub}</div>
      </div>
      {icon}
    </header>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  1. BOTTOM NAV — Emoji vs Lucide
// ════════════════════════════════════════════════════════════════════════════
function BottomNavBefore() {
  return (
    <div style={{ background: 'var(--s)', borderTop: '1px solid var(--b)', display: 'flex' }}>
      {[{ e: '🏋️', l: 'Rutina', on: true }, { e: '📈', l: 'Progreso' }, { e: '💬', l: 'Notas' }, { e: '👤', l: 'Perfil' }].map((it, i) => (
        <button key={i} style={{ flex: 1, padding: '10px 4px', background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <span style={{ fontSize: 20 }}>{it.e}</span>
          <span style={{ fontSize: 10, color: it.on ? 'var(--v)' : 'var(--tm)', fontWeight: it.on ? 500 : 400 }}>{it.l}</span>
        </button>
      ))}
    </div>
  );
}

function BottomNavAfter() {
  return (
    <div style={{ background: 'var(--s)', borderTop: '1px solid var(--b)', display: 'flex' }}>
      {[{ i: 'dumbbell', l: 'Rutina', on: true }, { i: 'trendup', l: 'Progreso' }, { i: 'msgsquare', l: 'Notas' }, { i: 'user', l: 'Perfil' }].map((it, idx) => (
        <button key={idx} style={{ flex: 1, padding: '10px 4px', background: 'none', border: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <Icon name={it.i} size={20} stroke={it.on ? 'var(--v)' : 'var(--tm)'} strokeWidth={it.on ? 2 : 1.6} />
          <span style={{ fontSize: 10, color: it.on ? 'var(--v)' : 'var(--tm)', fontWeight: it.on ? 500 : 400 }}>{it.l}</span>
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  2. EXERCISE CARD — Crowded vs Refined
// ════════════════════════════════════════════════════════════════════════════
function ExCardBefore({ done = false }) {
  return (
    <div style={{ background: done ? 'var(--vl)' : 'var(--s)', border: `1px solid ${done ? 'var(--vm)' : 'var(--b)'}`, borderRadius: 16, padding: '12px 14px', marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? 'var(--v)' : 'var(--s2)', border: `1px solid ${done ? 'var(--v)' : 'var(--bm)'}`, color: done ? 'white' : 'var(--tm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 500 }}>{done ? '✓' : '1'}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--t)' }}>Hollow Hold</div>
          <div style={{ fontSize: 11, color: 'var(--tm)', marginTop: 2 }}>3 series · 20-30"</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--b)', flexWrap: 'wrap' }}>
        <button style={{ background: 'var(--p)', border: 'none', borderRadius: 10, padding: '4px 10px', fontSize: 11, color: 'var(--pd)', fontWeight: 500 }}>💡 Tip</button>
        <button style={{ background: 'var(--rl)', border: 'none', borderRadius: 10, padding: '4px 10px', fontSize: 11, color: 'var(--rd)', fontWeight: 500 }}>▶ Video</button>
        <span style={{ fontSize: 10, color: 'var(--tm)', marginLeft: 'auto' }}>kg</span>
        <input placeholder="—" style={{ width: 44, padding: '3px 6px', border: '1px solid var(--bm)', borderRadius: 10, fontSize: 11, background: 'var(--s2)', textAlign: 'center' }} />
      </div>
      <button style={{ width: '100%', marginTop: 8, background: done ? 'var(--vl)' : 'var(--s2)', border: `1px solid ${done ? 'var(--vm)' : 'var(--bm)'}`, borderRadius: 10, padding: '8px', fontSize: 12, color: done ? 'var(--vd)' : 'var(--tm)', fontWeight: 500 }}>
        {done ? '✓ Hecho' : 'Marcar como hecho'}
      </button>
    </div>
  );
}

function ExCardAfter({ done = false }) {
  return (
    <div style={{ background: 'var(--s)', border: `1px solid ${done ? 'var(--vm)' : 'var(--b)'}`, borderRadius: 14, padding: '12px 14px', marginBottom: 8, width: '100%', textAlign: 'left', position: 'relative', cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', background: done ? 'var(--v)' : 'transparent', border: `1.5px solid ${done ? 'var(--v)' : 'var(--bm)'}`, color: done ? 'white' : 'var(--tm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 500, flexShrink: 0, transition: 'all .2s' }}>
          {done ? <Icon name="check" size={14} strokeWidth={2.5} /> : '1'}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--t)', textDecoration: done ? 'line-through' : 'none', opacity: done ? 0.55 : 1, marginBottom: 3 }}>Hollow Hold</div>
          <span style={{ fontSize: 10, color: 'var(--tm)', background: 'var(--s2)', padding: '2px 7px', borderRadius: 99 }}>3×20-30"</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
          <input placeholder="kg" style={{ width: 44, padding: '5px 6px', border: '1px solid var(--bm)', borderRadius: 8, fontSize: 11, background: 'var(--s2)', textAlign: 'center', color: 'var(--t)' }} />
          <button style={{ width: 28, height: 28, borderRadius: 8, background: 'transparent', border: '1px solid var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ad)' }} title="Tip"><Icon name="lightbulb" size={14} /></button>
          <button style={{ width: 28, height: 28, borderRadius: 8, background: 'transparent', border: '1px solid var(--b)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--tm)' }} title="Video"><Icon name="play" size={13} fill="currentColor" stroke="none" /></button>
        </div>
      </div>
      {done && <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 9, background: 'var(--vl)', color: 'var(--vd)', borderRadius: 99, padding: '2px 7px', fontWeight: 600, letterSpacing: '.03em', textTransform: 'uppercase' }}>Hecho</div>}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  3. DAY TABS — Saturated vs Refined
// ════════════════════════════════════════════════════════════════════════════
function DayTabsBefore() {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {[1, 2, 3].map(d => (
        <button key={d} style={{ flex: 1, padding: '10px 4px', borderRadius: 30, fontSize: 12, fontWeight: 500, border: d === 2 ? '1px solid var(--v)' : '1px solid var(--bm)', background: d === 2 ? 'var(--v)' : 'var(--s)', color: d === 2 ? 'white' : 'var(--tm)' }}>
          Día {d}
        </button>
      ))}
    </div>
  );
}

function DayTabsAfter() {
  return (
    <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--b)', paddingBottom: 0 }}>
      {[1, 2, 3].map(d => (
        <button key={d} style={{ flex: 1, padding: '8px 4px 10px', borderRadius: '8px 8px 0 0', fontSize: 12, fontWeight: d === 2 ? 600 : 500, border: 'none', background: d === 2 ? 'var(--vl)' : 'transparent', color: d === 2 ? 'var(--vd)' : 'var(--tm)', position: 'relative', borderBottom: d === 2 ? '2px solid var(--v)' : '2px solid transparent', marginBottom: -1 }}>
          Día {d}
        </button>
      ))}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  4. PROGRESS BAR — Thin/external vs Thick/inline
// ════════════════════════════════════════════════════════════════════════════
function ProgressBefore() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--tm)', marginBottom: 5 }}>
        <span>5 de 8 ejercicios</span><span style={{ color: 'var(--vd)', fontWeight: 500 }}>62%</span>
      </div>
      <div style={{ height: 6, background: 'var(--b)', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{ height: '100%', background: 'var(--v)', width: '62%' }} />
      </div>
    </div>
  );
}

function ProgressAfter() {
  return (
    <div style={{ height: 28, background: 'var(--s2)', borderRadius: 99, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, width: '62%', background: 'var(--v)', borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: 'white' }}>5/8</span>
      </div>
      <span style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 11, color: 'var(--tm)', fontWeight: 500 }}>62%</span>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  5. HEADER + HOME hero — With hero card vs Without
// ════════════════════════════════════════════════════════════════════════════
function HomeBefore() {
  return (
    <Phone>
      <PhoneHeader name="María · Día 2" sub="Semana 2 · Ciclo 3" icon={<span style={{ fontSize: 14 }}>🌙</span>} />
      <div style={{ padding: 16, overflow: 'hidden', flex: 1 }}>
        {/* Hero card duplicating header */}
        <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 16, padding: 14, display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--p)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 18, color: 'var(--pd)' }}>M</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>¡Hola María!</div>
            <div style={{ fontSize: 11, color: 'var(--tm)' }}>Cualquier molestia, avisame 💪</div>
          </div>
        </div>
        <div style={{ background: 'var(--a)', borderRadius: 10, padding: '10px 14px', marginBottom: 10 }}>
          <div style={{ fontSize: 9, fontWeight: 500, color: 'var(--ad)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 4 }}>ENTRADA EN CALOR · 5 MIN</div>
          <div style={{ fontSize: 11, color: 'var(--ad)', display: 'flex', alignItems: 'center', gap: 6, fontWeight: 500 }}>
            <span style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--ad)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--a)', fontSize: 8 }}>▶</span>
            Ver entrada en calor
          </div>
        </div>
        <div style={{ fontSize: 9, color: 'var(--th)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 4 }}>SEMANA</div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 8, flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map(w => (
            <button key={w} style={{ padding: '4px 10px', borderRadius: 30, fontSize: 10, border: w === 2 ? 'none' : '1px solid var(--bm)', background: w === 2 ? 'var(--p)' : 'var(--s)', color: w === 2 ? 'var(--pd)' : 'var(--tm)', fontWeight: w === 2 ? 500 : 400 }}>S{w}</button>
          ))}
        </div>
        <DayTabsBefore />
        <div style={{ marginTop: 10 }}>
          <ProgressBefore />
        </div>
        <div style={{ fontSize: 9, color: 'var(--tm)', textTransform: 'uppercase', letterSpacing: '.07em', margin: '10px 0 6px', fontWeight: 500 }}>EJERCICIOS DEL DÍA</div>
        <ExCardBefore done={true} />
        <ExCardBefore />
      </div>
      <BottomNavBefore />
    </Phone>
  );
}

function HomeAfter() {
  return (
    <Phone>
      <PhoneHeader name="María · Día 2" sub="Semana 2 · Ciclo 3" icon={<button style={{ background: 'transparent', border: '1px solid var(--b)', borderRadius: 8, padding: 6, color: 'var(--tm)', display: 'flex' }}><Icon name="moon" size={14} /></button>} />
      <div style={{ padding: 16, overflow: 'hidden', flex: 1 }}>
        {/* No hero card. Straight to content. */}
        <div style={{ marginBottom: 12 }}>
          <DayTabsAfter />
        </div>
        <div style={{ marginBottom: 14 }}>
          <ProgressAfter />
        </div>
        {/* Compact warmup line */}
        <button style={{ width: '100%', background: 'var(--a)', border: 'none', borderRadius: 10, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, textAlign: 'left' }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(99,56,6,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ad)' }}>
            <Icon name="play" size={13} fill="currentColor" stroke="none" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ad)' }}>Entrada en calor</div>
            <div style={{ fontSize: 10, color: 'var(--ad)', opacity: .7 }}>5 minutos · antes de empezar</div>
          </div>
          <Icon name="chevron" size={14} stroke="var(--ad)" />
        </button>
        <ExCardAfter done={true} />
        <ExCardAfter />
      </div>
      <BottomNavAfter />
    </Phone>
  );
}

// ════════════════════════════════════════════════════════════════════════════
//  6. NOTES SCREEN — Flat list vs Chat
// ════════════════════════════════════════════════════════════════════════════
function NotesBefore() {
  return (
    <Phone>
      <PhoneHeader name="Notas con Amira" sub="3 mensajes" icon={null} />
      <div style={{ padding: 16, overflow: 'hidden', flex: 1, background: 'var(--bg)' }}>
        <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 14, padding: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--tm)', marginBottom: 10, lineHeight: 1.5 }}>Dejá cualquier duda sobre la rutina. Amira la lee.</div>
          {[
            { who: '👩 Amira', d: 'Mar 10', t: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.' },
            { who: 'Vos', d: 'Mar 12', t: 'Me costó el hollow hold, ¿hay alguna variante más simple?' },
            { who: '👩 Amira', d: 'Mar 13', t: 'Sí, hacelo con rodillas flexionadas. Cuando lo hagas fluido, vamos a la versión completa 💪' },
          ].map((n, i) => (
            <div key={i} style={{ background: 'var(--s2)', borderRadius: 10, padding: '8px 10px', marginBottom: 6, fontSize: 12 }}>
              <div style={{ fontSize: 10, color: 'var(--th)', marginBottom: 3 }}>{n.who} · {n.d}</div>
              {n.t}
            </div>
          ))}
        </div>
      </div>
      <BottomNavBefore />
    </Phone>
  );
}

function NotesAfter() {
  const msgs = [
    { from: 'amira', t: '¡Buen ritmo esta semana! Subí un poquito en sentadilla si te animás.', d: 'Mar 10' },
    { from: 'alumna', t: 'Me costó el hollow hold, ¿hay alguna variante más simple?', d: 'Mar 12' },
    { from: 'amira', t: 'Sí, hacelo con rodillas flexionadas en vez de piernas estiradas. Cuando lo hagas fluido, vamos a la versión completa 💪', d: 'Mar 13' },
  ];
  return (
    <Phone>
      <PhoneHeader name="Notas con Amira" sub="Respuesta en el día" icon={null} />
      <div style={{ padding: 14, overflow: 'hidden', flex: 1, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {msgs.map((m, i) => (
          m.from === 'amira' ? (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, maxWidth: '80%' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 11, color: 'var(--vd)', flexShrink: 0 }}>A</div>
              <div>
                <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: '14px 14px 14px 4px', padding: '8px 12px', fontSize: 12, color: 'var(--t)', lineHeight: 1.5 }}>{m.t}</div>
                <div style={{ fontSize: 9, color: 'var(--th)', marginTop: 3, paddingLeft: 4 }}>Amira · {m.d}</div>
              </div>
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ maxWidth: '80%' }}>
                <div style={{ background: 'var(--vl)', borderRadius: '14px 14px 4px 14px', padding: '8px 12px', fontSize: 12, color: 'var(--vd)', lineHeight: 1.5 }}>{m.t}</div>
                <div style={{ fontSize: 9, color: 'var(--th)', marginTop: 3, paddingRight: 4, textAlign: 'right' }}>{m.d}</div>
              </div>
            </div>
          )
        ))}
        <div style={{ marginTop: 'auto', display: 'flex', gap: 6, paddingTop: 8 }}>
          <input placeholder="Escribir…" style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--bm)', borderRadius: 99, fontSize: 12, background: 'var(--s2)', color: 'var(--t)' }} />
          <button style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--v)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none' }}><Icon name="send" size={14} /></button>
        </div>
      </div>
      <BottomNavAfter />
    </Phone>
  );
}

Object.assign(window, { Phone, BottomNavBefore, BottomNavAfter, ExCardBefore, ExCardAfter, DayTabsBefore, DayTabsAfter, ProgressBefore, ProgressAfter, HomeBefore, HomeAfter, NotesBefore, NotesAfter });
