# Orthopedics Source Audit

## Deliverable

Exactly six native research images are staged in `assets/img/orthopedics/`. `maintenance/orthopedics-assets.json` supplies slide mapping, source media, dimensions, factual summaries, alt text, evidence excerpts, citations where supplied, provenance caveats and excluded candidates. The presenter supplied this deck and explicitly requested reuse of its research materials on the website. This is a research-content selection under that instruction, not independent copyright clearance; collaborative and institutional provenance is recorded below.

| Asset | Source slide | Website subject |
| --- | --- | --- |
| lung-biopsy-phantom-guidance.jpeg | 19 | Tracked needle and tank phantom for image-guided biopsy research |
| ultrasound-scapula-reconstruction.png | 28 | Ultrasound points and statistical shape modelling of a scapula |
| robotic-ultrasound-phantom-setup.png | 59; context 58 | Depth-camera/marker-based robotic ultrasound target localization |
| robotic-ultrasound-reconstruction-framework.png | 64 | Trajectory generation, hybrid control and ultrasound segmentation |
| ar-pedicle-screw-control-interface.png | 81; context 82, 91 | AR interaction with a robotic pedicle-screw research setup |
| a-mode-ultrasound-knee-tracking.png | 97 | Multi-sensor A-mode ultrasound and optical tracking for knee kinematics |

## Source and Method

Source: `Biomedical&Robotic technologies in orthopedics.pptx`, supplied from the user's OneDrive UMCG orthopedics visit folder. Creator and last modifier in OOXML: Niu, Kenan (UT-EEMCS). The source remains unchanged and is not copied into the website.

The central directory contains 115 slide XML files and 339 media entries. Presentation relationships confirm numerical slide-file order; none are marked hidden. The 42 video entries total 2,343,841,950 uncompressed bytes, out of 2,650,061,810 media bytes. No videos were extracted. Structured XML inspection covered text runs, slide image relationships, picture crops, speaker notes and external hyperlinks. Twelve private contact sheets covered decodable native image candidates, followed by full-resolution inspection of the shortlisted images. Two EMF portraits could not be decoded and were excluded. No full-deck rendering was performed.

Private inspection records are under `/private/tmp/orthopedics-audit/` and are not website assets. Manual XML text excerpts preserve wording; adjacent text runs are joined for readability. Text inside bitmap figures is explicitly identified as visual evidence or visual transcription in the manifest. Selected files preserve original bytes, resolution and aspect ratio. No crop, resizing, retouching, anatomical alteration or generative operation was applied. Existing slide crops were not baked into the exported images.

## Dates and Evidence Boundaries

The title slide states March 26, 2025. OOXML creation is March 26, 2025 and modification is April 28, 2026. Slides including 34 and 81 show April 28, 2026. The deck mixes historical research, later additions, and prospective work. Do not date every result to 2025, describe every slide as current work, or use this snapshot as current publication or personnel status.

Slide 64 combines a published-paper header with a separate HCCE-CUNet under-review label. The native publication header names Dezhi Sun, Alessandro Cappellari, Bangyu Lan, Momen Abayazid, Stefano Stramigioli and Kenan Niu, and supplies `10.3390/technologies13020070`. Its title is *Automatic Robotic Ultrasound for 3D Musculoskeletal Reconstruction: A Comprehensive Framework*. This is a source transcription, not external metadata or licence verification.

Slide 91 supplies `10.3390/jimaging8100273` for *An Augmented Reality-Based Interaction Scheme for Robotic Pedicle Screw Placement*. It also supplies `10.1109/BioRob60516.2024.10719969` for the AR digital-twin breast-biopsy benchmark. The former is contextual support for the selected pedicle-screw interface, not proof that the still is a published figure. The latter must not be attached to the pedicle-screw image. Slides 29-30 cite Abe (2010), Chen (2004), and Hirsch (2021) for clinical background; their figures were not exported. No network verification was needed or performed.

Slide 19 contains accuracy numbers and clinical-software version labels; neither is carried into the website summary. Slide 97 gives kinematic numbers without sufficient standalone definition of the error measure and test context; no metrics are promoted. Slide 110 labels work as working/submitted, and slide 68 says planning; neither establishes completed validation. The selected summaries describe research systems and methods, without clinical-deployment, superiority, safety or efficacy claims.

## Topic Coverage

- Slides 1-14: academic background, RAM/Rvi-lab context and research/education themes.
- Slides 15-21: lung biopsy planning, visualization and ultrasound navigation.
- Slides 22-28: ultrasound shoulder reconstruction and statistical shape models.
- Slides 29-38: MRI-guided biopsy, Sunram robot and needle/lesion tracking.
- Slides 41-48: ultrasound vertebra reconstruction and depth-camera pose estimation.
- Slides 49-56: fetoscopy, catheter/C-arm examples and simulation concepts.
- Slides 57-65: robotic ultrasound, surface/trajectory generation and musculoskeletal segmentation.
- Slides 66-68: collaborative projects and prospective surgical training.
- Slides 71-91: XR background, AR navigation, pedicle-screw interaction and instrument sensing.
- Slides 94-109: A-mode knee kinematics, experiments and 4D shape-modelling tools.
- Slides 110-111: motor intelligence and camera-based motion tracking.
- Slides 114-115: acknowledgement portraits and closing contact information.

## Provenance and Privacy

The six selections are associated with research presented by Kenan: historical personal work, UT/RAM systems and collaborative shoulder/KU Leuven material. The presentation does not establish exclusive ownership of every figure. Materialise branding in the shoulder section and KU Leuven branding in the AR section are retained as provenance caveats, not converted into Rvi-lab-only authorship. Paper authors should receive credit alongside linked publication references.

Generic clinician/researcher stock photos, watermarked cartoons, headset marketing art, commercial clinical illustrations, member portraits and human/cadaver experimental photographs are excluded. A vertebra reconstruction panel with acquisition metadata is excluded conservatively. The AR screenshot contains a partial local network address and experimental interface values but no visible patient identifiers or private correspondence. These values are not website performance claims. No patient names or private correspondence are included in the selected exports.

Do not place the source PPT, private contact sheets, full slide-text dump or videos in the public repository. Prefer `object-fit: contain` for research figures and captions that preserve the method context. Respect native dimensions; do not upscale smaller figures into hero artwork. The publication cache and all files outside the assigned asset directory, manifest and this audit remain untouched. No commit or push was made.
