// ============ COMPONENTS ============

function LogoMark(size){
  size = size || 34;
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="32" cy="32" rx="27" ry="12" transform="rotate(-18 32 32)" stroke="#c9a24b" stroke-width="1.3" opacity="0.85"/>
    <ellipse cx="32" cy="32" rx="27" ry="12" transform="rotate(48 32 32)" stroke="#7fd8e8" stroke-width="1.1" opacity="0.55"/>
    <path d="M11 33c7-9 15-13 21-13s14 4 21 13c-7 9-15 13-21 13s-14-4-21-13z" stroke="#e8ecf1" stroke-width="1.2" opacity="0.9"/>
    <circle cx="32" cy="33" r="6.4" fill="#0a0e16" stroke="#e8ecf1" stroke-width="1.2"/>
    <circle cx="32" cy="33" r="2.4" fill="#c9a24b"/>
    <circle cx="12" cy="20" r="1.3" fill="#7fd8e8"/>
    <circle cx="53" cy="46" r="1.3" fill="#7fd8e8"/>
    <circle cx="55" cy="18" r="1" fill="#c9a24b"/>
  </svg>`;
}

function renderBrand(){
  document.getElementById('logoLink').innerHTML = `
    ${LogoMark(34)}
    <span>
      <span class="name">IUPRN</span>
      <span class="sub">Unexplained Phenomena Research Network</span>
    </span>`;
}

function renderNav(activeHash){
  const links = document.getElementById('navLinks');
  links.innerHTML = NAV_ITEMS.map(item => {
    const active = activeHash.startsWith(item.href) ? 'active' : '';
    return `<a href="${item.href}" class="${active}">${item.label}</a>`;
  }).join('');

  const mobile = document.getElementById('mobileMenu');
  mobile.innerHTML = NAV_ITEMS.concat([
    {href:'#report', label:'Report a Case'},
    {href:'#join', label:'Join IUPRN'},
    {href:'#contact', label:'Contact'},
  ]).map(item => `<a href="${item.href}">${item.label}</a>`).join('');
}

function renderFooter(){
  document.getElementById('footerGrid').innerHTML = `
    <div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">${LogoMark(28)}<span style="font-family:var(--serif);font-size:16px;color:#f2f4f7">IUPRN</span></div>
      <p style="max-width:280px">India's Unexplained Phenomena Research Network is an independent, evidence-driven research initiative. We neither believe nor disbelieve \u2014 we investigate.</p>
    </div>
    <div>
      <h4>Explore</h4>
      <a href="#investigations">Investigations</a>
      <a href="#database">Case Database</a>
      <a href="#research">Research</a>
      <a href="#methodology">Methodology</a>
    </div>
    <div>
      <h4>Participate</h4>
      <a href="#join">Join IUPRN</a>
      <a href="#report">Report a Case</a>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </div>
    <div>
      <h4>Contact</h4>
      <p>research@iuprn.example.org<br><span class="text-faint">(placeholder \u2014 not monitored)</span></p>
      <p>@iuprn.research <span class="text-faint">(placeholder handle)</span></p>
    </div>
  `;
}

function StatusBadge(status){
  const meta = STATUS_META[status] || STATUS_META['Inconclusive'];
  return `<span class="badge ${meta.badge}"><span class="dot"></span>${status}</span>`;
}

function EvidenceTags(list){
  return `<div style="display:flex;flex-wrap:wrap;gap:8px">${list.map(e=>`<span style="font-size:12px;color:var(--text-dim);border:1px solid var(--line);padding:4px 10px;border-radius:2px">${e}</span>`).join('')}</div>`;
}

function CaseCard(c, opts){
  opts = opts || {};
  return `
  <a href="#case/${c.id}" class="panel" style="display:block; padding:24px; transition:border-color .2s" onmouseover="this.style.borderColor='var(--cyan-soft)'" onmouseout="this.style.borderColor='var(--line)'">
    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px; margin-bottom:14px; flex-wrap:wrap">
      <span class="mono text-faint" style="font-size:12px">${c.id}${c.demo?' \u00b7 demo case':''}</span>
      ${StatusBadge(c.status)}
    </div>
    <h3 style="font-size:${opts.large? '26px':'19px'}; margin-bottom:10px; line-height:1.25">${c.title}</h3>
    <p class="text-dim" style="font-size:14px; margin-bottom:16px">${c.claim.slice(0,140)}${c.claim.length>140?'\u2026':''}</p>
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px">
      <span class="text-faint" style="font-size:12.5px">${c.region} \u00b7 ${c.date}</span>
      ${EvidenceTags(c.evidence)}
    </div>
  </a>`;
}

function ProcessSteps(){
  return `<div style="display:flex; flex-direction:column">
    ${PROCESS_STEPS.map((s,i)=>`
      <div style="display:grid; grid-template-columns:64px 1fr; gap:24px; padding:22px 0; border-top:1px solid var(--line-soft)">
        <div class="mono" style="color:var(--brass); font-size:15px; padding-top:2px">${s.n}</div>
        <div>
          <h3 style="font-size:19px; margin-bottom:6px">${s.title}</h3>
          <p class="text-dim" style="font-size:14.5px; max-width:520px">${s.desc}</p>
        </div>
      </div>
    `).join('')}
    <div style="border-top:1px solid var(--line-soft)"></div>
  </div>`;
}

function ResearchAreaCards(){
  const icons = {
    astronomy:'M12 2l1.7 4.8 5.1.3-4 3.3 1.4 5-4.2-3-4.2 3 1.4-5-4-3.3 5.1-.3z',
    physics:'M4 12h16M12 4v16M6.5 6.5l11 11M17.5 6.5l-11 11',
    psychology:'M12 3c-3 0-5 2-5 5 0 2 1 3 1 4v2h8v-2c0-1 1-2 1-4 0-3-2-5-5-5z M9 17h6 M10 20h4',
    earth:'M3 12h18 M3 8c3 2 15 2 18 0 M3 16c3-2 15-2 18 0',
    technology:'M4 5h16v11H4z M9 20h6 M12 16v4',
    data:'M4 20V10 M10 20V4 M16 20v14 M4 20h16',
  };
  return `<div class="grid-3 gap-1" style="background:var(--line); border:1px solid var(--line)">
    ${RESEARCH_AREAS.map(a=>`
      <div class="panel" style="border:none; border-radius:0; padding:30px 26px">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.3" style="margin-bottom:16px"><path d="${icons[a.key]}"/></svg>
        <h3 style="font-size:17px; margin-bottom:8px">${a.name}</h3>
        <p class="text-dim" style="font-size:13.5px">${a.desc}</p>
      </div>
    `).join('')}
  </div>`;
}

function Timeline(items){
  return `<div style="display:flex; flex-direction:column; position:relative; padding-left:24px; border-left:1px solid var(--line)">
    ${items.map(t=>`
      <div style="position:relative; padding:0 0 26px 22px;">
        <span style="position:absolute; left:-29px; top:2px; width:9px; height:9px; border-radius:50%; background:var(--bg); border:2px solid var(--cyan)"></span>
        <div class="mono text-faint" style="font-size:12px; margin-bottom:3px">${t.date}</div>
        <div style="font-size:14.5px">${t.label}</div>
      </div>
    `).join('')}
  </div>`;
}

function HypothesisRow(h){
  const colors = { supported:'var(--green)', weakened:'var(--text-faint)', inconclusive:'var(--olive)', pending:'var(--cyan)' };
  const labels = { supported:'Supported by evidence', weakened:'Weakened by evidence', inconclusive:'Inconclusive', pending:'Assessment pending' };
  const c = colors[h.outcome] || 'var(--text-dim)';
  return `
  <div style="padding:18px 0; border-top:1px solid var(--line-soft); display:grid; grid-template-columns:110px 1fr; gap:18px" class="hyp-row">
    <div>
      <div class="mono" style="color:var(--brass); font-size:13px">${h.id}</div>
      <div style="font-size:14.5px; margin-top:2px">${h.name}</div>
    </div>
    <div>
      <div style="font-size:12.5px; font-weight:600; color:${c}; margin-bottom:6px">${labels[h.outcome]||h.outcome}</div>
      <p class="text-dim" style="font-size:14px">${h.note}</p>
    </div>
  </div>`;
}

function PublicationCard(p){
  return `
  <div class="panel" style="padding:26px">
    <div style="display:flex; justify-content:space-between; gap:12px; flex-wrap:wrap; margin-bottom:12px">
      <span class="eyebrow" style="margin:0"><span class="dot"></span>${p.category}</span>
      <span style="font-size:11.5px; padding:4px 10px; border-radius:2px; border:1px solid ${p.peerReviewed?'rgba(139,191,147,0.4)':'var(--line)'}; color:${p.peerReviewed?'var(--green)':'var(--text-faint)'}">${p.status}</span>
    </div>
    <h3 style="font-size:18px; margin-bottom:8px; line-height:1.3">${p.title}</h3>
    <p class="text-faint" style="font-size:13px; margin-bottom:12px">${p.authors} \u00b7 ${p.date}</p>
    <p class="text-dim" style="font-size:14px; margin-bottom:18px">${p.abstract}</p>
    <button class="btn btn-ghost btn-sm" onclick="alert('This is placeholder V1 content. The downloadable report will be available once IUPRN publishes real research.')">Download report (placeholder)</button>
  </div>`;
}

// ---------------- Starfield background ----------------
function initStarfield(){
  const canvas = document.getElementById('stars');
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(180, Math.floor((w*h)/9000));
    stars = Array.from({length: count}, () => ({
      x: Math.random()*w, y: Math.random()*h,
      r: Math.random()*1.2 + 0.2,
      tw: Math.random()*Math.PI*2,
      speed: Math.random()*0.015 + 0.004,
    }));
  }
  function draw(){
    ctx.clearRect(0,0,w,h);
    for(const s of stars){
      s.tw += s.speed;
      const alpha = 0.35 + Math.sin(s.tw)*0.35;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
      ctx.fillStyle = `rgba(200,215,230,${Math.max(0.08,alpha)})`;
      ctx.fill();
    }
    if(!reduced) requestAnimationFrame(draw);
  }
  window.addEventListener('resize', resize);
  resize();
  draw();
}
