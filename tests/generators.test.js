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
process.exit(failed ? 1 : 0);
