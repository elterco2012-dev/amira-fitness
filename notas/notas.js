// Notas de Amira Fitness (26/10/2026): cuenta la visita y el clic a WhatsApp igual que la
// página principal (afCuenta y afAnotar están repetidas ahí, en registro y en bio).
// La visita se anota como "/notas/<nota>", con la misma clave diaria que la principal: cada
// persona cuenta una vez por día, en la página por la que entró. El clic a WhatsApp, como
// "/notas/wa": el panel lo suma a "Tocaron WhatsApp".
(function(){
  // Analytics, Clarity y Meta Pixel, los mismos que la página principal.
  try{
    var g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtag/js?id=G-YM3V2F8C2Z';
    document.head.appendChild(g);
    window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};
    gtag('js',new Date());gtag('config','G-YM3V2F8C2Z');
    (function(w,d,a,r,i,t,y){
      w[a]=w[a]||function(){(w[a].q=w[a].q||[]).push(arguments)};
      t=d.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;
      y=d.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,'clarity','script','ytg5n64mzv');
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
    (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init','1143039091621214');fbq('track','PageView');
  }catch(e){}
})();

function afOrigen(){
  try{
    var qs=new URLSearchParams(location.search);
    var utm=(qs.get('utm_source')||'').toLowerCase();
    var ref=(document.referrer||'').toLowerCase();
    if(qs.get('gclid')||utm==='google'||utm==='cpc'||utm==='googleads'||utm==='google-ads')return'Google Ads';
    if(utm.indexOf('instagram')>-1||utm==='ig')return'Instagram';
    if(utm.indexOf('facebook')>-1||utm==='fb')return'Facebook';
    if(ref.indexOf('instagram')>-1)return'Instagram';
    if(ref.indexOf('facebook')>-1||ref.indexOf('fb.')>-1)return'Facebook';
    if(ref.indexOf('tiktok')>-1)return'TikTok';
    if(ref.indexOf('google.')>-1)return'Google';
    if(!ref)return'Directo';
    return'Otro';
  }catch(e){ return'Directo'; }
}
function afCuenta(clave){
  try{
    var ua=navigator.userAgent||'';
    if(navigator.webdriver||/bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|python|curl|wget/i.test(ua))return false;
    if(localStorage.getItem('af-access-token')||localStorage.getItem('af-alumna-token'))return false;
    var d=new Date(),k='af-cont-'+clave+'-'+d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
    if(localStorage.getItem(k))return false;
    for(var i=localStorage.length-1;i>=0;i--){var x=localStorage.key(i);if(x&&x.indexOf('af-cont-'+clave+'-')===0)localStorage.removeItem(x);}
    localStorage.setItem(k,'1');
  }catch(e){}
  return true;
}
function afAnotar(page,origen){
  try{
    fetch('https://aywkeoxwybzcexaichtv.supabase.co/rest/v1/page_views',{
      method:'POST',keepalive:true,
      headers:{'Content-Type':'application/json','apikey':'sb_publishable_8j3ihLED6ui6L32T0QQ5EQ_soH0TSQb','Prefer':'return=minimal'},
      body:JSON.stringify({page:page,referrer:document.referrer||null,origen:origen})
    }).catch(function(){});
  }catch(e){}
}
function afOrigenGuardado(){
  try{
    var o=localStorage.getItem('af-origen'),ts=parseInt(localStorage.getItem('af-origen-ts')||'0',10);
    if(o&&(!ts||Date.now()-ts<45*86400000))return o;
  }catch(e){}
  return afOrigen();
}
// De dónde vino, para el clic a WhatsApp de esta página o de la principal.
(function(){try{
  var src=afOrigen();
  if((src!=='Directo'&&src!=='Otro')||!localStorage.getItem('af-origen')){
    localStorage.setItem('af-origen',src);
    localStorage.setItem('af-origen-ts',String(Date.now()));
  }
}catch(e){}})();
// La visita cuenta a los 3 segundos a la vista: un robot entra y se va.
(function(){
  var p=location.pathname.replace(/\/+$/,'');
  var pagina=p==='/notas'?'/notas/':p;
  var t=null,hecho=false;
  function intentar(){
    if(hecho||document.visibilityState!=='visible')return;
    clearTimeout(t);
    t=setTimeout(function(){
      if(hecho||document.visibilityState!=='visible')return;
      hecho=true;
      if(afCuenta('visita'))afAnotar(pagina,afOrigen());
    },3000);
  }
  intentar();
  document.addEventListener('visibilitychange',intentar);
})();
document.addEventListener('click',function(e){
  var a=e.target.closest&&e.target.closest('a[href*="wa.me"]');
  if(!a)return;
  if(afCuenta('wa'))afAnotar('/notas/wa',afOrigenGuardado());
  try{
    if(typeof gtag==='function')gtag('event','click_whatsapp',{origen:'nota'});
    if(typeof fbq==='function')fbq('track','Contact');
    if(typeof clarity==='function')clarity('set','escribio_whatsapp','si');
  }catch(_){}
},true);
