// ============ APP / ROUTER ============

const app = document.getElementById('app');

function route(){
  const raw = location.hash || '#home';
  const [pathPart] = raw.split('?');
  const path = pathPart.replace('#','');
  const segments = path.split('/');

  renderNav(path);
  closeMobileMenu();

  let html = '';
  switch(segments[0]){
    case '': case 'home': html = PageHome(); break;
    case 'about': html = PageAbout(); break;
    case 'investigations': html = PageInvestigations(); break;
    case 'database': html = PageDatabase(); break;
    case 'case': html = PageCaseDetail(segments[1]); break;
    case 'research': html = PageResearch(); break;
    case 'methodology': html = PageMethodology(); break;
    case 'join': html = PageJoin(); break;
    case 'report': html = PageReport(); break;
    case 'contact': html = PageContact(); break;
    default: html = PageNotFound();
  }
  app.innerHTML = html;
  window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});

  // page-specific hooks
  if(segments[0]==='' || segments[0]==='home'){
    const orbitHost = document.getElementById('heroOrbit');
    if(orbitHost) orbitHost.innerHTML = heroOrbitSVG();
  }
  bindForms();
}

function bindForms(){
  bindGenericForm('reportForm', 'reportFormWrap', 'iuprn_reports',
    'Report received.',
    'Thank you \u2014 your report has been saved. Submitting a report does not guarantee that IUPRN will investigate it, but every report is reviewed. If you provided contact information, our team may follow up for more detail.');

  bindGenericForm('joinForm', 'joinFormWrap', 'iuprn_applications',
    'Application received.',
    'Thank you for your interest in joining IUPRN. Your application has been saved. We review applications on a rolling basis and will reach out using the details you provided.');

  bindGenericForm('contactForm', 'contactFormWrap', 'iuprn_messages',
    'Message sent.',
    'Thanks for reaching out \u2014 your message has been saved. We\u2019ll respond as soon as we can.');
}

function bindGenericForm(formId, wrapId, storageKey, title, body){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = {};
    form.querySelectorAll('input, textarea, select').forEach(el=>{
      if(el.type === 'checkbox'){ data[el.id] = el.checked; }
      else if(el.multiple){ data[el.id] = Array.from(el.selectedOptions).map(o=>o.value); }
      else { data[el.id] = el.value; }
    });
    data.submittedAt = new Date().toISOString();
    try{
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      existing.push(data);
      localStorage.setItem(storageKey, JSON.stringify(existing));
    }catch(err){ /* storage unavailable — proceed without persistence */ }

    const wrap = document.getElementById(wrapId);
    if(wrap){
      wrap.innerHTML = `<div class="success-box"><strong style="display:block; margin-bottom:6px; color:var(--green)">${title}</strong><span style="color:var(--text-dim)">${body}</span></div>`;
    }
  });
}

function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
}

document.getElementById('hamburgerBtn').addEventListener('click', ()=>{
  document.getElementById('mobileMenu').classList.toggle('open');
});
document.getElementById('mobileMenu').addEventListener('click', (e)=>{
  if(e.target.tagName === 'A') closeMobileMenu();
});

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  renderBrand();
  renderFooter();
  initStarfield();
  route();
});
