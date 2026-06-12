/* global React */
const { useState } = React;

// ─── WarmupCard ────────────────────────────────────────────────────────────
function WarmupCard({ minutes = 5, href = '#' }) {
  return (
    <div style={warmupStyles.card}>
      <div style={warmupStyles.title}>ENTRADA EN CALOR · {minutes} MIN</div>
      <a href={href} style={warmupStyles.link}>
        <span style={warmupStyles.play}><span style={warmupStyles.tri} /></span>
        Ver entrada en calor
      </a>
    </div>
  );
}

const warmupStyles = {
  card: { background: 'var(--a)', borderRadius: 'var(--rs)', padding: '0.75rem 1rem', marginBottom: '0.85rem' },
  title: { fontSize: 10, fontWeight: 500, color: 'var(--ad)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.05em' },
  link: { fontSize: 12, color: 'var(--ad)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontWeight: 500 },
  play: { width: 18, height: 18, borderRadius: '50%', background: 'var(--ad)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  tri: { borderLeft: '5px solid var(--a)', borderTop: '3px solid transparent', borderBottom: '3px solid transparent', marginLeft: 2 },
};

// ─── WeekChips & DayTabs ───────────────────────────────────────────────────
function WeekChips({ weeks, value, onChange, label = 'SEMANA' }) {
  return (
    <div style={{ marginBottom: '0.65rem' }}>
      <div style={selStyles.label}>{label}</div>
      <div style={selStyles.row}>
        {weeks.map(w => (
          <button key={w} onClick={() => onChange(w)} style={{ ...selStyles.chip, ...(value === w ? selStyles.chipActive : {}) }}>
            Semana {w}
          </button>
        ))}
      </div>
    </div>
  );
}

function DayTabs({ days, value, onChange }) {
  return (
    <div style={selStyles.dtabs}>
      {days.map(d => (
        <button key={d} onClick={() => onChange(d)} style={{ ...selStyles.dtab, ...(value === d ? selStyles.dtabActive : {}) }}>
          Día {d}
        </button>
      ))}
    </div>
  );
}

const selStyles = {
  label: { fontSize: 10, fontWeight: 500, color: 'var(--th)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 4 },
  row: { display: 'flex', gap: 5, flexWrap: 'wrap' },
  chip: { padding: '5px 13px', borderRadius: 'var(--rp)', fontSize: 11, border: '1px solid var(--bm)', background: 'var(--s)', color: 'var(--tm)' },
  chipActive: { background: 'var(--p)', color: 'var(--pd)', borderColor: 'transparent', fontWeight: 500 },
  dtabs: { display: 'flex', gap: 6, marginBottom: '0.85rem' },
  dtab: { flex: 1, padding: '9px 4px', borderRadius: 'var(--rp)', fontSize: 12, fontWeight: 500, border: '1px solid var(--bm)', background: 'var(--s)', color: 'var(--tm)' },
  dtabActive: { background: 'var(--v)', color: 'white', borderColor: 'var(--v)' },
};

// ─── ProgressBar ───────────────────────────────────────────────────────────
function ProgressBar({ done, total }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={progStyles.top}>
        <span>{done} de {total} ejercicios</span>
        <span style={{ color: 'var(--vd)', fontWeight: 500 }}>{pct}%</span>
      </div>
      <div style={progStyles.bar}>
        <div style={{ ...progStyles.fill, width: `${pct}%` }} />
      </div>
    </div>
  );
}

const progStyles = {
  top: { display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--tm)', marginBottom: 5 },
  bar: { height: 6, background: 'var(--b)', borderRadius: 99, overflow: 'hidden' },
  fill: { height: '100%', background: 'var(--v)', borderRadius: 99, transition: 'width .4s var(--ease)' },
};

Object.assign(window, { WarmupCard, WeekChips, DayTabs, ProgressBar });
