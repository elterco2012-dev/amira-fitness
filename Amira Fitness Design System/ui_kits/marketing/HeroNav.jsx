/* global React */

const WA_URL = 'https://wa.me/5492226500790?text=Hola%20Amira!%20Quiero%20saber%20m%C3%A1s';

// ─── Nav ────────────────────────────────────────────────────────────────────
function Nav() {
  return (
    <nav style={navStyles.bar}>
      <a href="#" style={navStyles.brand}>
        <div style={navStyles.logo}>A</div>
        Amira Fitness
      </a>
      <div style={navStyles.links}>
        <a href="#como-funciona" style={navStyles.link}>Cómo funciona</a>
        <a href="#que-incluye" style={navStyles.link}>El servicio</a>
        <a href="#la-app" style={navStyles.link}>La app</a>
        <a href={WA_URL} target="_blank" rel="noreferrer" style={navStyles.link}>WhatsApp</a>
        <a href="#" style={navStyles.cta}>Quiero empezar</a>
      </div>
    </nav>
  );
}

const navStyles = {
  bar: { position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)', borderBottom: '1px solid var(--b)', padding: '0.9rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brand: { display: 'flex', alignItems: 'center', gap: 10, fontWeight: 500, fontSize: 15, color: 'var(--t)' },
  logo: { width: 34, height: 34, borderRadius: '50%', background: 'var(--vl)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'DM Serif Display',serif", fontSize: 14, color: 'var(--vd)' },
  links: { display: 'flex', alignItems: 'center', gap: '1.5rem' },
  link: { fontSize: 13, color: 'var(--tm)' },
  cta: { background: 'var(--v)', color: 'white', padding: '8px 18px', borderRadius: 'var(--rp)', fontSize: 13, fontWeight: 500 },
};

// ─── WhatsApp icon ─────────────────────────────────────────────────────────
function WAIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.138.564 4.14 1.544 5.875L0 24l6.336-1.52A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.366l-.36-.214-3.732.896.942-3.623-.235-.373A9.815 9.815 0 012.182 12C2.182 6.59 6.59 2.182 12 2.182S21.818 6.59 21.818 12 17.41 21.818 12 21.818z"/>
    </svg>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={heroStyles.wrap}>
      <div>
        <div style={heroStyles.badge}>Entrenadora personal · Buenos Aires</div>
        <h1 className="serif" style={heroStyles.quote}>
          No quiero darte <em style={heroStyles.em}>otra rutina de internet</em>.<br />
          Quiero conocerte y armarte la tuya.
        </h1>
        <p style={heroStyles.desc}>Soy Amira. Trabajo con pocas alumnas a la vez para poder responderte yo, no un bot. Te armo tu rutina, te la ajusto cada semana, y te contesto las dudas por WhatsApp el mismo día.</p>
        <a href={WA_URL} target="_blank" rel="noreferrer" style={heroStyles.cta}>
          <WAIcon /> Escribime y charlamos
        </a>
        <a href="#" style={heroStyles.alt}>o completá el formulario · 2 min →</a>
        <div style={heroStyles.trust}>
          <span style={heroStyles.trustItem}><span style={heroStyles.dot} />Cupos limitados</span>
          <span style={heroStyles.trustItem}><span style={heroStyles.dot} />Sin contrato</span>
          <span style={heroStyles.trustItem}><span style={heroStyles.dot} />Respuesta en el día</span>
        </div>
      </div>
      <div style={heroStyles.photo}>
        <img src="../../assets/foto-amira.jpg" alt="Amira" style={heroStyles.photoImg} />
      </div>
    </section>
  );
}

const heroStyles = {
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '5.5rem 2rem 5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' },
  badge: { fontSize: 11, fontWeight: 500, color: 'var(--v)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', display: 'block' },
  quote: { fontSize: '2.6rem', lineHeight: 1.15, color: 'var(--t)', marginBottom: '1.5rem' },
  em: { fontStyle: 'italic', color: 'var(--v)' },
  desc: { fontSize: '0.975rem', color: 'var(--tm)', marginBottom: '2rem', maxWidth: 440, lineHeight: 1.85 },
  cta: { display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: 'white', padding: '15px 26px', borderRadius: 'var(--rp)', fontSize: 15, fontWeight: 500, justifyContent: 'center', width: '100%', maxWidth: 380 },
  alt: { display: 'block', marginTop: '0.5rem', fontSize: 13, color: 'var(--tm)', textDecoration: 'underline', textUnderlineOffset: '3px', textAlign: 'center', maxWidth: 380 },
  trust: { display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '2rem' },
  trustItem: { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--tm)' },
  dot: { width: 6, height: 6, borderRadius: '50%', background: 'var(--v)' },
  photo: { borderRadius: 24, aspectRatio: '4/5', overflow: 'hidden', background: 'var(--s2)', border: '1px solid var(--b)' },
  photoImg: { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 70%', display: 'block' },
};

Object.assign(window, { Nav, Hero, WAIcon });
