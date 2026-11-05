// Stress-test the study-mode question generators in index.html.
// Run: node tests/generators.test.js
// Every generated question must pass its own numeric verify() (which re-checks the answer from the
// original function), and no rendered text may contain formatting slips like "+ -" or "NaN".
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const src = html.match(/<script id="study-gen">([\s\S]*?)<\/script>/)[1];
const window = {};
eval(src);
const G = window.STUDY_GEN;
const N = Number(process.argv[2]) || 3000;
const BAD = /NaN|\bundefined\b(?! *:)|Infinity|\+ -|- -|\+ \+|\(x - 0\)|\(x \+ 0\)|(?<![0-9.])0x\b|\b1y\b/;
let failed = 0;
for (const [unit, skills] of Object.entries(G.units)) {
  for (const [skill, s] of Object.entries(skills)) {
    let rawFail = 0, bad = [];
    for (let i = 0; i < N; i++) {
      const o = s.gen();
      if (!o.verify()) rawFail++;
      const txt = [o.q, o.hint, o.ans, ...o.steps, o.why, o.trap].join(' ').replace(/is undefined/g, '');
      const m = txt.match(BAD);
      if (m && bad.length < 3) bad.push(txt.slice(Math.max(0, m.index - 50), m.index + 30));
    }
    const ok = rawFail === 0 && bad.length === 0;
    if (!ok) failed++;
    console.log((ok ? 'ok  ' : 'FAIL') + ' ' + unit + '/' + skill + (rawFail ? ' verify-fail=' + rawFail : '') + (bad.length ? ' text: ' + bad.join(' || ') : ''));
  }
}
for (const [unit, build] of Object.entries(G.tests || {})) {
  let bad = 0, sample = '';
  const M = Math.max(200, Math.floor(N / 10));
  for (let i = 0; i < M; i++) {
    const items = build();
    for (const it of items) {
      const marks = it.scheme.reduce((s, [m]) => s + m, 0);
      const txt = [it.q, it.ans, it.sol, ...it.scheme.map(x => x[1])].join(' ').replace(/is undefined/g, '');
      if (!it.verify() || !marks || !['K', 'A', 'T', 'C'].includes(it.cat) || (it.skill !== null && !G.units[unit][it.skill]) || BAD.test(txt)) { bad++; if (!sample) sample = it.cat + '/' + it.skill; }
    }
  }
  if (bad) failed++;
  console.log((bad ? 'FAIL' : 'ok  ') + ' test/' + unit + ' (' + M + ' versions)' + (bad ? ' bad=' + bad + ' first=' + sample : ''));
}
if (G.diagnostic) {
  let bad = 0; const areas = new Set(G.diagAreas.map(a => a[0]));
  for (let i = 0; i < 300; i++) for (const it of G.diagnostic()) {
    const txt = [it.q, it.ans, it.sol].join(' ').replace(/is undefined/g, '');
    if (!it.verify() || !areas.has(it.area) || !G.units[it.unit][it.skill] || BAD.test(txt)) bad++;
  }
  if (bad) failed++;
  console.log((bad ? 'FAIL' : 'ok  ') + ' diagnostic (300 versions)' + (bad ? ' bad=' + bad : ''));
}
process.exit(failed ? 1 : 0);
