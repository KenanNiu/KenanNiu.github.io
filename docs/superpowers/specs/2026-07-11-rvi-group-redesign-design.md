# RVI Group Website Redesign

## Objective

Transform the existing personal academic website into the public website of the RVI Group (Robotic Vision and Intelligence Group). The site should communicate a distinctive research agenda, substantiate it with published work and real systems, and remain easy to maintain as the group grows.

The first implementation will be reviewed locally. It must not be pushed to GitHub until Kenan approves the local result.

## Positioning

RVI Group investigates how robotic systems can develop grounded intelligence through perception, learning, spatial understanding, and motion. The group aims beyond pattern recognition toward robots that can perceive, predict, and reason in physical environments.

The site will express this position in restrained academic language. It will not explicitly criticize large language models or embodied-intelligence research. Claims about reasoning and causality will be framed as a research frontier unless supported by published evidence.

Primary audiences are international research collaborators, funding reviewers, prospective researchers and students, and clinical or industrial partners. The homepage will serve all four groups while slightly prioritizing research authority and collaboration.

## Information Architecture

The website will use a multi-page structure:

- `Home`: research manifesto, four research pillars, selected evidence, recent work, and collaboration or joining entry points.
- `Research`: complete descriptions of the four pillars, representative publications, systems, figures, and future questions.
- `Publications`: publications grouped by year and filterable by research pillar, with DOI, publisher, UT Pure, or open-access links.
- `People`: Kenan Niu as Group Lead and maintainable placeholders for future group members.
- `Projects & Demos`: robotic systems, software, experiments, videos, and demonstrations. Missing material remains an explicit placeholder.
- `Education`: courses, thesis opportunities, student projects, and supervision.
- `About & Contact`: group identity, University of Twente and RAM affiliations, public profile links, and contact details.

The navigation brand will be `RVI Group`, with `Robotic Vision and Intelligence` as the expanded name. Kenan's personal profile supports the group identity rather than dominating the homepage.

## Research Pillars

### Robotic Vision & Imaging

Focus: robotic systems that actively acquire, interpret, and use images of the physical or medical world.

Initial evidence includes automatic robotic ultrasound, HCCE-CUNet multiclass musculoskeletal segmentation, and autonomous fluoroscopic imaging. The narrative emphasizes a perception-to-action loop rather than image processing in isolation.

### Robotic Learning & AI Reasoning

Focus: internal representations learned from multimodal perception and interaction, progressing toward predictive, transferable, causal, and task-level reasoning.

Current evidence includes hierarchical transformer fusion of gaze and sEMG and motion inference from physiological signals. Reasoning and causality are labelled as active research frontiers, not completed achievements.

### 3D Spatial Intelligence

Focus: building, updating, and acting on three-dimensional models through reconstruction, navigation, AR/VR, and spatial sensing.

Initial evidence includes automatic robotic ultrasound for 3D musculoskeletal reconstruction, dynamic 4D modelling, and image-guided navigation work.

### Motion Intelligence

Focus: understanding human and robotic motion from ultrasound, sEMG, gaze, and kinematic signals.

Initial evidence includes 3D forearm trajectory inference, ultrasound-based knee kinematics tracking, and muscle activation-deformation analysis.

Each research pillar will present:

- One core scientific question.
- One concise research claim.
- Two to four representative publications.
- One figure from an open-access paper or author-approved source, with attribution.
- One project or system example.
- A `What we are pursuing next` section.

## Evidence and Image Policy

Publication metadata will be verified against the University of Twente research profile, DOI records, publishers, or open-access paper files. Google Scholar and ResearchGate may be linked as profiles but will not be treated as the only metadata source when automated access is unavailable.

Paper figures will be used only when the source is open access or Kenan confirms permission. Each figure will retain a source citation and link. An unverified figure will remain a clearly labelled placeholder.

The site will not invent group members, projects, publications, metrics, demonstrations, or research results. It will visibly distinguish demonstrated work from future research.

## Homepage Visual Design

The selected direction is a vision-led research manifesto.

The first viewport uses a dark charcoal-green background, restrained typography, a short `Beyond pattern recognition` eyebrow, and the headline `Robots that perceive, predict and reason.` Supporting text introduces grounded intelligence through vision, learning, spatial understanding, and motion.

The four research pillars appear immediately below the main statement. Inner pages switch to a bright, evidence-oriented layout with warm-white backgrounds, charcoal text, compact citations, large paper figures, and restrained accent colors for each pillar.

Visual assets must show actual robots, experiments, medical images, spatial reconstructions, motion data, or publication figures. Generic AI brains, abstract neural-network graphics, and decorative technology imagery are excluded.

## Homepage Slideshow

The homepage research visual will be a slideshow rather than a single image.

- Images live in `assets/img/hero-slides/`.
- The first version contains six clearly identifiable placeholder images, A through F.
- Slides advance automatically every five seconds.
- Controls include previous and next buttons, position indicators, keyboard navigation, and touch gestures where practical.
- Rotation pauses on hover and focus.
- Reduced-motion preferences disable automatic animation.
- Each slide can define a title, a short caption, and a research-pillar label.
- Missing images fall back to a labelled direction-colored panel instead of a broken image.

GitHub Pages cannot enumerate a folder at runtime. A small local script will scan `assets/img/hero-slides/` and regenerate the slideshow manifest. The generated manifest will live in `assets/data/hero-slides.js`. This preserves the requested folder-based workflow while remaining compatible with static hosting.

## Technical Architecture

The site remains a dependency-free static website suitable for GitHub Pages.

Shared assets:

- `assets/css/styles.css`: visual system and responsive layouts.
- `assets/js/common.js`: navigation, shared rendering, accessibility, and utilities.
- `assets/js/home.js`: homepage and slideshow behavior.
- `assets/js/publications.js`: publication filtering.
- `assets/data/site-data.js`: group identity, navigation, contact, and education.
- `assets/data/research-data.js`: research pillars and representative work.
- `assets/data/publications-data.js`: publication records and pillar tags.
- `assets/data/people-data.js`: group members and placeholders.
- `assets/data/projects-data.js`: projects, demos, and media.
- `assets/data/hero-slides.js`: generated slideshow manifest.
- `scripts/update-hero-slides.js`: local manifest generator.

Repeatable content will be data-driven. Updating a publication, member, project, or slide should not require changing page markup.

## Resilience and Accessibility

- Missing optional data produces an explicit empty state.
- Missing images produce a styled fallback.
- External links open safely and identify their destination.
- Navigation, filters, and slideshow controls are keyboard accessible.
- Images include meaningful alternative text.
- Color is not the only way research pillars are identified.
- Core page content remains readable if JavaScript fails.
- The layout avoids horizontal overflow and text overlap across mobile, tablet, and desktop widths.

## Verification

Local verification will cover:

- All pages and shared navigation.
- Desktop, tablet, and mobile layouts.
- Slideshow timing, manual controls, pause behavior, reduced motion, and missing-image fallback.
- Publication filters and external links.
- JavaScript syntax and browser-console errors.
- Broken internal links and asset references.
- Horizontal overflow and text overlap.
- Static-site structural checks.

The completed redesign will be served locally for Kenan's review. GitHub commit and push of the implementation require a separate approval after that review.

## Deferred Content

- Final hero images supplied by Kenan.
- Member profiles beyond the Group Lead.
- Public project videos and demonstrations.
- Student thesis records and related media after privacy and publication review.
- Any paper figure whose reuse status cannot yet be confirmed.
