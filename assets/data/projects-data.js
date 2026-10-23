window.rviProjects = [
  {
    id: "robotic-ultrasound-phantom-setup",
    pillars: ["vision-imaging", "spatial-intelligence"],
    mappingBasis: "Visual localisation and robotic ultrasound acquisition in a physical phantom setup.",
    title: "Robotic ultrasound acquisition",
    status: "Experimental setup",
    summary: "A robot-mounted ultrasound probe uses depth-camera information and visual markers to locate a scanning target.",
    detail: "Surface geometry provides the basis for planning a scanning trajectory. The pictured setup is a laboratory phantom experiment.",
    homeHero: true,
    image: {
      src: "assets/img/orthopedics/robotic-ultrasound-phantom-setup.png", width: 1920, height: 1080,
      alt: "Laboratory robot and ultrasound probe beside a phantom on a University of Twente marker board.",
      caption: "Robot-mounted ultrasound probe and visual markers in a laboratory phantom setup."
    }
  },
  {
    id: "robotic-ultrasound-reconstruction-framework",
    home: true,
    homeOrder: 1,
    pillars: ["vision-imaging", "spatial-intelligence", "digital-twins"],
    mappingBasis: "Anatomical reconstruction provides a geometric foundation for digital twins; this framework is not presented as a complete closed-loop twin.",
    title: "Musculoskeletal ultrasound reconstruction",
    status: "Published research framework",
    summary: "Trajectory generation, hybrid robot control and coarse-to-fine ultrasound segmentation are linked in a framework for 3D musculoskeletal reconstruction.",
    url: "https://doi.org/10.3390/technologies13020070",
    linkLabel: "Framework paper (2025)",
    image: {
      src: "assets/img/orthopedics/robotic-ultrasound-reconstruction-framework.png", width: 996, height: 498,
      alt: "Research workflow linking scanning trajectory generation, hybrid robot control and two-stage ultrasound segmentation.",
      caption: "Trajectory generation, hybrid control and segmentation. Sun et al., Technologies (2025)."
    }
  },
  {
    id: "ultrasound-scapula-reconstruction",
    home: true,
    homeOrder: 7,
    pillars: ["spatial-intelligence", "digital-twins"],
    mappingBasis: "Ultrasound-derived points and statistical shape modelling build patient-specific anatomical representations for planning; foundational rather than a validated live twin.",
    title: "Ultrasound-based shoulder modelling",
    status: "Reconstruction feasibility study",
    summary: "Ultrasound point clouds and a statistical shape model are combined to reconstruct a scapula for preoperative-planning research.",
    detail: "A statistical shape model combines prior anatomical geometry with ultrasound-derived points to explore patient-specific shoulder planning.",
    image: {
      src: "assets/img/orthopedics/ultrasound-scapula-reconstruction.png", width: 646, height: 840,
      alt: "Reconstructed grey scapula surface with green ultrasound-derived points overlaid.",
      caption: "Reconstructed scapula surface with ultrasound-derived points. Collaborative shoulder-modelling research."
    }
  },
  {
    id: "ar-pedicle-screw-control-interface",
    pillars: ["spatial-intelligence", "digital-twins"],
    mappingBasis: "A virtual anatomical model and control interface are connected to a physical robot; thematic physical-digital interaction, not a claim of a complete digital twin.",
    title: "AR interaction for robotic screw placement",
    status: "Research prototype",
    summary: "An augmented-reality interface overlays drilling controls and a vertebra model on a laboratory robotic pedicle-screw-placement setup.",
    detail: "The demonstration explores remote drilling and drill retraction. The related paper studies an AR interaction scheme; the presentation image illustrates the research setup.",
    url: "https://doi.org/10.3390/jimaging8100273",
    linkLabel: "Related interaction study (2022)",
    home: true,
    homeOrder: 4,
    image: {
      src: "assets/img/orthopedics/ar-pedicle-screw-control-interface.png", width: 1280, height: 720,
      alt: "Augmented-reality drilling control panel overlaid on a laboratory robot setup with a virtual vertebra.",
      caption: "AR control interface in a laboratory robotic setup. KU Leuven research demonstration."
    }
  },
  {
    id: "a-mode-ultrasound-knee-tracking",
    pillars: ["motion-intelligence", "digital-twins"],
    mappingBasis: "Tracked measurements update registered bone poses, supporting measurement-informed anatomical models for digital-twin research.",
    title: "A-mode ultrasound knee tracking",
    status: "Experimental measurement system",
    summary: "Multiple A-mode ultrasound sensors, optical tracking and bone-model registration are combined to measure knee kinematics.",
    detail: "Developed during Kenan Niu's PhD research, the system was investigated in cadaveric experiments comparing reconstructed motion with bone-pin measurements.",
    home: true,
    homeOrder: 5,
    image: {
      src: "assets/img/orthopedics/a-mode-ultrasound-knee-tracking.png", width: 1392, height: 633,
      alt: "A-mode ultrasound knee-tracking workflow showing sensor holders, detected points, registered bone models and anatomical reference frames.",
      caption: "Multi-channel A-mode ultrasound, optical tracking and bone-model registration. Kenan Niu's PhD research."
    }
  },
  {
    id: "lung-biopsy-phantom-guidance",
    pillars: ["vision-imaging", "spatial-intelligence"],
    mappingBasis: "Tracked-needle image guidance and physical phantom accuracy testing.",
    title: "Tracked needle guidance in a phantom",
    status: "Bench prototype",
    summary: "An image-guided lung biopsy research setup uses a tracked needle and a tank phantom for interactive guidance and accuracy testing.",
    detail: "The bench setup tests the connection between a tracked instrument and guidance software using a physical target in a tank phantom.",
    image: {
      src: "assets/img/orthopedics/lung-biopsy-phantom-guidance.jpeg", width: 921, height: 638,
      alt: "Tracked biopsy needle above a transparent tank containing a stone target, chopsticks and foam supports.",
      caption: "Tracked biopsy needle and physical target used in a bench phantom experiment."
    }
  },
  {
    id: "mr-safe-robot-digital-model",
    home: true,
    homeOrder: 2,
    pillars: ["digital-twins", "spatial-intelligence"],
    mappingBasis: "A virtual representation of a physical MR-safe robot supports geometric inspection and planning; the linked AR study is related work, not the source of this specific model image.",
    title: "Digital modelling for MR-safe robotic biopsy",
    status: "Research platform",
    summary: "A virtual Sunram 7 robot model represents the needle mechanism and target geometry. Related AR research couples a virtual robot with its physical counterpart for needle positioning.",
    detail: "The presentation places the model within a system overview linking imaging, calibration and path planning. This image is a model view, not an AR-control screenshot or evidence of clinical deployment.",
    url: "https://doi.org/10.1109/BioRob60516.2024.10719969",
    linkLabel: "Related digital-twin study (2024)",
    image: {
      src: "assets/img/orthopedics/mr-safe-robot-digital-model.png", width: 856, height: 630,
      alt: "Digital Sunram 7 robot model, needle mechanism and target phantom in a three-dimensional coordinate frame.",
      caption: "Virtual robot model from the MR-guided biopsy system overview. Research presentation, slide 32."
    }
  },
  {
    id: "multi-class-ultrasound-segmentation",
    home: true,
    homeOrder: 3,
    pillars: ["learning-reasoning", "vision-imaging"],
    mappingBasis: "A learned model segments musculoskeletal structures in ultrasound images; the comparison panel is qualitative, not a standalone numerical performance claim.",
    title: "AI segmentation of musculoskeletal ultrasound",
    status: "Published method",
    summary: "HCCE-CUNet separates musculoskeletal structures in ultrasound images. The original comparison panel shows predicted masks alongside reference segmentations and other networks.",
    url: "https://doi.org/10.1109/TMRB.2025.3617959",
    linkLabel: "Segmentation paper (2025)",
    image: {
      src: "assets/img/orthopedics/multi-class-ultrasound-segmentation.png", width: 1020, height: 611,
      alt: "Ultrasound examples, reference masks and qualitative multiclass segmentation comparisons with all original column labels.",
      caption: "Qualitative segmentation examples. Sun et al., HCCE-CUNet; research presentation, slide 65."
    }
  },
  {
    id: "dynamic-anatomical-shape-modelling",
    home: true,
    homeOrder: 6,
    pillars: ["digital-twins", "motion-intelligence", "spatial-intelligence"],
    mappingBasis: "Statistical models of 4D CT anatomy represent temporal shape variation; modelling foundations for digital twins, not a validated real-time twin.",
    title: "4D anatomical shape modelling",
    status: "Postdoctoral research",
    summary: "4D CT sequences and statistical shape models describe anatomical variation over time. The illustrated mean scapula model comes from work using a 33-frame sequence.",
    detail: "The presentation describes registration across datasets, PCA modes and later bilinear-PCA extrapolation tools. The still shown here is the mean model, not a prediction result or accuracy benchmark.",
    image: {
      src: "assets/img/orthopedics/dynamic-anatomical-shape-modelling.png", width: 506, height: 519,
      alt: "Mean scapula surface model from the presentation section on 4D CT and statistical anatomical modelling.",
      caption: "Mean anatomical model from 4D CT shape modelling. Collaborative postdoctoral work, 2018-2019; slide 103."
    }
  }
];
