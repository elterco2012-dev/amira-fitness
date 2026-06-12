/* global React, WAIcon */

const WA_URL = 'https://wa.me/5492226500790?text=Hola%20Amira!%20Quiero%20saber%20m%C3%A1s';

// ─── Filosofia (dark green) ────────────────────────────────────────────────
function Filosofia() {
  return (
    <section style={fiStyles.bg}>
      <div style={fiStyles.container}>
        <div style={fiStyles.inner}>
          <div>
            <div style={fiStyles.stag}>Sobre Amira</div>
            <h2 className="serif" style={fiStyles.title}>Cada cuerpo tiene su historia. Yo quiero escuchar la tuya.</h2>
            <p style={fiStyles.p}>Soy entrenadora personal y lo que más me importa es entender tu punto de partida: no el de otra persona, no el de un programa genérico. El tuyo.</p>
            <p style={fiStyles.p}>Trabajo a distancia con alumnas de diferentes niveles, rutinas y cuerpos. Cada una tiene su plan, su seguimiento y su contacto directo conmigo.</p>
            <div style={fiStyles.pillars}>
              <div style={fiStyles.pillar}><div style={fiStyles.picon}>🎯</div>Objetivos reales, no ideales de revista</div>
              <div style={fiStyles.pillar}><div style={fiStyles.picon}>🔄</div>Rutinas que evolucionan con vos</div>
              <div style={fiStyles.pillar}><div style={fiStyles.picon}>💬</div>Contacto directo — siempre con Amira</div>
            </div>
          </div>
          <div style={fiStyles.callout}>
            <div className="serif" style={fiStyles.big}>"</div>
            <p style={fiStyles.coP}>No soy un bot, no soy un PDF y no soy un gimnasio. Soy una persona que va a conocer tu caso, armar tu plan y estar presente semana a semana para que funcione.</p>
            <p style={fiStyles.attrib}>— Amira Lezcano</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const fiStyles = {
  bg: { background: 'var(--vd)', padding: '5rem 2rem' },
  container: { maxWidth: 1100, margin: '0 auto' },
  inner: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' },
  stag: { fontSize: 11, fontWeight: 500, color: 'var(--vm)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' },
  title: { fontSize: '2rem', color: 'white', marginBottom: '1rem', lineHeight: 1.2 },
  p: { color: 'rgba(255,255,255,.78)', fontSize: '0.975rem', lineHeight: 1.85, marginBottom: '1.2rem' },
  pillars: { display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.5rem' },
  pillar: { display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,.85)', fontSize: 14 },
  picon: { width: 36, height: 36, borderRadius: 10, background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 16 },
  callout: { background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 'var(--r)', padding: '1.75rem', color: 'white' },
  big: { fontSize: '2.8rem', lineHeight: 1, fontStyle: 'italic', marginBottom: '0.75rem' },
  coP: { fontSize: 13, color: 'rgba(255,255,255,.65)', lineHeight: 1.7 },
  attrib: { marginTop: '1rem', fontSize: 12.5, color: 'rgba(255,255,255,.45)' },
};

// ─── Steps ─────────────────────────────────────────────────────────────────
function Steps() {
  const steps = [
    { n: 1, t: 'Me escribís por WhatsApp', d: 'Me contás qué querés lograr, cuántos días tenés para entrenar y si hay algo que tenga que saber.' },
    { n: 2, t: 'Te conozco y acordamos', d: 'En menos de 24hs te respondo, charlamos lo necesario y acordamos el plan.' },
    { n: 3, t: 'Recibís tu rutina', d: 'Te llega tu link personal con tu rutina completa: ejercicios, series, videos y notas.' },
    { n: 4, t: 'Entrenás y evolucionás', d: 'Registrás tu progreso en la app y yo ajusto tu rutina semana a semana.' },
  ];
  return (
    <section style={{ padding: '5rem 2rem' }} id="como-funciona">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--v)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>El proceso</div>
        <h2 className="serif" style={{ fontSize: '2.3rem', marginBottom: '1rem', color: 'var(--t)', lineHeight: 1.2 }}>Cómo funciona</h2>
        <p style={{ fontSize: '0.975rem', color: 'var(--tm)', maxWidth: 520, lineHeight: 1.8 }}>Desde que me escribís hasta que empezás a entrenar, todo está pensado para que sea simple y sin vueltas.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
          {steps.map(s => (
            <div key={s.n}>
              <div className="serif" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--v)', color: 'white', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>{s.n}</div>
              <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: '0.5rem', color: 'var(--t)' }}>{s.t}</h4>
              <p style={{ fontSize: 13, color: 'var(--tm)', lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────
function Services() {
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--bg)' }} id="que-incluye">
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--v)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>El servicio</div>
        <h2 className="serif" style={{ fontSize: '2.3rem', marginBottom: '1rem', color: 'var(--t)', lineHeight: 1.2 }}>¿Qué incluye?</h2>
        <p style={{ fontSize: '0.975rem', color: 'var(--tm)', maxWidth: 520, lineHeight: 1.8 }}>Cada alumna tiene un plan único. No hay rutinas genéricas ni programas enlatados.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '3rem' }}>
          <ServiceCard icon="📋" iconBg="var(--vl)" title="Rutina 100% personalizada" desc="Armada específicamente para vos: tus objetivos, tu nivel, tu equipamiento y tu disponibilidad. Cambia y crece con vos cada semana." tag="A distancia" />
          <ServiceCard icon="📊" iconBg="var(--a)" title="Seguimiento semanal real" desc="Reviso tu progreso, tus pesos y tus comentarios semana a semana. La rutina se ajusta según cómo evolucionás." tag="Incluido siempre" />
          <ServiceCard icon="💬" iconBg="var(--p)" title="Contacto directo conmigo" desc="Podés escribirme desde la app, dejar notas en cada ejercicio y hacer preguntas. Atención personalizada — no respuestas automáticas." tag="WhatsApp + app" />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ icon, iconBg, title, desc, tag }) {
  return (
    <div style={{ background: 'var(--s)', border: '1px solid var(--b)', borderRadius: 'var(--r)', padding: '1.75rem', transition: 'box-shadow .2s var(--ease)' }}>
      <div style={{ width: 48, height: 48, borderRadius: 12, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: '1.25rem' }}>{icon}</div>
      <h3 style={{ fontSize: 15, fontWeight: 500, marginBottom: '0.5rem', color: 'var(--t)' }}>{title}</h3>
      <p style={{ fontSize: 13, color: 'var(--tm)', lineHeight: 1.75 }}>{desc}</p>
      <span style={{ marginTop: '1.25rem', display: 'inline-block', fontSize: 11.5, fontWeight: 500, color: 'var(--vd)', background: 'var(--vl)', padding: '3px 10px', borderRadius: 'var(--rp)' }}>{tag}</span>
    </div>
  );
}

// ─── AppPreview (dark section) ─────────────────────────────────────────────
function AppPreview() {
  const feats = ['Videos de referencia por ejercicio', 'Registro de pesos y progreso', 'Temporizador de descanso', 'Notas de técnica por ejercicio', 'Modo oscuro para el gimnasio', 'Recordatorios de entrenamiento'];
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--t)', color: 'white' }} id="la-app">
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--vm)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>La app</div>
          <h2 className="serif" style={{ fontSize: '2.3rem', marginBottom: '1rem', color: 'white', lineHeight: 1.2 }}>Tu entrenamiento, siempre en el celu</h2>
          <p style={{ fontSize: '0.975rem', color: 'rgba(255,255,255,.65)', maxWidth: 520, lineHeight: 1.8 }}>Cada alumna recibe un link personal con su rutina completa. Sin descargas, sin registros complicados. Se instala como app en tu teléfono.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', marginTop: '2rem' }}>
            {feats.map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: '50%', background: 'rgba(255,255,255,.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: 'var(--vm)', marginTop: 1 }}>✓</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,.8)', lineHeight: 1.5 }}>{f}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 28, padding: '2.5rem 2rem', textAlign: 'center' }}>
          <span style={{ fontSize: '4.5rem', display: 'block', marginBottom: '1rem' }}>📱</span>
          <strong style={{ color: 'rgba(255,255,255,.85)', display: 'block', fontSize: 15, fontWeight: 500, marginBottom: '0.35rem' }}>Tu rutina personalizada</strong>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,.5)' }}>Siempre disponible, funciona sin internet</p>
          <p style={{ marginTop: '1.5rem', fontSize: 11, color: 'rgba(255,255,255,.3)' }}>Instalable como app en iOS y Android</p>
        </div>
      </div>
    </section>
  );
}

