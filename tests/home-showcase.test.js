const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const crypto = require('node:crypto');

function load(name) {
  const c = {window:{}};
  vm.runInNewContext(fs.readFileSync(`assets/data/${name}-data.js`,'utf8'),c);
  return c.window;
}

test('homepage curates seven distinct works spanning all five capabilities', () => {
  const projects = load('projects').rviProjects.filter(p=>p.home);
  assert.equal(projects.length,7);
  assert.equal(new Set(projects.map(p=>p.homeOrder)).size,7);
  assert.ok(projects.every(p=>Number.isInteger(p.homeOrder)));
  const covered = new Set(projects.flatMap(p=>p.pillars));
  for(const direction of load('research').rviResearch) assert.ok(covered.has(direction.id),direction.id);
  assert.doesNotMatch(fs.readFileSync('assets/js/home.js','utf8'),/\.slice\(0,\s*3\)/);
});

test('new presentation images have exact native provenance and integrity hashes', () => {
  const manifest = JSON.parse(fs.readFileSync('maintenance/orthopedics-assets.json','utf8'));
  for(const id of ['mr-safe-robot-digital-model','multi-class-ultrasound-segmentation','dynamic-anatomical-shape-modelling']) {
    const asset = manifest.assets.find(a=>a.id===id);
    assert.ok(asset,id);
    assert.ok(asset.slideNumbers.length && asset.sourceMedia && asset.provenance);
    assert.equal(asset.transformation,'None; byte-for-byte native media export.');
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(asset.path)).digest('hex'),asset.sha256);
  }
});
