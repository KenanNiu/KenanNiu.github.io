#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseOrcidWorks } = require('./lib/publication-sources');
const { normalizeTitle } = require('./lib/publication-normalizer');
const root = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/data/publications-data.js'), 'utf8'), context);
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/data/research-data.js'), 'utf8'), context);
const orcid = parseOrcidWorks(JSON.parse(fs.readFileSync(path.join(root, 'maintenance/publications/source-cache/orcid-works.json'), 'utf8')));
const publications = context.window.rviPublications.map(paper => {
  const matches = orcid.filter(candidate => candidate.doi && normalizeTitle(candidate.title) === normalizeTitle(paper.title));
  const dois = [...new Set(matches.map(candidate => candidate.doi))];
  return { ...paper, doi: paper.doi || (dois.length === 1 ? dois[0] : null) };
});
const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const researchTags = paper => {
  const tags = (paper.pillars || []).map(id => {
    const direction = context.window.rviResearch.find(item => item.id === id);
    if (!direction) throw new Error(`Unknown research direction: ${id}`);
    return `<span class="research-tag" data-research="${escape(id)}">${escape(direction.title)}</span>`;
  }).join('');
  return tags ? `<div class="research-tags" aria-label="Research directions">${tags}</div>` : '';
};
const bibliography = `<ol class="publication-list">${publications.map(p => `<li><a href="${escape(p.url)}">${escape(p.title)}</a><p>${escape(p.authors)}</p><p class="venue">${escape(p.venue)}${p.venue && p.year ? ' · ' : ''}${escape(p.year)}</p><div class="publication-links">${p.doi ? `<a href="https://doi.org/${escape(p.doi)}">DOI: ${escape(p.doi)}</a>` : ''}<a href="${escape(p.url)}">Article link</a><a class="source" href="${escape(p.scholarUrl)}">Google Scholar</a></div>${researchTags(p)}</li>`).join('')}</ol>`;
const highlights = ['semg-motion-2026','gaze-emg-2025','robotic-ultrasound-2025','hcce-cunet-2025','fluoroscopy-2025','augmented-reality-based-digital-twin-to-control-an-mr-safe-robot-for-breast-biopsy-a-benchmark-study-1n6pk2w'].map(id => publications.find(p => p.id === id)).filter(Boolean).map(p => `<li><a href="${escape(p.url)}">${escape(p.title)}</a><p>${escape(p.summary)}</p>${researchTags(p)}</li>`).join('');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Kenan Niu and RVI Group: research in robotic learning, AI reasoning, vision, spatial intelligence, motion and digital twins. Complete publication archive."><title>Kenan Niu | RVI Group Research & Publications</title><link rel="icon" href="data:,"><link rel="stylesheet" href="style.css?v=20261023-digital-twins"><link rel="stylesheet" href="../assets/css/research-colors.css?v=20261023-digital-twins"></head>
<body><a class="skip" href="#main">Skip to content</a><header><a class="identity" href="#main">Kenan Niu <span>RVI Group · University of Twente</span></a><nav aria-label="Main navigation"><a href="#research">Research</a><a href="#results">Selected work</a><a href="#publications">Publications</a><a href="#contact">Contact</a><a href="../">Full website</a></nav></header>
<main id="main"><section class="intro"><p class="eyebrow">Robotic Vision and Intelligence Group</p><h1>Kenan Niu</h1><p class="affiliation">University of Twente · Robotics and Mechatronics</p><p>We investigate how robots perceive, learn, predict and reason through interaction with the physical world. Our research connects robotic imaging, multimodal learning, spatial understanding, human motion and digital twins.</p><div class="profiles"><a href="https://people.utwente.nl/k.niu">University profile</a><a href="https://scholar.google.com/citations?user=mWEOPuMAAAAJ&amp;hl=en">Google Scholar</a><a href="https://orcid.org/0000-0002-5498-4311">ORCID</a><a href="https://www.linkedin.com/in/kenanniu/">LinkedIn</a></div></section>
<section id="research"><h2>Research</h2><div class="directions"><article data-research="learning-reasoning"><h3>Robotic Learning & AI Reasoning</h3><p>Multimodal learning from gaze, muscle activity and motion, with a research agenda in predictive models and grounded reasoning.</p></article><article data-research="vision-imaging"><h3>Robotic Vision & Imaging</h3><p>Robotic ultrasound, computer vision, anatomical segmentation and image-guided interventions.</p></article><article data-research="spatial-intelligence"><h3>3D Spatial Intelligence</h3><p>3D reconstruction, spatial sensing, navigation and AR/VR interfaces for robotic and medical systems.</p></article><article data-research="motion-intelligence"><h3>Motion Intelligence</h3><p>Human movement estimation and biomechanical understanding using ultrasound, sEMG, gaze and kinematic signals.</p></article><article data-research="digital-twins"><h3>Digital Twins</h3><p>Physical-digital robot interaction, anatomical models and simulation for planning and training, including an AR-based MR-safe robot twin.</p></article></div></section>
<section id="results"><h2>Selected research outcomes</h2><ul class="highlights">${highlights}</ul><figure class="research-image"><img src="images/research.jpg" alt="Selected RVI research system" onerror="this.hidden=true"><figcaption>RVI research systems</figcaption></figure></section>
<section id="publications"><h2>Publications</h2><p><a href="https://scholar.google.com/citations?user=mWEOPuMAAAAJ&amp;hl=en&amp;sortby=pubdate">Google Scholar</a></p>${bibliography}</section>
<section id="contact"><h2>Contact & supervision</h2><p>Research collaborations and BSc, MSc and doctoral projects in robotic intelligence, imaging, motion and digital twins.</p><a href="mailto:k.niu@utwente.nl">k.niu@utwente.nl</a> · <a href="../education.html">Education & student projects</a></section></main><footer>Kenan Niu · RVI Group · University of Twente <a href="../">Full website</a></footer></body></html>\n`;
const target = path.join(root, 'simple/index.html');
const diagram = '<figure class="research-image focus-diagram"><a href="images/research-directions.png"><img src="images/research-directions.png" width="1280" height="856" alt="Overlapping application areas: image-guided navigation, robotic vision and imaging, motion tracking, and AR/VR/MR."></a><figcaption>Application areas: image-guided navigation, robotic vision and imaging, motion tracking, and AR/VR/MR.</figcaption></figure>';
const gallery = '<div class="research-gallery"><figure><a href="images/imaging-motion-research.png"><img src="images/imaging-motion-research.png" width="825" height="930" loading="lazy" alt="Research montage of breast imaging, knee anatomy, fluoroscopy, ultrasound motion tracking and biomechanical modelling."></a><figcaption><strong>Imaging & motion analysis</strong><span>Medical imaging, ultrasound tracking and musculoskeletal modelling.</span></figcaption></figure><figure><a href="images/reconstruction-navigation-research.png"><img src="images/reconstruction-navigation-research.png" width="961" height="872" loading="lazy" alt="Research montage of anatomical volume rendering, tracked image-guided navigation, statistical shape modelling and robotic ultrasound reconstruction."></a><figcaption><strong>3D reconstruction & navigation</strong><span>Anatomical visualisation, shape modelling, image-guided navigation and robotic ultrasound.</span></figcaption></figure></div>';
const output = html.replace(/<figure class="research-image">.*?<\/figure>/, gallery).replace('</div></section>\n<section id="results">', `</div>${diagram}</section>\n<section id="results">`);
const fullTarget = path.join(root, 'publications.html');
const fullCurrent = fs.readFileSync(fullTarget, 'utf8');
const fullOutput = fullCurrent
  .replace(/<main id="main"[^>]*>[\s\S]*?<\/main>/, `<main id="main" class="full-publications"><header class="page-hero"><h1>Publications</h1><p><a href="https://scholar.google.com/citations?user=mWEOPuMAAAAJ&amp;hl=en&amp;sortby=pubdate">Google Scholar</a></p></header><section class="section">${bibliography}</section></main>`)
  .replace(/<script src="assets\/(?:data\/publications-data|js\/publication-filter|js\/publications)\.js"><\/script>/g, '');
for (const [file, content] of [[target, output], [fullTarget, fullOutput]]) {
  if (process.argv.includes('--check')) {
    if (!fs.existsSync(file) || fs.readFileSync(file,'utf8') !== content) { console.error(`${path.relative(root, file)} needs regeneration.`); process.exitCode = 1; }
  } else { fs.mkdirSync(path.dirname(file), {recursive:true}); fs.writeFileSync(file,content); }
}
