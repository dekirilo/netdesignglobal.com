'use strict';

const fs   = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT    = __dirname;
const CONTENT = path.join(ROOT, 'content');
const PUBLIC  = path.join(ROOT, 'public');

function load(file) {
  return yaml.load(fs.readFileSync(path.join(CONTENT, file), 'utf8'));
}

function esc(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const ICONS = {
  monitor:  `<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="1"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  database: `<svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>`,
  lock:     `<svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  cloud:    `<svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>`,
  chart:    `<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  radio:    `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 4.93a10 10 0 0 0 0 14.14"/></svg>`,
  sun:      `<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
  file:     `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
};

function buildNav(S) {
  return `
<nav id="ndg-nav" role="navigation">
  <a href="#hero" class="nav-logo">
    <div class="logo-mark" aria-hidden="true"></div>
    <span class="logo-text">Net<span>Design</span>Global</span>
  </a>
  <button class="nav-mobile-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="nav-menu">
    <span></span><span></span><span></span>
  </button>
  <ul class="nav-links" id="nav-menu" role="list">
    <li><a href="#services">Services</a></li>
    <li><a href="#why">About</a></li>
    <li><a href="#industries">Industries</a></li>
    <li><a href="#process">Process</a></li>
    <li><a href="#cta" class="nav-cta">Get a Quote</a></li>
  </ul>
</nav>`;
}

function buildHero(H) {
  const diagram = `<div class="hero-stats" aria-label="Spine-leaf network topology diagram">
<svg width="100%" viewBox="0 0 320 338" role="img" xmlns="http://www.w3.org/2000/svg">
<title>Spine-leaf network topology</title>
<defs><style>
@keyframes ndg-flow{to{stroke-dashoffset:-24}}
@keyframes ndg-glow{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes ndg-blink{0%,100%{fill-opacity:.3}50%{fill-opacity:1}}
.nfl{stroke-dasharray:4 8;animation:ndg-flow var(--d,1.4s) linear infinite;fill:none}
.ngs{animation:ndg-glow var(--d,3s) ease-in-out infinite}
.nbk{animation:ndg-blink var(--d,2s) ease-in-out infinite}
</style></defs>
<rect x="0" y="30" width="320" height="88" fill="rgba(5,99,255,0.03)"/>
<rect x="0" y="142" width="320" height="78" fill="rgba(0,180,255,0.02)"/>
<rect x="0" y="248" width="320" height="78" fill="rgba(0,100,160,0.025)"/>
<line x1="60" y1="132" x2="312" y2="132" stroke="rgba(0,180,255,0.08)" stroke-width="0.8" stroke-dasharray="4 6"/>
<line x1="60" y1="238" x2="312" y2="238" stroke="rgba(0,180,255,0.07)" stroke-width="0.8" stroke-dasharray="4 6"/>
<text x="8" y="68" font-family="JetBrains Mono,monospace" font-size="7.5" fill="rgba(85,136,255,0.7)" letter-spacing="2.5">SPINE</text>
<text x="8" y="182" font-family="JetBrains Mono,monospace" font-size="7.5" fill="rgba(0,212,255,0.6)" letter-spacing="2.5">LEAF</text>
<text x="8" y="292" font-family="JetBrains Mono,monospace" font-size="7.5" fill="rgba(0,150,200,0.55)" letter-spacing="2">SERVER</text>
<line x1="115" y1="72" x2="205" y2="72" stroke="rgba(5,99,255,0.4)" stroke-width="1.5" fill="none"/>
<path d="M115 72 L205 72" class="nfl" stroke="#0563ff" stroke-width="1.5" style="--d:0.7s"/>
<g stroke="rgba(0,180,255,0.13)" stroke-width="0.8" fill="none">
<line x1="97" y1="85" x2="75" y2="157"/><line x1="97" y1="85" x2="138" y2="157"/>
<line x1="97" y1="85" x2="200" y2="157"/><line x1="97" y1="85" x2="253" y2="157"/>
<line x1="223" y1="85" x2="75" y2="157"/><line x1="223" y1="85" x2="138" y2="157"/>
<line x1="223" y1="85" x2="200" y2="157"/><line x1="223" y1="85" x2="253" y2="157"/>
</g>
<path d="M97 85 L75 157" class="nfl" stroke="rgba(0,212,255,0.7)" stroke-width="1.1" style="--d:1.25s"/>
<path d="M97 85 L138 157" class="nfl" stroke="rgba(0,212,255,0.7)" stroke-width="1.1" style="--d:1.75s"/>
<path d="M97 85 L200 157" class="nfl" stroke="rgba(0,212,255,0.4)" stroke-width="0.9" style="--d:2.15s"/>
<path d="M97 85 L253 157" class="nfl" stroke="rgba(0,212,255,0.28)" stroke-width="0.7" style="--d:2.6s"/>
<path d="M223 85 L75 157" class="nfl" stroke="rgba(85,136,255,0.35)" stroke-width="0.7" style="--d:2.0s"/>
<path d="M223 85 L138 157" class="nfl" stroke="rgba(85,136,255,0.5)" stroke-width="0.9" style="--d:1.55s"/>
<path d="M223 85 L200 157" class="nfl" stroke="rgba(85,136,255,0.7)" stroke-width="1.1" style="--d:1.1s"/>
<path d="M223 85 L253 157" class="nfl" stroke="rgba(85,136,255,0.7)" stroke-width="1.1" style="--d:1.65s"/>
<g stroke="rgba(0,120,190,0.2)" stroke-width="0.6" fill="none">
<line x1="75" y1="171" x2="62" y2="256"/><line x1="75" y1="171" x2="88" y2="256"/>
<line x1="138" y1="171" x2="124" y2="256"/><line x1="138" y1="171" x2="152" y2="256"/>
<line x1="200" y1="171" x2="186" y2="256"/><line x1="200" y1="171" x2="214" y2="256"/>
<line x1="253" y1="171" x2="240" y2="256"/><line x1="253" y1="171" x2="266" y2="256"/>
</g>
<path d="M75 171 L62 256" class="nfl" stroke="rgba(0,180,255,0.5)" stroke-width="0.8" style="--d:0.85s"/>
<path d="M138 171 L152 256" class="nfl" stroke="rgba(0,180,255,0.5)" stroke-width="0.8" style="--d:1.05s"/>
<path d="M200 171 L186 256" class="nfl" stroke="rgba(0,180,255,0.5)" stroke-width="0.8" style="--d:1.25s"/>
<path d="M253 171 L266 256" class="nfl" stroke="rgba(0,180,255,0.5)" stroke-width="0.8" style="--d:0.95s"/>
<g class="ngs" style="--d:3.2s">
<rect x="52" y="57" width="90" height="30" rx="4" fill="rgba(3,10,36,0.97)" stroke="#0563ff" stroke-width="1.3"/>
<text x="97" y="72" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="9" fill="#5588ff" font-weight="500" letter-spacing="1">SPINE-1</text>
<circle cx="135" cy="65" r="3" fill="#00d4ff" class="nbk" style="--d:2.1s"/>
</g>
<g class="ngs" style="--d:2.8s">
<rect x="178" y="57" width="90" height="30" rx="4" fill="rgba(3,10,36,0.97)" stroke="#0563ff" stroke-width="1.3"/>
<text x="223" y="72" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="9" fill="#5588ff" font-weight="500" letter-spacing="1">SPINE-2</text>
<circle cx="261" cy="65" r="3" fill="#00d4ff" class="nbk" style="--d:1.7s"/>
</g>
<rect x="44" y="157" width="62" height="26" rx="3" fill="rgba(0,12,38,0.97)" stroke="rgba(0,212,255,0.62)" stroke-width="1"/>
<text x="75" y="170" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#00d4ff" letter-spacing="0.8">LEAF-1</text>
<rect x="107" y="157" width="62" height="26" rx="3" fill="rgba(0,12,38,0.97)" stroke="rgba(0,212,255,0.62)" stroke-width="1"/>
<text x="138" y="170" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#00d4ff" letter-spacing="0.8">LEAF-2</text>
<rect x="169" y="157" width="62" height="26" rx="3" fill="rgba(0,12,38,0.97)" stroke="rgba(0,212,255,0.62)" stroke-width="1"/>
<text x="200" y="170" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#00d4ff" letter-spacing="0.8">LEAF-3</text>
<rect x="222" y="157" width="62" height="26" rx="3" fill="rgba(0,12,38,0.97)" stroke="rgba(0,212,255,0.62)" stroke-width="1"/>
<text x="253" y="170" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="8.5" fill="#00d4ff" letter-spacing="0.8">LEAF-4</text>
<circle cx="62" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="62" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="62" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:3.1s"/>
<circle cx="88" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="88" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="88" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:2.3s"/>
<circle cx="124" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="124" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="124" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:1.9s"/>
<circle cx="152" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="152" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="152" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:2.7s"/>
<circle cx="186" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="186" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="186" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:1.5s"/>
<circle cx="214" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="214" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="214" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:3.4s"/>
<circle cx="240" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="240" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="240" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:2.5s"/>
<circle cx="266" cy="272" r="11" fill="rgba(3,8,22,0.97)" stroke="rgba(0,180,255,0.4)" stroke-width="1"/>
<text x="266" y="270" text-anchor="middle" dominant-baseline="central" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,190,255,0.75)">SRV</text>
<circle cx="266" cy="279" r="2" fill="rgba(0,180,255,0.55)" class="nbk" style="--d:1.2s"/>
<text x="160" y="310" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="7" fill="rgba(0,180,255,0.25)" letter-spacing="2">SPINE-LEAF FABRIC</text>
<text x="160" y="324" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="rgba(0,180,255,0.18)" letter-spacing="1.5">40GbE &#183; ZERO SPoF</text>
</svg></div>`;

  return `
<section id="hero" aria-label="Hero">
  <canvas id="canvas" aria-hidden="true"></canvas>
  <div class="hero-inner">
    <span class="hero-eyebrow">${esc(H.eyebrow)}</span>
    <h1>
      <span class="block">${esc(H.headline_line1)}</span>
      <span class="accent">${esc(H.headline_accent)}</span>
      <span class="block">${esc(H.headline_line3)}</span>
    </h1>
    <p class="hero-sub">${esc(H.subheadline)}</p>
    <div class="hero-actions">
      <a href="#cta" class="btn-primary nav-cta" style="background:var(--blue);color:#fff;border:none">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        ${esc(H.cta_primary_label)}
      </a>
      <a href="#services" class="btn-outline">${esc(H.cta_secondary_label)}</a>
    </div>
  </div>
  ${diagram}
</section>`;
}

function buildServices(SV) {
  const cards = (SV.items || []).map(svc => {
    const icon = ICONS[svc.icon] || ICONS.monitor;
    const tags = (svc.tags || '').split(',').map(t => t.trim()).filter(Boolean);
    return `
    <div class="service-card">
      <div class="service-icon" aria-hidden="true">${icon}</div>
      <h3>${esc(svc.title)}</h3>
      <p>${esc(svc.description)}</p>
      ${tags.length ? `<div class="service-tags">${tags.map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>` : ''}
    </div>`;
  }).join('');

  return `
<section id="services" aria-labelledby="services-heading">
  <div class="section-inner">
    <span class="section-tag reveal">Our Solutions</span>
    <h2 id="services-heading" class="reveal">${esc(SV.heading)}</h2>
    <p class="section-desc reveal">${esc(SV.description)}</p>
    <div class="services-grid reveal">${cards}</div>
  </div>
</section>`;
}

function buildWhy(W) {
  const feats = (W.features || []).map(f => `
    <div class="why-feat">
      <div class="why-feat-icon" aria-hidden="true">${esc(f.number)}</div>
      <h4>${esc(f.title)}</h4>
      <p>${esc(f.description)}</p>
    </div>`).join('');

  return `
<section id="why" aria-labelledby="why-heading">
  <div class="section-inner">
    <div class="why-grid">
      <div>
        <span class="section-tag reveal">Why NetDesignGlobal</span>
        <h2 id="why-heading" class="reveal">${esc(W.heading_line1)}<br><span>${esc(W.heading_line2)}</span></h2>
        <p class="section-desc reveal">${esc(W.description)}</p>
        <div class="why-features reveal">${feats}</div>
      </div>
      <div class="why-visual reveal" aria-hidden="true">
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" class="arch-diagram">
          <defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(0,180,255,0.07)" stroke-width="1"/>
          <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(0,180,255,0.10)" stroke-width="1"/>
          <circle cx="200" cy="200" r="60"  fill="none" stroke="rgba(0,180,255,0.15)" stroke-width="1"/>
          <line x1="200" y1="172" x2="200" y2="104" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <line x1="200" y1="228" x2="200" y2="296" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <line x1="175" y1="185" x2="118" y2="150" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <line x1="225" y1="185" x2="282" y2="150" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <line x1="175" y1="215" x2="118" y2="250" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <line x1="225" y1="215" x2="282" y2="250" stroke="rgba(0,212,255,0.3)" stroke-width="1"/>
          <circle cx="200" cy="200" r="28" fill="rgba(5,99,255,0.15)" stroke="#0563ff" stroke-width="1.5" filter="url(#glow)"/>
          <text x="200" y="196" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="7" fill="#00d4ff" letter-spacing="1">CORE</text>
          <text x="200" y="207" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="7" fill="#00d4ff" letter-spacing="1">NETWORK</text>
          <circle cx="200" cy="90"  r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(0,212,255,0.5)" stroke-width="1.2"/>
          <text x="200" y="87"  text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#00d4ff">CLOUD</text>
          <text x="200" y="97"  text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">LAYER</text>
          <circle cx="200" cy="310" r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(0,212,255,0.5)" stroke-width="1.2"/>
          <text x="200" y="307" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#00d4ff">DATA</text>
          <text x="200" y="317" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">CENTER</text>
          <circle cx="106" cy="138" r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(0,212,255,0.5)" stroke-width="1.2"/>
          <text x="106" y="135" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#00d4ff">CAMPUS</text>
          <text x="106" y="145" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">NET</text>
          <circle cx="294" cy="138" r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(5,99,255,0.6)" stroke-width="1.2"/>
          <text x="294" y="135" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#0563ff">ZERO</text>
          <text x="294" y="145" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">TRUST</text>
          <circle cx="106" cy="262" r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(0,212,255,0.5)" stroke-width="1.2"/>
          <text x="106" y="259" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#00d4ff">SD-WAN</text>
          <text x="106" y="269" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">BRANCH</text>
          <circle cx="294" cy="262" r="22" fill="rgba(0,30,70,0.9)" stroke="rgba(5,99,255,0.6)" stroke-width="1.2"/>
          <text x="294" y="259" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#0563ff">NGFW</text>
          <text x="294" y="269" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="6.5" fill="#5e7a9a">SECURITY</text>
          <path d="M222 70 A140 140 0 0 1 316 116" fill="none" stroke="rgba(0,212,255,0.15)" stroke-width="1" stroke-dasharray="4 4"/>
          <path d="M316 284 A140 140 0 0 1 222 330" fill="none" stroke="rgba(0,212,255,0.15)" stroke-width="1" stroke-dasharray="4 4"/>
          <path d="M84 284 A140 140 0 0 1 84 116"  fill="none" stroke="rgba(0,212,255,0.15)" stroke-width="1" stroke-dasharray="4 4"/>
        </svg>
      </div>
    </div>
  </div>
</section>`;
}

function buildIndustries(IN) {
  const blocks = (IN.items || []).map(ind => `
    <div class="industry-block">
      <span class="industry-icon" aria-hidden="true">${esc(ind.code)}</span>
      <h4>${esc(ind.name)}</h4>
      <p>${esc(ind.description)}</p>
    </div>`).join('');

  return `
<section id="industries" aria-labelledby="industries-heading">
  <div class="section-inner">
    <span class="section-tag reveal">Verticals</span>
    <h2 id="industries-heading" class="reveal">${esc(IN.heading)}</h2>
    <p class="section-desc reveal">${esc(IN.description)}</p>
    <div class="industries-row reveal">${blocks}</div>
  </div>
</section>`;
}

function buildProcess(PR) {
  const steps = (PR.steps || []).map(s => `
    <div class="process-step">
      <div class="step-num" aria-hidden="true">${esc(s.number)}</div>
      <h4>${esc(s.title)}</h4>
      <p>${esc(s.description)}</p>
    </div>`).join('');

  return `
<section id="process" aria-labelledby="process-heading">
  <div class="section-inner">
    <span class="section-tag reveal">How We Work</span>
    <h2 id="process-heading" class="reveal">${esc(PR.heading)}</h2>
    <p class="section-desc reveal">${esc(PR.description)}</p>
    <div class="process-track reveal">${steps}</div>
  </div>
</section>`;
}

function buildTech(T) {
  const badges = (T.technologies || []).map(t => `<div class="tech-badge">${esc(t)}</div>`).join('');
  const certs  = (T.certifications || []).map(c => `<span class="tag">${esc(c)}</span>`).join('');

  return `
<section id="tech" aria-labelledby="tech-heading">
  <div class="section-inner">
    <span class="section-tag reveal">Technology Stack</span>
    <h2 id="tech-heading" class="reveal">${esc(T.heading)}</h2>
    <p class="section-desc reveal">${esc(T.description)}</p>
    <div class="tech-row reveal">${badges}</div>
    <div class="cert-row reveal">
      <p class="cert-label">Our engineers hold certifications including:</p>
      <div class="cert-tags">${certs}</div>
    </div>
  </div>
</section>`;
}

function buildCTA(C, S) {
  const phone    = String(S.contact_phone || '');
  const phoneRaw = phone.replace(/[^+\d]/g, '');
  const formId   = C.formspree_id || 'YOUR_FORMSPREE_ID';
  const options  = (C.services_list || []).map(s => `<option>${esc(s)}</option>`).join('');

  return `
<section id="cta" aria-labelledby="cta-heading">
  <div class="cta-inner">
    <span class="section-tag" style="justify-content:center;">Ready to Start?</span>
    <h2 id="cta-heading" class="reveal">${esc(C.heading)}</h2>
    <p class="reveal">${esc(C.description)}</p>
    <div class="cta-actions reveal">
      <a href="tel:${esc(phoneRaw)}" class="btn-primary">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5 19.79 19.79 0 0 1 1.61 5.08 2 2 0 0 1 3.6 3h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10.6a16 16 0 0 0 5.51 5.51l.98-.98a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${esc(C.phone_label)}
      </a>
      <button class="btn-outline" id="open-contact-form">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
        ${esc(C.form_heading)}
      </button>
    </div>
    <div id="contact-form-wrap" class="contact-form-wrap" style="display:none;">
      <form id="ndg-contact-form" action="https://formspree.io/f/${esc(formId)}" method="POST" novalidate>
        <input type="hidden" name="_subject" value="New consultation request — NetDesignGlobal">
        <div class="form-row">
          <div class="form-group">
            <label for="cf-name">Full Name <span>*</span></label>
            <input type="text" id="cf-name" name="name" required placeholder="John Smith">
          </div>
          <div class="form-group">
            <label for="cf-email">Business Email <span>*</span></label>
            <input type="email" id="cf-email" name="email" required placeholder="john@company.com">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="cf-company">Company</label>
            <input type="text" id="cf-company" name="company" placeholder="Acme Corp">
          </div>
          <div class="form-group">
            <label for="cf-service">Service of Interest</label>
            <select id="cf-service" name="service">
              <option value="">Select a solution...</option>
              ${options}
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="cf-message">Tell us about your project <span>*</span></label>
          <textarea id="cf-message" name="message" rows="4" required placeholder="Describe your current network challenges, scale, and goals..."></textarea>
        </div>
        <div class="form-footer">
          <button type="submit" class="btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            Send Message
          </button>
          <p id="cf-response" class="form-response" role="alert" aria-live="polite"></p>
        </div>
      </form>
    </div>
  </div>
</section>`;
}

function buildFooter(S) {
  return `
<footer id="contact" role="contentinfo">
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="#hero" class="nav-logo">
        <div class="logo-mark" aria-hidden="true"></div>
        <span class="logo-text" style="margin-left:10px">Net<span>Design</span>Global</span>
      </a>
      <p>${esc(S.footer_tagline)}</p>
      <div class="footer-social">
        ${S.linkedin ? `<a href="${esc(S.linkedin)}" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>` : ''}
        ${S.twitter  ? `<a href="${esc(S.twitter)}"  aria-label="Twitter"  target="_blank" rel="noopener">&#120143;</a>` : ''}
      </div>
    </div>
    <div class="footer-col">
      <h5>Solutions</h5>
      <ul>
        <li><a href="#services">Enterprise Networks</a></li>
        <li><a href="#services">Data Center Design</a></li>
        <li><a href="#services">Network Security</a></li>
        <li><a href="#services">Cloud &amp; Hybrid</a></li>
        <li><a href="#services">SD-WAN</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Services</h5>
      <ul>
        <li><a href="#services">Monitoring &amp; Visibility</a></li>
        <li><a href="#services">Implementation</a></li>
        <li><a href="#services">Optimization</a></li>
        <li><a href="#services">Consulting</a></li>
        <li><a href="#process">Our Process</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>Company</h5>
      <ul>
        <li><a href="#why">About Us</a></li>
        <li><a href="#industries">Industries</a></li>
        <li><a href="mailto:${esc(S.contact_email)}">Contact</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>&copy; ${new Date().getFullYear()} ${esc(S.site_name)} &middot; All Rights Reserved</p>
    <p class="footer-tagline">${esc(S.footer_bottom)}</p>
  </div>
</footer>`;
}

function build() {
  const S  = load('settings.yml');
  const H  = load('hero.yml');
  const SV = load('services.yml');
  const W  = load('why.yml');
  const IN = load('industries.yml');
  const PR = load('process.yml');
  const T  = load('tech.yml');
  const C  = load('cta.yml');

  const css = fs.readFileSync(path.join(PUBLIC, 'assets', 'css', 'main.css'), 'utf8');
  const js  = fs.readFileSync(path.join(PUBLIC, 'assets', 'js',  'main.js'),  'utf8');

  const colorOverrides = `:root{--blue:${S.color_blue||'#0563ff'};--cyan:${S.color_cyan||'#00d4ff'};--bg:${S.color_bg||'#04091a'};}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${esc(S.site_description)}">
  <title>${esc(S.site_name)} — ${esc(S.site_description)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>${css}</style>
  <style>${colorOverrides}</style>
</head>
<body>
${buildNav(S)}
${buildHero(H)}
${buildServices(SV)}
${buildWhy(W)}
${buildIndustries(IN)}
${buildProcess(PR)}
${buildTech(T)}
${buildCTA(C, S)}
${buildFooter(S)}
<script>${js}</script>
</body>
</html>`;

  fs.writeFileSync(path.join(PUBLIC, 'index.html'), html, 'utf8');
  fs.writeFileSync(path.join(PUBLIC, '404.html'),   html, 'utf8');

  const kb = Math.round(Buffer.byteLength(html, 'utf8') / 1024);
  console.log(`[${new Date().toISOString()}] Built index.html + 404.html (${kb} KB)`);
}

if (require.main === module) build();
module.exports = { build };