// ─── CTAFinal ──────────────────────────────────────────────────────────────
function CTAFinal() {
  return (
    <section style={{ background: 'linear-gradient(135deg, var(--vd) 0%, var(--v) 100%)', textAlign: 'center', color: 'white', padding: '6rem 2rem' }}>
      <h2 className="serif" style={{ fontSize: '2.6rem', color: 'white', marginBottom: '1rem', lineHeight: 1.15 }}>Si llegaste hasta acá, charlemos.</h2>
      <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.75)', maxWidth: 480, margin: '0 auto 2rem', lineHeight: 1.8 }}>
        Sin compromiso, sin formulario largo.<br />Me escribís, te respondo yo.
      </p>
      <a href={WA_URL} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'white', color: 'var(--vd)', padding: '13px 26px', borderRadius: 'var(--rp)', fontSize: 14, fontWeight: 500 }}>
        <WAIcon size={17} /> Escribime y charlamos
      </a>
      <a href="#" style={{ display: 'block', marginTop: '1rem', fontSize: 13, color: 'rgba(255,255,255,.55)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
        o completá el formulario · 2 min →
      </a>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#111', color: 'rgba(255,255,255,.35)', padding: '2rem', textAlign: 'center', fontSize: 12, lineHeight: 1.9 }}>
      <strong style={{ color: 'rgba(255,255,255,.8)' }}>Amira Fitness</strong> · Entrenamiento personalizado · Buenos Aires, Argentina
      <br />
      <a href="#" style={{ color: 'rgba(255,255,255,.35)' }}>Panel</a> · © 2025
    </footer>
  );
}

Object.assign(window, { Filosofia, Steps, Services, AppPreview, CTAFinal, Footer });
