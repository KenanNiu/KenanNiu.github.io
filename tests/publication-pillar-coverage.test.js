const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const {normalizeTitle} = require('../scripts/lib/publication-normalizer');

test('every publication has durable topic tags and a documented mapping basis', () => {
  const context = {window:{}};
  vm.runInNewContext(fs.readFileSync('assets/data/publications-data.js','utf8'),context);
  const papers = context.window.rviPublications;
  const curation = JSON.parse(fs.readFileSync('maintenance/publications/curation.json','utf8'));
  const allowed = new Set(['vision-imaging','learning-reasoning','spatial-intelligence','motion-intelligence','digital-twins']);
  assert.equal(papers.length,70);
  const titles = new Map();
  papers.forEach(p=>{
    assert.ok(p.pillars.length>=1,p.id+' missing direction');
    assert.ok(p.pillars.every(id=>allowed.has(id)));
    const entry = curation[p.scholarId];
    assert.deepEqual(Array.from(p.pillars),entry.pillars);
    assert.ok(entry.thematicMatch && entry.thematicMatch.basis,p.id+' missing basis');
    assert.ok(['direct','nearest-fit'].includes(entry.thematicMatch.match));
    const title = normalizeTitle(p.title);
    if (titles.has(title)) assert.deepEqual(Array.from(p.pillars),titles.get(title),p.id+' inconsistent duplicate tags');
    else titles.set(title,Array.from(p.pillars));
  });
});
