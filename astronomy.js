// ============ ASTRONOMY MVP (Phase 2) ============
// Self-contained feature module: API access is isolated at the top of this
// file; everything below "UI" only ever talks to astroState / the functions
// here, never to fetch() directly. This keeps the feature easy to swap to a
// different provider or split into its own page later.

// ---------------- CONFIG ----------------
const ASTRO_CONFIG = {
  API_BASE: 'https://api.nasa.gov/planetary/apod',
  // DEMO_KEY is NASA's shared public key: it works with no signup but is
  // rate-limited (~30 requests/hour, 50/day) because everyone using this
  // demo shares it. Get a free personal key in seconds at
  // https://api.nasa.gov and paste it here to raise those limits.
  //
  // This key is NOT a secret the way a billing-linked API key would be —
  // NASA's APOD API is explicitly designed to be called straight from a
  // browser or mobile app, so calling it directly from this frontend is
  // appropriate for the MVP. If a future provider requires a true secret
  // key (e.g. one tied to a paid account), do NOT put it here — call it
  // through a small Vercel serverless function that reads the key from an
  // environment variable instead, and never commit that key to GitHub.
  API_KEY: 'v6DMAVOEJ7oZp67lkjcdfm00JWUCmhrX0Xrm9iWd',
  PAGE_SIZE: 9,
};

// ---------------- API MODULE ----------------
function astroFormatDate(d){
  return d.toISOString().slice(0, 10);
}

function astroDateMinusDays(dateStr, days){
  const d = new Date(dateStr + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() - days);
  return astroFormatDate(d);
}

function astroSourceUrlFor(dateStr){
  // Builds the canonical APOD page URL, e.g. 2026-01-05 -> ap260105.html
  const compact = dateStr.slice(2).replace(/-/g, '');
  return `https://apod.nasa.gov/apod/ap${compact}.html`;
}

function normalizeApodItem(raw){
  return {
    title: raw.title || 'Untitled observation',
    date: raw.date,
    explanation: raw.explanation || 'No description was provided by the source for this entry.',
    mediaType: raw.media_type || 'image',
    // For videos, APOD provides a thumbnail (when thumbs=true is requested)
    // instead of a still image — we never fabricate an image for these.
    imageUrl: raw.media_type === 'video' ? (raw.thumbnail_url || null) : (raw.url || null),
    hdUrl: raw.hdurl || raw.url || null,
    copyright: raw.copyright ? String(raw.copyright).trim() : null,
    sourceUrl: astroSourceUrlFor(raw.date),
  };
}

// Fetches a chronological window of `count` days ending on `endDateStr`,
// newest first. Throws on any network or API error so the caller can show
// a proper error state rather than a silently broken page.
async function fetchApodRange(endDateStr, count){
  const startDateStr = astroDateMinusDays(endDateStr, count - 1);
  const url = `${ASTRO_CONFIG.API_BASE}?api_key=${encodeURIComponent(ASTRO_CONFIG.API_KEY)}&start_date=${startDateStr}&end_date=${endDateStr}&thumbs=true`;
  const res = await fetch(url);
  if(!res.ok){
    throw new Error(`APOD request failed (HTTP ${res.status})`);
  }
  const data = await res.json();
  const arr = Array.isArray(data) ? data : [data];
  arr.sort((a, b) => (a.date < b.date ? 1 : -1));
  return arr.map(normalizeApodItem);
}

// ---------------- LOCAL FALLBACK (metadata only — no external images) ----------------
const ASTRO_FALLBACK = [
  { category:'Galaxy', title:'The Andromeda Galaxy (M31)', explanation:'Andromeda is the nearest large spiral galaxy to the Milky Way and is visible to the naked eye from dark-sky locations.' },
  { category:'Nebula', title:'The Crab Nebula', explanation:'The Crab Nebula is the expanding remnant of a massive star observed to explode as a supernova in 1054 AD.' },
  { category:'Planetary science', title:'Saturn\u2019s Rings', explanation:'Saturn\u2019s rings are made up of countless particles of ice and rock, ranging in size from dust grains to boulders.' },
  { category:'Nebula', title:'The Orion Nebula', explanation:'The Orion Nebula is one of the brightest nebulae visible to the naked eye and a nearby region of active star formation.' },
  { category:'Stellar remnant', title:'Neutron Stars', explanation:'A neutron star is the extremely dense, collapsed core left behind after a massive star explodes as a supernova.' },
  { category:'Planetary science', title:'Jupiter', explanation:'Jupiter is the largest planet in the Solar System, known for its Great Red Spot \u2014 a giant, long-lived storm.' },
];

