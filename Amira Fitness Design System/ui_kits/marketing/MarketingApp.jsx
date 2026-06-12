/* global React, Nav, Hero, Filosofia, Steps, Services, AppPreview, CTAFinal, Footer */

function MarketingApp() {
  return (
    <>
      <Nav />
      <Hero />
      <Filosofia />
      <Steps />
      <Services />
      <AppPreview />
      <CTAFinal />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<MarketingApp />);
