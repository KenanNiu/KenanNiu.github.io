const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('research projects use unique source-audited local assets', () => {
  const manifest = JSON.parse(fs.readFileSync('maintenance/orthopedics-assets.json', 'utf8'));
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync('assets/data/projects-data.js', 'utf8'), context);
  const projects = context.window.rviProjects;
  const approved = new Map(manifest.assets.map(asset => [asset.id, asset]));
  assert.equal(projects.length, 9);
  assert.equal(new Set(projects.map(project => project.id)).size, 9);
  assert.equal(manifest.source.slideCount, 115);
  projects.forEach(project => {
    const asset = approved.get(project.id);
    assert.ok(asset, project.id);
    assert.equal(project.image.src, asset.path);
    assert.ok(fs.existsSync(asset.path), asset.path);
    assert.equal(project.image.width, asset.width);
    assert.equal(project.image.height, asset.height);
    assert.ok(project.image.alt && project.image.caption && project.status && project.summary);
    assert.ok(asset.slideNumbers.length && asset.evidence.length && asset.sourceMedia);
    if (project.url) assert.equal(project.url, asset.citation.url);
  });
});