// ---------------- UI ----------------
let astroState = { items: [], earliestDate: null, loading: false, usingFallback: false };

function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function astroTruncate(str, n){
  return str.length > n ? str.slice(0, n).trim() + '\u2026' : str;
}

function PageAstronomy(){
  return `
  <section class="section" style="padding-top:64px">
    <div class="container">
      <div class="eyebrow"><span class="dot"></span>Astronomy</div>
      <h1 style="font-size:38px; max-width:680px; margin-bottom:16px">Explore real observations and imagery from scientific space missions and observatories.</h1>
      <p class="lede" style="margin-bottom:8px; max-width:640px">Images and metadata below are retrieved live from NASA\u2019s Astronomy Picture of the Day archive \u2014 a public, official source. Only fields actually returned by the archive are shown.</p>
      <div style="margin:26px 0 36px">
        <button class="btn btn-primary" onclick="document.getElementById('astroGrid').scrollIntoView({behavior:'smooth'})">Explore the Universe</button>
      </div>

      <div id="astroStatus"></div>
      <div id="astroGrid" class="astro-grid"></div>
      <div id="astroLoadMoreWrap" style="text-align:center; margin-top:36px"></div>
    </div>
  </section>
  <div id="astroModalRoot"></div>`;
}

function initAstronomyPage(){
  astroState = { items: [], earliestDate: astroFormatDate(new Date()), loading: false, usingFallback: false };
  astroLoadNext(true);
}

function astroSetStatus(html){
  const el = document.getElementById('astroStatus');
  if(el) el.innerHTML = html;
}

function astroRenderSkeletons(n){
  const gridEl = document.getElementById('astroGrid');
  if(!gridEl) return;
  gridEl.innerHTML = Array.from({length: n}).map(() => `
    <div class="panel astro-card" style="cursor:default">
      <div class="astro-skel"></div>
      <div style="padding:18px">
        <div class="astro-skel-line" style="width:70%"></div>
        <div class="astro-skel-line" style="width:40%; margin-top:10px"></div>
      </div>
    </div>`).join('');
}

async function astroLoadNext(isFirst){
  if(astroState.loading) return;
  astroState.loading = true;

  if(isFirst){
    astroSetStatus('');
    astroRenderSkeletons(ASTRO_CONFIG.PAGE_SIZE);
  } else {
    const btn = document.getElementById('astroLoadMoreBtn');
    if(btn){ btn.disabled = true; btn.textContent = 'Loading\u2026'; }
  }

  try{
    const endDate = isFirst ? astroFormatDate(new Date()) : astroDateMinusDays(astroState.earliestDate, 1);
    const items = await fetchApodRange(endDate, ASTRO_CONFIG.PAGE_SIZE);
    astroState.items = astroState.items.concat(items);
    astroState.earliestDate = items.length ? items[items.length - 1].date : astroState.earliestDate;
    astroState.usingFallback = false;
    astroRenderGrid();
  }catch(err){
    console.error('Astronomy fetch failed:', err);
    if(isFirst){
      astroState.usingFallback = true;
      astroRenderError();
      astroRenderFallback();
    } else {
      astroSetStatus(`<div class="notice" style="margin-bottom:20px">Could not load more observations right now. <button class="btn btn-ghost btn-sm" onclick="astroLoadNext(false)">Try Again</button></div>`);
    }
  }

  astroState.loading = false;
  if(!isFirst){
    const btn = document.getElementById('astroLoadMoreBtn');
    if(btn){ btn.disabled = false; btn.textContent = 'Load More'; }
  }
  astroRenderLoadMore();
}

function astroRetry(){
  initAstronomyPage();
}

function astroRenderError(){
  astroSetStatus(`
    <div class="notice" style="margin-bottom:28px">
      <strong style="color:var(--brass); display:block; margin-bottom:6px">Astronomical data is temporarily unavailable.</strong>
      <span class="text-dim">Showing a small local reference set below instead.</span><br>
      <button class="btn btn-ghost btn-sm" style="margin-top:14px" onclick="astroRetry()">Try Again</button>
    </div>`);
}

