/* global React, DesignCanvas, DCSection, DCArtboard, HomeBefore, HomeAfter, NotesBefore, NotesAfter, BottomNavBefore, BottomNavAfter, ExCardBefore, ExCardAfter, DayTabsBefore, DayTabsAfter, ProgressBefore, ProgressAfter, PanelBefore, PanelAfter, SidebarBefore, SidebarAfter, MetricBefore, MetricAfter, LoginBefore, LoginAfter, DrawerBefore, DrawerAfter */

function Card({ children, padding = 18, width, height, bg = 'var(--bg)' }) {
  return (
    <div data-theme="light" style={{ width, height, padding, background: bg, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>{children}</div>
  );
}

function ImprovementsApp() {
  return (
    <DesignCanvas title="Amira Fitness — Antes / Después" subtitle="Diez cambios concretos por superficie. Click en cualquier mockup para verlo en pantalla completa.">

      {/* ─── Sección 1: PANEL — la primera impresión ─────────────────────── */}
      <DCSection id="panel-full" title="🖥️ Panel · La primera impresión">
        <DCArtboard id="panel-before" label="Antes — emoji + 'Conectado · Supabase' + tab pintón" width={980} height={620}>
          <PanelBefore />
        </DCArtboard>
        <DCArtboard id="panel-after" label="Después — Lucide + barra activa + tabla con última actividad" width={980} height={620}>
          <PanelAfter />
        </DCArtboard>
      </DCSection>

      {/* ─── Sección 2: ALUMNA HOME ───────────────────────────────────────── */}
      <DCSection id="alumna-home" title="📱 Alumna · Home de la rutina">
        <DCArtboard id="home-before" label="Antes — hero card redundante + UI con emoji" width={380} height={720}>
          <HomeBefore />
        </DCArtboard>
        <DCArtboard id="home-after" label="Después — sin hero, iconos Lucide, exercise card más limpia" width={380} height={720}>
          <HomeAfter />
        </DCArtboard>
      </DCSection>

      {/* ─── Sección 3: ALUMNA NOTAS ──────────────────────────────────────── */}
      <DCSection id="alumna-notas" title="💬 Alumna · Notas con Amira">
        <DCArtboard id="notas-before" label="Antes — lista plana, mensajes uniformes" width={380} height={720}>
          <NotesBefore />
        </DCArtboard>
        <DCArtboard id="notas-after" label="Después — chat real, bubbles diferenciados" width={380} height={720}>
          <NotesAfter />
        </DCArtboard>
      </DCSection>

      {/* ─── Sección 4: COMPONENTES INDIVIDUALES ──────────────────────────── */}
      <DCSection id="bottom-nav" title="Componente · Bottom nav">
        <DCArtboard id="bn-before" label="Antes — emoji" width={400} height={120}>
          <Card width={400} height={120} bg="#e8e8e6" padding={20}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
              <BottomNavBefore />
            </div>
          </Card>
        </DCArtboard>
        <DCArtboard id="bn-after" label="Después — Lucide" width={400} height={120}>
          <Card width={400} height={120} bg="#e8e8e6" padding={20}>
            <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,.06)' }}>
              <BottomNavAfter />
            </div>
          </Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="exercise" title="Componente · Exercise card">
        <DCArtboard id="ex-before" label="Antes — 5 controles, botón 'Marcar' full-width" width={420} height={300}>
          <Card width={420} height={300}>
            <ExCardBefore />
            <ExCardBefore done={true} />
          </Card>
        </DCArtboard>
        <DCArtboard id="ex-after" label="Después — tap entero, iconos, peso inline, done sutil" width={420} height={240}>
          <Card width={420} height={240}>
            <ExCardAfter />
            <ExCardAfter done={true} />
          </Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="day-progress" title="Componente · Day tabs + progress">
        <DCArtboard id="dp-before" label="Antes — tabs verdes saturadas + progress text-arriba" width={400} height={180}>
          <Card width={400} height={180}>
            <DayTabsBefore />
            <div style={{ marginTop: 16 }}><ProgressBefore /></div>
          </Card>
        </DCArtboard>
        <DCArtboard id="dp-after" label="Después — tabs sutiles + progress con número adentro" width={400} height={180}>
          <Card width={400} height={180}>
            <DayTabsAfter />
            <div style={{ marginTop: 16 }}><ProgressAfter /></div>
          </Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="sidebar" title="Componente · Sidebar del panel">
        <DCArtboard id="sb-before" label="Antes — emoji + tab pintón verde claro + Supabase footer" width={260} height={520}>
          <Card width={260} height={520} padding={0}><div style={{ height: 520, display: 'flex' }}><SidebarBefore /></div></Card>
        </DCArtboard>
        <DCArtboard id="sb-after" label="Después — Lucide + barra lateral verde + footer limpio" width={260} height={520}>
          <Card width={260} height={520} padding={0}><div style={{ height: 520, display: 'flex' }}><SidebarAfter /></div></Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="metrics" title="Componente · Métricas del dashboard">
        <DCArtboard id="m-before" label="Antes — número grande, sin contexto" width={680} height={140}>
          <Card width={680} height={140}><MetricBefore /></Card>
        </DCArtboard>
        <DCArtboard id="m-after" label="Después — delta + sparkline tenue" width={680} height={160}>
          <Card width={680} height={160}><MetricAfter /></Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="login" title="Componente · Login del panel">
        <DCArtboard id="login-before" label="Antes — un input genérico" width={480} height={360}>
          <Card width={480} height={360}><LoginBefore /></Card>
        </DCArtboard>
        <DCArtboard id="login-after" label="Después — email + password + 'Hola Amira' con foto" width={480} height={420}>
          <Card width={480} height={420}><LoginAfter /></Card>
        </DCArtboard>
      </DCSection>

      <DCSection id="drawer" title="Componente · Drawer header de la alumna">
        <DCArtboard id="dr-before" label="Antes — solo X de cerrar" width={520} height={240}>
          <Card width={520} height={240}><DrawerBefore /></Card>
        </DCArtboard>
        <DCArtboard id="dr-after" label="Después — overflow menu, badge de estado, indicador de actividad" width={520} height={240}>
          <Card width={520} height={240}><DrawerAfter /></Card>
        </DCArtboard>
      </DCSection>

    </DesignCanvas>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<ImprovementsApp />);
