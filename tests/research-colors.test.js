const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

test('full and concise bibliographies preserve every existing research affiliation', () => {
  const context = {window:{}};
  vm.runInNewContext(fs.readFileSync('assets/data/publications-data.js','utf8'),context);
  for (const file of ['publications.html','simple/index.html']) {
    const html = fs.readFileSync(file,'utf8');
    const bibliography = html.match(/<ol class="publication-list">([\s\S]*?)<\/ol>/)[1];
    const records = bibliography.split('<li>').slice(1);
    assert.equal(records.length,70);
    context.window.rviPublications.forEach((paper,index) => {
      const tags = [...records[index].matchAll(/data-research="([^"]+)"/g)].map(m=>m[1]);
      assert.deepEqual(tags,Array.from(paper.pillars),paper.id);
    });
  }
});

test('all active research renderers key colours by direction ID', () => {
  for (const file of ['assets/js/home.js','assets/js/research.js','assets/js/people.js']) {
    assert.match(fs.readFileSync(file,'utf8'),/dataset\.research\s*=/,file);
  }
  const html = fs.readFileSync('simple/index.html','utf8');
  for (const id of ['vision-imaging','learning-reasoning','spatial-intelligence','motion-intelligence']) {
    assert.ok(html.includes(`<article data-research="${id}">`),id);
  }
});

test('shared palette includes static tags and readable approved pastel pairs', () => {
  const css = fs.readFileSync('assets/css/research-colors.css','utf8');
  assert.match(css,/:root \.research-tag\[data-research\]/);
  const fills = ['#F8E5DF','#F0EDFA','#E7F5F0','#FAF1D8'];
  function luminance(hex) {
    const values = hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4);
    return values[0]*.2126+values[1]*.7152+values[2]*.0722;
  }
  const rules = [...css.matchAll(/\[data-research="([^"]+)"\]\s*\{([^}]+)\}/g)];
  assert.equal(rules.length,4);
  rules.forEach((rule,index)=>{
    const fill = rule[2].match(/--research-fill:\s*(#[\dA-Fa-f]+)/)[1];
    const ink = rule[2].match(/--research-ink:\s*(#[\dA-Fa-f]+)/)[1];
    assert.equal(fill,fills[index]);
    assert.ok((luminance(fill)+.05)/(luminance(ink)+.05)>=4.5,rule[1]);
  });
});
