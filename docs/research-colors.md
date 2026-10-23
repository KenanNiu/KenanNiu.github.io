# Research direction colours

The sky-blue brand remains separate from the five research direction colours.
All full and concise pages share `assets/css/research-colors.css`.

| Research ID | Fill | Direction |
| --- | --- | --- |
| vision-imaging | #F8E5DF | Robotic Vision & Imaging |
| learning-reasoning | #F0EDFA | Robotic Learning & AI Reasoning |
| spatial-intelligence | #E7F5F0 | 3D Spatial Intelligence |
| motion-intelligence | #FAF1D8 | Motion Intelligence |
| digital-twins | #FAE8F0 | Digital Twins |

Use `data-research` with the stable direction ID, never visual order or
`nth-child`. Home tiles, Research headers, publication labels and student
project labels inherit the same fill, border and readable text tokens.
Always retain the written direction name; colour alone is not a label.

Publication and student labels reflect their `pillars` arrays. On October 14,
2026, Kenan requested that every publication receive its closest thematic
direction, including uncertain fits. Record the rationale and `direct` or
`nearest-fit` match in `maintenance/publications/curation.json`; these broad
topic labels do not assert AI reasoning, robotic capability or validated results.
Multi-direction records retain supported affiliations. Do not infer affiliations
for unlabelled project systems. Source raster figures are left unchanged.

Digital Twins was added on October 23, 2026. Its publication-specific
`digitalTwinsMatch` evidence separates direct twin research from related
anatomical modelling, reconstruction and simulation foundations. Project and
student assignments use `mappingBasis` for the same distinction. A topic tag
does not imply a validated real-time physical-digital feedback loop.

Run `node scripts/build-simple-site.js` after changing publication labels or
the static generator. Commit both generated HTML files. The Pages publication
automation remains disabled. Run `node --test tests/*.test.js` and
`node scripts/build-simple-site.js --check` before deployment. Verify computed
colours, readable text, focus indicators and mobile wrapping in a browser.
