// ============ PAGES ============

function PageHome(){
  const featured = CASES[0];
  return `
  <section class="hero-wrap" style="padding:120px 0 90px; overflow:hidden">
    <div class="container hero-content">
      <div style="max-width:760px">
        <div class="eyebrow"><span class="dot"></span>An independent Indian research initiative</div>
        <h1 style="font-size:clamp(38px,6vw,64px); line-height:1.06; margin-bottom:22px">
          Investigating what we don\u2019t yet understand.
        </h1>
        <p class="lede" style="font-size:19px; max-width:600px">
          We investigate extraordinary claims through evidence, experimentation, interdisciplinary research and independent analysis.
        </p>
        <div style="display:flex; gap:14px; margin-top:34px; flex-wrap:wrap">
          <a href="#investigations" class="btn btn-primary">Explore Investigations</a>
          <a href="#report" class="btn btn-ghost">Report a Phenomenon</a>
        </div>
        <a href="#join" style="display:inline-block; margin-top:22px; font-size:14px; color:var(--cyan); border-bottom:1px solid var(--cyan-soft)">Join the Network</a>
      </div>
    </div>
    <div id="heroOrbit" class="hero-orbit" style="right:-160px; top:20px; width:600px; height:600px; opacity:0.8; pointer-events:none"></div>
  </section>

  <section class="section-tight" style="border-top:1px solid var(--line-soft); border-bottom:1px solid var(--line-soft)">
    <div class="container grid-4 gap-32">
      ${[
        ['Evidence First','Conclusions follow the evidence, not the other way around.'],
        ['No Predetermined Conclusions','We do not begin an investigation already knowing the answer.'],
        ['Reproducible Investigation','Where possible, our methods can be checked and repeated by others.'],
        ['Open to Being Wrong','Publishing a mistaken assessment is preferable to hiding one.'],
      ].map(([t,d])=>`
        <div>
          <h3 style="font-size:15.5px; margin-bottom:8px; color:var(--brass)">${t}</h3>
          <p class="text-dim" style="font-size:13.5px">${d}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Featured investigation</div>
      <div class="grid-featured" style="border:1px solid var(--line)">
        <div class="panel" style="border:none; border-radius:0; padding:42px">
          <span class="mono text-faint" style="font-size:12.5px">${featured.id} \u00b7 demonstration case</span>
          <h2 style="font-size:30px; margin:14px 0 18px">${featured.title}</h2>
          <p class="text-dim" style="font-size:15px; margin-bottom:24px; max-width:480px">${featured.claim}</p>
          <div style="display:flex; gap:28px; flex-wrap:wrap; margin-bottom:28px">
            <div><div class="text-faint" style="font-size:11.5px; margin-bottom:4px">STATUS</div>${StatusBadge(featured.status)}</div>
            <div><div class="text-faint" style="font-size:11.5px; margin-bottom:4px">LOCATION</div><div style="font-size:14px">${featured.region}</div></div>
            <div><div class="text-faint" style="font-size:11.5px; margin-bottom:4px">EVIDENCE</div>${EvidenceTags(featured.evidence)}</div>
          </div>
          <a href="#case/${featured.id}" class="btn btn-primary">View Case</a>
        </div>
        <div class="featured-side" style="padding:42px; display:flex; flex-direction:column; justify-content:center; background:radial-gradient(circle at 70% 30%, rgba(127,216,232,0.07), transparent 60%)">
          <p class="text-faint" style="font-size:12.5px; letter-spacing:0.02em; text-transform:uppercase; margin-bottom:10px">Demonstration content</p>
          <p class="text-dim" style="font-size:14px">This case illustrates how IUPRN structures an investigation report. It is example content published to demonstrate the format \u2014 not a claim about a real event.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="section" style="border-top:1px solid var(--line-soft)">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Process</div>
      <h2 style="font-size:32px; max-width:520px; margin-bottom:8px">How we investigate</h2>
      <p class="lede">A standardized framework applied consistently, whatever the phenomenon.</p>
      <div style="margin-top:36px; max-width:720px">${ProcessSteps()}</div>
    </div>
  </section>

  <section class="section" style="border-top:1px solid var(--line-soft)">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Research areas</div>
      <h2 style="font-size:32px; max-width:520px; margin-bottom:30px">Where the investigation happens</h2>
      ${ResearchAreaCards()}
    </div>
  </section>

  <section class="section" style="border-top:1px solid var(--line-soft)">
    <div class="container grid-2 gap-56 align-center">
      <div>
        <div class="eyebrow"><span class="dot"></span>Explained archive</div>
        <h2 style="font-size:30px; margin-bottom:16px">Mystery \u2192 Explanation</h2>
        <p class="text-dim" style="font-size:15px; margin-bottom:24px; max-width:440px">
          A large part of our work ends here: a report that seemed strange, traced back to an ordinary cause. We treat these cases as successes, not disappointments \u2014 they are proof that the method works.
        </p>
        <a href="#database?status=Explained" class="btn btn-outline-cyan">Browse the explained archive</a>
      </div>
      <div style="display:flex; flex-direction:column; gap:14px">
        ${EXPLAINED_HIGHLIGHTS.map(c=>`
          <a href="#case/${c.id}" class="panel" style="display:flex; justify-content:space-between; align-items:center; padding:18px 22px; gap:16px">
            <div>
              <div class="mono text-faint" style="font-size:11.5px; margin-bottom:4px">${c.id}</div>
              <div style="font-size:14.5px">${c.title}</div>
            </div>
            ${StatusBadge(c.status)}
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="section" style="border-top:1px solid var(--line-soft); border-bottom:1px solid var(--line-soft); background:linear-gradient(180deg, rgba(127,216,232,0.03), transparent)">
    <div class="container" style="max-width:760px; text-align:left">
      <div class="eyebrow"><span class="dot"></span>A defining principle</div>
      <h2 style="font-size:34px; margin-bottom:22px; line-height:1.25">\u201cUnexplained\u201d is not the same as \u201csupernatural.\u201d</h2>
      <div class="grid-2 gap-28" style="margin-top:30px">
        <div class="panel" style="padding:24px">
          <p class="text-faint" style="font-size:12px; margin-bottom:8px">UNEXPLAINED MEANS</p>
          <p style="font-size:16px">\u201cWe currently do not have enough evidence to determine the cause.\u201d</p>
        </div>
        <div class="panel" style="padding:24px">
          <p class="text-faint" style="font-size:12px; margin-bottom:8px">IT DOES NOT MEAN</p>
          <p style="font-size:16px; color:var(--text-dim)">\u201cSupernatural.\u201d</p>
        </div>
      </div>
    </div>
  </section>
  `;
}

function heroOrbitSVG(){
  return `
  <svg viewBox="0 0 640 640" width="640" height="640" style="overflow:visible">
    <g stroke="#c9a24b" stroke-width="1" fill="none" opacity="0.5">
      <ellipse cx="320" cy="320" rx="270" ry="120" transform="rotate(-18 320 320)"/>
    </g>
    <g stroke="#7fd8e8" stroke-width="1" fill="none" opacity="0.35">
      <ellipse cx="320" cy="320" rx="270" ry="120" transform="rotate(46 320 320)"/>
    </g>
    <circle cx="320" cy="320" r="64" fill="none" stroke="#e8ecf1" stroke-width="1" opacity="0.5"/>
    <circle cx="320" cy="320" r="5" fill="#c9a24b" id="orbitDot1">
      <animateMotion dur="14s" repeatCount="indefinite" rotate="auto"
        path="M320,320 m-270,-108 a270,120 0 1,0 540,216 a270,120 0 1,0 -540,-216" />
    </circle>
    <circle cx="320" cy="320" r="3.5" fill="#7fd8e8" id="orbitDot2">
      <animateMotion dur="9s" repeatCount="indefinite" rotate="auto"
        path="M320,320 m196,-196 a277,277 0 1,1 -392,0 a277,277 0 1,1 392,0" />
    </circle>
  </svg>`;
}

function PageAbout(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container" style="max-width:820px">
      <div class="eyebrow"><span class="dot"></span>About IUPRN</div>
      <h1 style="font-size:40px; margin-bottom:22px">An emerging independent research initiative</h1>
      <p class="text-dim" style="font-size:16.5px; margin-bottom:18px">
        IUPRN \u2014 India\u2019s Unexplained Phenomena Research Network \u2014 is an emerging independent research initiative built around a simple idea: unusual reports deserve careful investigation, not immediate belief or immediate dismissal.
      </p>
      <p class="text-dim" style="font-size:16.5px; margin-bottom:18px">
        We are not affiliated with any government body or university, and we hold no scientific certification. We are a network of volunteers, students and researchers organizing around a shared methodology, working to build the rigorous track record that credibility requires over time.
      </p>
      <div class="notice" style="margin:28px 0">
        IUPRN is not a government agency, is not affiliated with any university, and does not claim scientific certification or peer-reviewed authority. We are a volunteer-driven research initiative at an early stage, and we are transparent about that.
      </div>

      <div style="margin:52px 0">
        <h2 style="font-size:26px; margin-bottom:14px">Our philosophy</h2>
        <div class="panel" style="padding:32px">
          <p style="font-family:var(--serif); font-size:22px; line-height:1.4">\u201cWe neither believe nor disbelieve. We investigate.\u201d</p>
        </div>
      </div>

      <div style="margin:52px 0">
        <h2 style="font-size:26px; margin-bottom:14px">Our mission</h2>
        <p class="text-dim" style="font-size:16px">
          To document, investigate, analyze and understand unusual phenomena through evidence, scientific methodology, interdisciplinary research, and responsible public participation.
        </p>
      </div>

      <div style="margin:52px 0">
        <h2 style="font-size:26px; margin-bottom:14px">Vision</h2>
        <p class="text-dim" style="font-size:16px">To build a rigorous community for investigating observations that remain poorly understood \u2014 grounded in evidence, open to scrutiny, and useful to the people who report to us.</p>
      </div>

      <div style="margin:52px 0">
        <h2 style="font-size:26px; margin-bottom:20px">Values</h2>
        <div class="grid-2 gap-1" style="background:var(--line); border:1px solid var(--line)">
          ${VALUES.map(v=>`
            <div class="panel" style="border:none; border-radius:0; padding:22px 24px">
              <h3 style="font-size:15.5px; margin-bottom:6px; color:var(--brass)">${v.name}</h3>
              <p class="text-dim" style="font-size:13.5px">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function PageInvestigations(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Investigations</div>
      <h1 style="font-size:38px; max-width:640px; margin-bottom:16px">Active and completed investigations</h1>
      <p class="lede" style="margin-bottom:44px">Every case below is example content for V1, demonstrating how IUPRN structures and reports an investigation. Real cases will replace this content as they are conducted.</p>
      <div class="grid-2 gap-22">
        ${CASES.map(c=>CaseCard(c)).join('')}
      </div>
      <div style="text-align:center; margin-top:40px">
        <a href="#database" class="btn btn-ghost">Open full case database</a>
      </div>
    </div>
  </section>`;
}

let dbFilters = { q:'', year:'', region:'', area:'', status:'', evidence:'' };

function PageDatabase(){
  setTimeout(bindDatabaseFilters, 0);
  return `
  <section class="section" style="padding-top:64px">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Case database</div>
      <h1 style="font-size:38px; max-width:640px; margin-bottom:10px">Public case database</h1>
      <p class="lede" style="margin-bottom:8px">Search and filter every case IUPRN has logged.</p>
      <div class="notice" style="max-width:640px; margin:18px 0 36px">All cases shown below are sample data created to demonstrate this database interface. No real investigations have been published yet.</div>

      <div class="panel" style="padding:22px; margin-bottom:32px">
        <div class="form-row-3" style="margin-bottom:16px">
          <div class="field" style="margin:0">
            <label for="f-q">Search</label>
            <input id="f-q" type="text" placeholder="Case ID, title or keyword\u2026">
          </div>
          <div class="field" style="margin:0">
            <label for="f-year">Year</label>
            <select id="f-year"><option value="">All years</option>${[...new Set(CASES.map(c=>c.year))].sort((a,b)=>b-a).map(y=>`<option value="${y}">${y}</option>`).join('')}</select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-status">Status</label>
            <select id="f-status"><option value="">All statuses</option>${Object.keys(STATUS_META).map(s=>`<option value="${s}">${s}</option>`).join('')}</select>
          </div>
        </div>
        <div class="form-row-3">
          <div class="field" style="margin:0">
            <label for="f-region">Region</label>
            <select id="f-region"><option value="">All regions</option>${[...new Set(CASES.map(c=>c.region))].map(r=>`<option value="${r}">${r}</option>`).join('')}</select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-area">Research area</label>
            <select id="f-area"><option value="">All areas</option>${RESEARCH_AREAS.map(a=>`<option value="${a.key}">${a.name}</option>`).join('')}</select>
          </div>
          <div class="field" style="margin:0">
            <label for="f-evidence">Evidence type</label>
            <select id="f-evidence"><option value="">All evidence types</option>${[...new Set(CASES.flatMap(c=>c.evidence))].map(e=>`<option value="${e}">${e}</option>`).join('')}</select>
          </div>
        </div>
      </div>

      <div id="dbCount" class="text-faint" style="font-size:13px; margin-bottom:16px"></div>
      <div id="dbResults" class="grid-2 gap-22"></div>
    </div>
  </section>`;
}

function bindDatabaseFilters(){
  const ids = ['f-q','f-year','f-region','f-area','f-status','f-evidence'];
  const params = new URLSearchParams((location.hash.split('?')[1]||''));
  if(params.get('status')) dbFilters.status = params.get('status');

  const map = {'f-q':'q','f-year':'year','f-region':'region','f-area':'area','f-status':'status','f-evidence':'evidence'};
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.value = dbFilters[map[id]] || '';
    el.addEventListener('input', ()=>{ dbFilters[map[id]] = el.value; renderDbResults(); });
    el.addEventListener('change', ()=>{ dbFilters[map[id]] = el.value; renderDbResults(); });
  });
  renderDbResults();
}

function renderDbResults(){
  const results = CASES.filter(c=>{
    if(dbFilters.q){
      const q = dbFilters.q.toLowerCase();
      if(!(c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q) || c.phenomenon.toLowerCase().includes(q))) return false;
    }
    if(dbFilters.year && String(c.year) !== dbFilters.year) return false;
    if(dbFilters.region && c.region !== dbFilters.region) return false;
    if(dbFilters.area && c.area !== dbFilters.area) return false;
    if(dbFilters.status && c.status !== dbFilters.status) return false;
    if(dbFilters.evidence && !c.evidence.includes(dbFilters.evidence)) return false;
    return true;
  });
  const countEl = document.getElementById('dbCount');
  const resEl = document.getElementById('dbResults');
  if(!countEl || !resEl) return;
  countEl.textContent = `${results.length} case${results.length===1?'':'s'} found`;
  resEl.innerHTML = results.length ? results.map(c=>CaseCard(c)).join('') :
    `<div class="panel" style="padding:40px; text-align:center; grid-column:1/-1"><p class="text-dim">No cases match these filters yet. Try widening your search.</p></div>`;
}

function PageCaseDetail(id){
  const c = CASES.find(x=>x.id===id);
  if(!c) return `<div class="section container"><p>Case not found. <a href="#database" style="color:var(--cyan)">Return to the database.</a></p></div>`;
  return `
  <section class="section" style="padding-top:56px">
    <div class="container" style="max-width:860px">
      <a href="#database" class="text-faint" style="font-size:13px">\u2190 Back to database</a>
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin:22px 0 8px; flex-wrap:wrap">
        <span class="mono text-faint" style="font-size:13px">${c.id}${c.demo?' \u00b7 demonstration case':''}</span>
        ${StatusBadge(c.status)}
      </div>
      <h1 style="font-size:36px; margin-bottom:18px">${c.title}</h1>
      <div style="display:flex; gap:28px; flex-wrap:wrap; margin-bottom:36px; font-size:13.5px" class="text-dim">
        <div><span class="text-faint">Date: </span>${c.date}</div>
        <div><span class="text-faint">Location: </span>${c.region}</div>
        <div><span class="text-faint">Phenomenon: </span>${c.phenomenon}</div>
      </div>

      ${c.demo ? `<div class="notice" style="margin-bottom:40px">This is a demonstration case created to show how IUPRN structures an investigation report. It does not describe a real event.</div>` : ''}

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">The Claim</h2>
        <p class="text-dim" style="font-size:15px">${c.claim}</p>
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">Initial Evidence</h2>
        ${EvidenceTags(c.evidence)}
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">Context</h2>
        <p class="text-dim" style="font-size:15px">${c.environment}</p>
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:6px">Hypotheses</h2>
        <p class="text-faint" style="font-size:12.5px; margin-bottom:6px">Ordinary explanations are considered alongside extraordinary ones.</p>
        ${c.hypotheses.map(HypothesisRow).join('')}
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">Testing</h2>
        <p class="text-dim" style="font-size:15px">${c.investigation}</p>
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">Findings</h2>
        <p class="text-dim" style="font-size:15px">${c.findings}</p>
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px; border-color:var(--brass-soft)">
        <h2 style="font-size:20px; margin-bottom:12px">Conclusion</h2>
        <p style="font-size:15px; margin-bottom:14px"><strong style="color:var(--text)">Current assessment: ${c.status}</strong></p>
        <p class="text-dim" style="font-size:15px; margin-bottom:14px">${c.conclusion}</p>
        <p class="text-faint" style="font-size:13px">Confidence / uncertainty: ${c.confidence}</p>
      </div>

      <div class="panel" style="padding:30px; margin-bottom:28px">
        <h2 style="font-size:20px; margin-bottom:12px">Investigator Notes</h2>
        <p class="text-dim" style="font-size:15px">${c.notes}</p>
      </div>

      <div style="margin-bottom:40px">
        <h2 style="font-size:20px; margin-bottom:20px">Evidence Timeline</h2>
        ${Timeline(c.timeline)}
      </div>

      <div style="margin-bottom:20px">
        <h2 style="font-size:16px; margin-bottom:12px" class="text-faint">Related research areas</h2>
        <div style="display:flex; gap:10px; flex-wrap:wrap">
          ${c.related.map(r=>`<span style="font-size:12.5px; border:1px solid var(--line); padding:6px 12px; border-radius:2px; color:var(--text-dim)">${r}</span>`).join('')}
        </div>
      </div>
    </div>
  </section>`;
}

function PageResearch(){
  const cats = [...new Set(PUBLICATIONS.map(p=>p.category))];
  return `
  <section class="section" style="padding-top:64px">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Research</div>
      <h1 style="font-size:38px; max-width:640px; margin-bottom:14px">Publications & reports</h1>
      <p class="lede" style="margin-bottom:14px">Case reports, experimental studies, literature reviews, data analysis, methodology papers and educational resources.</p>
      <div class="notice" style="max-width:680px; margin-bottom:20px">
        We clearly distinguish <strong style="color:var(--green)">peer-reviewed research</strong> from <strong style="color:var(--brass)">IUPRN preliminary reports</strong>. Nothing on this site is labeled peer-reviewed unless it genuinely has been.
      </div>
      <p class="text-faint" style="font-size:12.5px; margin-bottom:40px">All entries below are placeholder V1 content.</p>
      <div class="grid-2 gap-22">
        ${PUBLICATIONS.map(PublicationCard).join('')}
      </div>
    </div>
  </section>`;
}

function PageMethodology(){
  const sections = [
    ['Observation','We separate what was directly observed from any interpretation added to it afterward. "A light moved across the sky" and "a UFO flew overhead" are different claims \u2014 we record the first before considering the second.'],
    ['Evidence Preservation','Original photographs, video, audio and their metadata are preserved unedited from the moment a case is opened, so nothing is lost or altered before it can be analysed.'],
    ['Alternative Explanations','Ordinary explanations are always considered before extraordinary ones. This is not a bias against unusual conclusions \u2014 it is how any credible investigation is expected to proceed.'],
    ['Falsifiability','For every hypothesis we ask: what evidence would prove this wrong? A hypothesis that cannot be disproven by any possible evidence is treated with appropriate caution.'],
    ['Reproducibility','Where it is safe and appropriate, we attempt to reproduce the conditions of a report \u2014 as with testing whether a camera artifact can be recreated.'],
    ['Independent Review','Findings are shared for scrutiny. We actively invite alternative interpretations rather than treating our first conclusion as final.'],
    ['Uncertainty','We report what we don\u2019t know as carefully as what we do. Uncertainty is never dressed up as proof of anything \u2014 ordinary or extraordinary.'],
  ];
  return `
  <section class="section" style="padding-top:64px">
    <div class="container" style="max-width:820px">
      <div class="eyebrow"><span class="dot"></span>Methodology</div>
      <h1 style="font-size:38px; margin-bottom:18px">How IUPRN investigates</h1>
      <p class="lede" style="margin-bottom:48px">IUPRN follows a standardized investigation framework applied consistently across every case, regardless of how unusual the report may seem.</p>

      ${sections.map(([t,d])=>`
        <div style="padding:26px 0; border-top:1px solid var(--line-soft)">
          <h2 style="font-size:19px; margin-bottom:10px">${t}</h2>
          <p class="text-dim" style="font-size:15px; max-width:640px">${d}</p>
        </div>
      `).join('')}
      <div style="border-top:1px solid var(--line-soft)"></div>

      <div class="panel" style="padding:34px; margin-top:48px; text-align:center">
        <p style="font-family:var(--serif); font-size:22px; line-height:1.4">\u201cUnexplained is not the same as supernatural.\u201d</p>
      </div>
    </div>
  </section>`;
}

function PageJoin(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Join IUPRN</div>
      <h1 style="font-size:38px; max-width:640px; margin-bottom:14px">Join the network</h1>
      <p class="lede" style="margin-bottom:44px; max-width:640px">IUPRN is built by volunteers, students and researchers across disciplines. Here is how people take part.</p>

      <div class="grid-2 gap-1" style="background:var(--line); border:1px solid var(--line); margin-bottom:52px">
        ${ROLES.map(r=>`
          <div class="panel" style="border:none; border-radius:0; padding:26px">
            <h3 style="font-size:17px; margin-bottom:8px">${r.title}</h3>
            <p class="text-dim" style="font-size:13.5px; margin-bottom:14px">${r.desc}</p>
            <div style="display:flex; gap:8px; flex-wrap:wrap">${r.tags.map(t=>`<span style="font-size:11px; color:var(--text-faint); border:1px solid var(--line); padding:3px 9px; border-radius:2px">${t}</span>`).join('')}</div>
          </div>
        `).join('')}
      </div>

      <div class="notice" style="max-width:760px; margin-bottom:44px">
        <strong style="color:var(--brass)">Safeguarding notice.</strong> IUPRN may include participants under 18. All field activities must be lawful, safe, permission-based and supervised by a responsible adult or guardian. Minors may not take part in field investigations without documented parental or guardian consent, and will never be asked to travel alone, enter private property, or contact witnesses unsupervised. Applicants under 18 should apply with a parent or guardian's knowledge.
      </div>

      <div class="panel" style="padding:36px; max-width:680px">
        <h2 style="font-size:22px; margin-bottom:22px">Application form</h2>
        <div id="joinFormWrap">
          <form id="joinForm">
            <div class="field">
              <label for="j-name">Full name</label>
              <input id="j-name" required>
            </div>
            <div class="form-row">
              <div class="field">
                <label for="j-age">Age group</label>
                <select id="j-age" required>
                  <option value="">Select\u2026</option>
                  <option>Under 18 (with guardian consent)</option>
                  <option>18\u201324</option>
                  <option>25\u201334</option>
                  <option>35\u201344</option>
                  <option>45+</option>
                </select>
              </div>
              <div class="field">
                <label for="j-city">City / region</label>
                <input id="j-city" required>
              </div>
            </div>
            <div class="field">
              <label for="j-interest">Areas of interest</label>
              <select id="j-interest" multiple size="4">
                ${ROLES.map(r=>`<option>${r.title}</option>`).join('')}
              </select>
              <span class="hint">Hold Ctrl / Cmd to select more than one.</span>
            </div>
            <div class="field">
              <label for="j-skills">Relevant skills or background</label>
              <textarea id="j-skills" placeholder="E.g. photography, statistics, physics, audio engineering, writing\u2026"></textarea>
            </div>
            <div class="field">
              <label for="j-why">Why do you want to join IUPRN?</label>
              <textarea id="j-why" required></textarea>
            </div>
            <div class="field">
              <label for="j-portfolio">Portfolio / social / GitHub <span class="text-faint">(optional)</span></label>
              <input id="j-portfolio" placeholder="https://\u2026">
            </div>
            <div class="checkbox-row">
              <input type="checkbox" id="j-consent" required>
              <label for="j-consent">I confirm that any field activity I take part in will be lawful, safe, permission-based and appropriately supervised, and that applicants under 18 have a guardian's knowledge of this application.</label>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Submit application</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function PageReport(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container" style="max-width:760px">
      <div class="eyebrow"><span class="dot"></span>Report a case</div>
      <h1 style="font-size:38px; margin-bottom:14px">Report a phenomenon</h1>
      <p class="lede" style="margin-bottom:8px">Tell us what you observed. The more detail you can provide, the more useful your report will be.</p>
      <div class="notice" style="margin:22px 0 36px">Submitting a report does not guarantee that IUPRN will investigate it. Reports are reviewed and prioritized based on available evidence and researcher capacity.</div>

      <div class="panel" style="padding:36px">
        <div id="reportFormWrap">
          <form id="reportForm">
            <h3 style="font-size:15px; color:var(--brass); margin-bottom:18px">Your details</h3>
            <div class="form-row">
              <div class="field">
                <label for="r-name">Name or alias</label>
                <input id="r-name" required>
              </div>
              <div class="field">
                <label for="r-contact">Contact information</label>
                <input id="r-contact" placeholder="Email or phone" required>
              </div>
            </div>
            <p class="hint" style="margin:-10px 0 22px">Your contact details are used only to follow up on this report and are never published. See our privacy note below.</p>

            <h3 style="font-size:15px; color:var(--brass); margin-bottom:18px">The observation</h3>
            <div class="form-row">
              <div class="field">
                <label for="r-date">Date of observation</label>
                <input id="r-date" type="date" required>
              </div>
              <div class="field">
                <label for="r-time">Approximate time</label>
                <input id="r-time" type="time">
              </div>
            </div>
            <div class="field">
              <label for="r-location">General location</label>
              <input id="r-location" placeholder="City / area \u2014 avoid sharing a precise home address" required>
              <span class="hint">Please give a general area rather than an exact address. We will ask for precise location only if an investigation proceeds, and it will not be published.</span>
            </div>
            <div class="field">
              <label for="r-type">Type of phenomenon</label>
              <select id="r-type" required>
                <option value="">Select\u2026</option>
                <option>Aerial light or object</option>
                <option>Unexplained sound</option>
                <option>Photographic or video anomaly</option>
                <option>Environmental anomaly</option>
                <option>Perceptual experience</option>
                <option>Other</option>
              </select>
            </div>
            <div class="field">
              <label for="r-desc">Detailed description</label>
              <textarea id="r-desc" placeholder="Describe exactly what you observed, as plainly as possible." required></textarea>
            </div>
            <div class="field">
              <label for="r-before">What happened before the event?</label>
              <textarea id="r-before"></textarea>
            </div>
            <div class="field">
              <label for="r-during">What happened during it?</label>
              <textarea id="r-during"></textarea>
            </div>
            <div class="field">
              <label for="r-after">What happened afterward?</label>
              <textarea id="r-after"></textarea>
            </div>
            <div class="form-row">
              <div class="field">
                <label for="r-witnesses">Number of witnesses</label>
                <input id="r-witnesses" type="number" min="1">
              </div>
              <div class="field">
                <label for="r-media">Photos / videos / audio available?</label>
                <select id="r-media">
                  <option>None</option>
                  <option>Photo(s)</option>
                  <option>Video</option>
                  <option>Audio</option>
                  <option>Multiple types</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label for="r-env">Environmental information</label>
              <textarea id="r-env" placeholder="Weather, lighting, nearby structures or terrain, anything unusual in the surroundings\u2026"></textarea>
            </div>
            <div class="field">
              <label for="r-other">Other relevant information</label>
              <textarea id="r-other"></textarea>
            </div>

            <div class="checkbox-row">
              <input type="checkbox" id="r-consent" required>
              <label for="r-consent">I understand that IUPRN will keep the original evidence I submit confidential and will not publish my personal contact information or precise home address. I understand that submitting this report does not guarantee an investigation.</label>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Submit Case</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function PageContact(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container" style="max-width:720px">
      <div class="eyebrow"><span class="dot"></span>Contact</div>
      <h1 style="font-size:38px; margin-bottom:22px">Get in touch</h1>
      <div style="display:flex; gap:40px; flex-wrap:wrap; margin-bottom:44px">
        <div>
          <div class="text-faint" style="font-size:12px; margin-bottom:6px">EMAIL (PLACEHOLDER)</div>
          <div style="font-size:15px">research@iuprn.example.org</div>
        </div>
        <div>
          <div class="text-faint" style="font-size:12px; margin-bottom:6px">SOCIAL (PLACEHOLDER)</div>
          <div style="font-size:15px">@iuprn.research</div>
        </div>
      </div>

      <div class="panel" style="padding:36px">
        <h2 style="font-size:20px; margin-bottom:20px">General inquiry</h2>
        <div id="contactFormWrap">
          <form id="contactForm">
            <div class="form-row">
              <div class="field">
                <label for="c-name">Name</label>
                <input id="c-name" required>
              </div>
              <div class="field">
                <label for="c-email">Email</label>
                <input id="c-email" type="email" required>
              </div>
            </div>
            <div class="field">
              <label for="c-subject">Subject</label>
              <input id="c-subject" required>
            </div>
            <div class="field">
              <label for="c-message">Message</label>
              <textarea id="c-message" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Send message</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;
}

function PageNotFound(){
  return `<div class="section container" style="text-align:center; padding-top:120px">
    <h1 style="font-size:32px; margin-bottom:14px">Page not found</h1>
    <p class="text-dim" style="margin-bottom:24px">The page you\u2019re looking for doesn\u2019t exist.</p>
    <a href="#home" class="btn btn-primary">Return home</a>
  </div>`;
}