function astroRenderFallback(){
  const gridEl = document.getElementById('astroGrid');
  if(!gridEl) return;
  gridEl.innerHTML = ASTRO_FALLBACK.map(f => `
    <div class="panel astro-card" style="cursor:default">
      <div class="astro-card-noimg">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3v18"/></svg>
      </div>
      <div style="padding:18px">
        <p class="text-faint" style="font-size:11px; margin-bottom:6px; letter-spacing:0.02em">${f.category.toUpperCase()} \u00b7 LOCAL REFERENCE</p>
        <h3 style="font-size:16px; margin-bottom:8px; line-height:1.3">${escapeHtml(f.title)}</h3>
        <p class="text-dim" style="font-size:13.5px">${escapeHtml(f.explanation)}</p>
      </div>
    </div>`).join('');
}

function astroRenderGrid(){
  const gridEl = document.getElementById('astroGrid');
  if(!gridEl) return;
  gridEl.innerHTML = astroState.items.map((item, idx) => `
    <div class="panel astro-card" onclick="astroOpenModal(${idx})" role="button" tabindex="0" onkeydown="if(event.key==='Enter')astroOpenModal(${idx})">
      ${item.imageUrl
        ? `<img class="astro-card-img" src="${item.imageUrl}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.parentElement.querySelector('.astro-card-img').outerHTML='<div class=\\'astro-card-noimg\\'>Image unavailable</div>'">`
        : `<div class="astro-card-noimg">${item.mediaType === 'video' ? 'Video \u2014 no preview image' : 'Image unavailable'}</div>`}
      <div style="padding:18px">
        <p class="text-faint" style="font-size:11.5px; margin-bottom:6px">${item.date}${item.mediaType === 'video' ? ' \u00b7 Video' : ''}</p>
        <h3 style="font-size:16px; margin-bottom:8px; line-height:1.3">${escapeHtml(item.title)}</h3>
        <p class="text-dim" style="font-size:13px; margin-bottom:14px">${escapeHtml(astroTruncate(item.explanation, 100))}</p>
        <span class="btn btn-ghost btn-sm">View Observation</span>
      </div>
    </div>`).join('');
}

function astroRenderLoadMore(){
  const wrap = document.getElementById('astroLoadMoreWrap');
  if(!wrap) return;
  wrap.innerHTML = astroState.usingFallback ? '' : `<button id="astroLoadMoreBtn" class="btn btn-ghost" onclick="astroLoadNext(false)">Load More</button>`;
}

function astroOpenModal(idx){
  const item = astroState.items[idx];
  if(!item) return;
  const root = document.getElementById('astroModalRoot');
  root.innerHTML = `
    <div class="astro-modal-backdrop" onclick="if(event.target===this) astroCloseModal()">
      <div class="astro-modal panel" role="dialog" aria-modal="true" aria-label="${escapeHtml(item.title)}">
        <button class="astro-modal-close" onclick="astroCloseModal()" aria-label="Close">\u2715</button>
        ${item.imageUrl
          ? `<img class="astro-modal-img" src="${item.hdUrl || item.imageUrl}" alt="${escapeHtml(item.title)}">`
          : `<div class="astro-card-noimg" style="height:180px">${item.mediaType === 'video' ? 'Video content \u2014 view on the original source below.' : 'Image unavailable.'}</div>`}
        <div style="padding:28px">
          <h2 style="font-size:22px; margin-bottom:14px">${escapeHtml(item.title)}</h2>
          <p class="text-dim" style="font-size:14.5px; margin-bottom:22px">${escapeHtml(item.explanation)}</p>
          <div class="astro-meta-grid">
            <div><span class="text-faint">Source / Archive</span><div>NASA APOD</div></div>
            <div><span class="text-faint">Observation date</span><div>${item.date}</div></div>
            <div><span class="text-faint">Media type</span><div style="text-transform:capitalize">${item.mediaType}</div></div>
            <div><span class="text-faint">Attribution</span><div>${item.copyright ? escapeHtml(item.copyright) : 'Public domain / Courtesy NASA'}</div></div>
          </div>
          <div style="margin-top:24px; display:flex; gap:12px; flex-wrap:wrap">
            <a href="${item.sourceUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">View Original Source</a>
            <button class="btn btn-ghost btn-sm" onclick="astroCloseModal()">Close</button>
          </div>
        </div>
      </div>
    </div>`;
  document.addEventListener('keydown', astroEscHandler);
}

function astroCloseModal(){
  const root = document.getElementById('astroModalRoot');
  if(root) root.innerHTML = '';
  document.removeEventListener('keydown', astroEscHandler);
}
function astroEscHandler(e){
  if(e.key === 'Escape') astroCloseModal();
}
