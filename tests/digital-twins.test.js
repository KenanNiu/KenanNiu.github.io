const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function data(name) {
  const context = {window:{}};
  vm.runInNewContext(fs.readFileSync(`assets/data/${name}-data.js`, 'utf8'), context);
  return context.window;
}

test('Digital Twins is the fifth capability with linked published evidence', () => {
  const directions = data('research').rviResearch;
  const papers = data('publications').rviPublications;
  assert.equal(directions.length, 5);
  const twin = directions[4];
  assert.equal(twin.id, 'digital-twins');
  assert.equal(twin.title, 'Digital Twins');
  assert.equal(twin.number, '05');
  assert.ok(twin.representativePublicationIds.length >= 3);
  for (const id of twin.representativePublicationIds) {
    assert.ok(papers.find(p => p.id === id)?.pillars.includes('digital-twins'), id);
  }
  for (const paper of papers.filter(p => /digital twin/i.test(p.title))) {
    assert.ok(paper.pillars.includes('digital-twins'));
    assert.ok(paper.summary);
  }
});

test('Digital Twins tags persist across generated pages, projects and student work', () => {
  for (const file of ['index.html', 'research.html', 'publications.html', 'simple/index.html']) {
    assert.ok(fs.readFileSync(file, 'utf8').includes('digital-twins'), file);
  }
  assert.match(fs.readFileSync('index.html', 'utf8'), /Five capabilities/);
  const projects = data('projects').rviProjects;
  assert.ok(projects.some(p => p.pillars?.includes('digital-twins') && p.mappingBasis));
  const people = data('people').rviPeople;
  assert.ok(people.some(p => p.project?.pillars.includes('digital-twins') && p.project.mappingBasis));
  assert.match(fs.readFileSync('assets/js/projects.js', 'utf8'), /dataset\.research\s*=/);
  assert.match(fs.readFileSync('projects.html', 'utf8'), /assets\/data\/research-data.js/);
});

test('Digital Twins affiliations distinguish direct research from modelling foundations', () => {
  const curation = JSON.parse(fs.readFileSync('maintenance/publications/curation.json', 'utf8'));
  const papers = data('publications').rviPublications;
  const tagged = papers.filter(p => p.pillars.includes('digital-twins'));
  assert.equal(tagged.length, 14);
  for (const paper of tagged) {
    const match = curation[paper.scholarId].digitalTwinsMatch;
    assert.ok(['direct', 'nearest-fit'].includes(match.match));
    assert.ok(match.basis && match.sources.length);
  }
  const direct = tagged.find(p => /digital twin/i.test(p.title));
  assert.equal(curation[direct.scholarId].digitalTwinsMatch.match, 'direct');
  assert.equal(direct.doi, '10.1109/BioRob60516.2024.10719969');
  assert.ok(!papers.find(p => /twin to twin transfusion/i.test(p.title)).pillars.includes('digital-twins'));
});
