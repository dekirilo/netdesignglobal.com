'use strict';

const http  = require('http');
const fs    = require('fs');
const path  = require('path');
const yaml  = require('js-yaml');
const { build } = require('./build.js');

const PORT    = process.env.API_PORT || 3001;
const CONTENT = path.join(__dirname, 'content');
const ALLOWED = ['settings','hero','services','why','industries','process','tech','cta'];

let lastBuild   = null;
let buildStatus = 'idle';

function triggerBuild() {
  buildStatus = 'building';
  try {
    build();
    lastBuild   = new Date().toISOString();
    buildStatus = 'ok';
    console.log(`[${lastBuild}] Rebuild complete`);
  } catch(e) {
    buildStatus = 'error';
    console.error('Build error:', e.message);
  }
}

const server = http.createServer((req, res) => {
  const u = new URL(req.url, `http://localhost`);
  const p = u.pathname;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  const json = (data, code = 200) => {
    res.writeHead(code, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  if (req.method === 'GET' && p === '/api/status') {
    return json({ ok: true, lastBuild, buildStatus, files: ALLOWED });
  }

  if (req.method === 'POST' && p === '/api/rebuild') {
    triggerBuild();
    return json({ ok: true });
  }

  const getM = p.match(/^\/api\/content\/([a-z]+)$/);
  if (req.method === 'GET' && getM) {
    const name = getM[1];
    if (!ALLOWED.includes(name)) return json({ error: 'Not found' }, 404);
    try {
      const data = yaml.load(fs.readFileSync(path.join(CONTENT, `${name}.yml`), 'utf8'));
      return json({ ok: true, data });
    } catch(e) { return json({ error: e.message }, 500); }
  }

  const postM = p.match(/^\/api\/content\/([a-z]+)$/);
  if (req.method === 'POST' && postM) {
    const name = postM[1];
    if (!ALLOWED.includes(name)) return json({ error: 'Not found' }, 404);
    let body = '';
    req.on('data', c => { body += c; });
    req.on('end', () => {
      try {
        const data    = JSON.parse(body);
        const yamlStr = yaml.dump(data, { lineWidth: 120 });
        fs.writeFileSync(path.join(CONTENT, `${name}.yml`), yamlStr, 'utf8');
        triggerBuild();
        json({ ok: true, message: `Saved ${name}.yml` });
      } catch(e) { json({ error: e.message }, 400); }
    });
    return;
  }

  json({ error: 'Not found' }, 404);
});

triggerBuild();

server.listen(PORT, '0.0.0.0', () => {
  console.log(`CMS API: http://localhost:${PORT}/api/status`);
  console.log(`Admin:   http://localhost/admin`);
});

process.on('SIGTERM', () => { server.close(); process.exit(0); });
process.on('SIGINT',  () => { server.close(); process.exit(0); });
