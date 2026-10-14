# Research direction colours

The sky-blue brand remains separate from the four research direction colours.
All full and concise pages share `assets/css/research-colors.css`.

| Research ID | Fill | Direction |
| --- | --- | --- |
| vision-imaging | #F8E5DF | Robotic Vision & Imaging |
| learning-reasoning | #F0EDFA | Robotic Learning & AI Reasoning |
| spatial-intelligence | #E7F5F0 | 3D Spatial Intelligence |
| motion-intelligence | #FAF1D8 | Motion Intelligence |

Use `data-research` with the stable direction ID, never visual order or
`nth-child`. Home tiles, Research headers, publication labels and student
project labels inherit the same fill, border and readable text tokens.
Always retain the written direction name; colour alone is not a label.

Publication and student labels reflect existing `pillars` arrays only.
Multi-direction records retain every affiliation. Unclassified records stay
neutral. Do not assign a primary direction or infer affiliations for unlabelled
project systems. Source raster figures are left unchanged.

Run `node scripts/build-simple-site.js` after changing publication labels or
the static generator. Commit both generated HTML files. The Pages publication
automation remains disabled. Run `node --test tests/*.test.js` and
`node scripts/build-simple-site.js --check` before deployment. Verify computed
colours, readable text, focus indicators and mobile wrapping in a browser.
