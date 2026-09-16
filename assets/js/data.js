/* ------------------------------------------------------------------
   SITE CONTENT
   This is the only file you need to edit to add or change entries.

   Each entry:
     id       - unique slug; becomes the URL: entry.html?id=<slug>
     kind     - "experience" or "project"
     title    - headline
     org      - organization / venue
     date     - date range shown next to the title
     image    - path to the card image, e.g. "images/pacbot.jpg"
                (leave "" and a clean placeholder is drawn instead)
     blurb    - one or two sentences shown on the front page
     tags     - short list of tools / topics
     links    - [{ label, href }] shown on the detail page
     overview - paragraph(s) at the top of the detail page (array)
     details  - [{ heading, points: [] }] sections on the detail page
     gallery  - extra images on the detail page:
                [{ src: "images/foo.jpg", caption: "..." }]
     documents- papers / reports shown as a cover card with an inline
                preview: [{ kicker, title, authors, venue, href, cover,
                            pages }] — put the PDF in /docs and a cover
                image (page 1) in /images
   ------------------------------------------------------------------ */

const SITE = {
  name: "Thomas Zhang",
  tagline:
    "Electrical & computer engineering undergrad at Princeton, working on computer architecture, hardware design, and the software around them.",
  location: "Princeton, NJ",
  email: "tz4088@princeton.edu",
  github: "https://github.com/ThomasZhang100",
  resume: "TZ_resume_c.pdf",
  about: [
    "I'm a B.S.E. candidate in Electrical and Computer Engineering at Princeton University (Class of 2028), where I hold a 3.96 GPA and received the Shapiro Prize for Academic Excellence in 2025.",
    "I'm super interested in hardware engineering, embedded systems, microprocessor design!"
  ],
  skills: [
    {
      heading: "Digital Design",
      items:
        "Verilog, SystemVerilog, RTL design, Verilog testbenches, waveform debugging, CPU/GPU microarchitecture, PCI-Express, RISC-V, SoC interconnect"
    },
    {
      heading: "Software / Embedded",
      items:
        "C/C++, Arduino, FreeRTOS, ESP32, KiCad, Python, Java, JavaScript/React.js, PostgreSQL, Git, Docker, PCB layout, schematic capture, oscilloscope & multimeter debugging"
    }
  ]
};

const ENTRIES = [
  /* ----------------------------- EXPERIENCE ----------------------------- */
  {
    id: "parallel-group",
    kind: "experience",
    title: "Safety-Oriented GPU Architecture",
    role: "Researcher",
    org: "Princeton Parallel Group",
    date: "May 2026 — Present",
    image: "images/parallel-group.jpg",
    blurb:
      "Built hardware-level AI safety machinery into a RISC-V GPGPU — an on-chip probe that watches L2 hidden-state traffic for LLM misalignment, plus a unit that fingerprints model weights as they land in VRAM.",
    tags: ["SystemVerilog", "RISC-V", "GPGPU", "C++", "Python"],
    links: [],
    overview: [
      "I worked in the Princeton Parallel Group to build a hardware-rooted safety monitor embedded into the GPU die, detecting dangerous misalignment signals from traffic that crosses the chip. The above is a high-level diagram of the sparse auto-encoder accelerator that I implemented in SystemVerilog as a part of our RTL prototype."
    ],
    details: [
      {
        heading: "Achievements:",
        points: [
          "I defined a threat model for non-bypassable activation monitoring and compared three placements of the trusted computing base (TCB).",
          "I implemented a SystemVerilog prototype of our safety monitor on top of the Vortex open source GPGPU, complete with an sparse autoencoder (SAE) checker accelerator and an ingress hashing mechanism for fingerprinting LLM runtimes.",
          "I demonstrated that our monitor had negligible performance interference with the resident workload using end-to-end RTL simulations.",
          "I thoroughly red-teamed our safety monitor against attacks, assessing various alternative solutions and identifying tradeoffs in flexibility and security.",
        ]
      },
      {
        heading: "RTL prototype:",
        points: [
          "The core of the sparse autoencoder accelerator consists of a output-stationary systolic array. The array reads activations from the memory hierarchy through the L2 cache port arbiter, streaming the values from a double-buffered input buffer. Sparse autoencoder logits are compared against pre-computed thresholds to produce misalignment flags.",
          "Kernel execution is gated on hardware symmetric signature verification of a model manifest, which contains hashes of model weights and kernel code for fingerprinting, as well as metadata to tell the alignment monitor what to do.",
          "To test the interference of the alignment monitor on resident workloads, I wrote realistic tiled GEMM kernels in C++ for the Vortex runtime and ran them alongside our alignment monitor, measuring cycle counts and checker latency.",
          "I also built a Python-driven automated regression suite for verification of the correctness of all features added in the RTL prototype."
        ]
      },
      {
        heading: "Weight identification unit",
        points: [
          "Independent of the Vortex prototpye, I also built a SystemVerilog proof of concept for an optimized ingress hashing mechanism which snoops memory-mapped AXI interconnect bursts and computes a sequential SHA-256 hash on the fly, saving the memory bandwidth that would be spent on an extra readout of model weights."
        ]
      }
    ],
    documents: [
      {
        kicker: "Report",
        title:
          "Measured Models: A Hardware Perspective on Non-Bypassable AI Alignment",
        authors: "Thomas Zhang, Haiyue Ma, David Wentzlaff",
        venue: "Department of Electrical and Computer Engineering, Princeton University",
        summary:
          "Proposes a GPU hardware root of trust for alignment monitoring: a threat model for non-bypassable activation monitoring, a signed-manifest execution protocol binding model weights, checker parameters, and kernel code, and a Vortex-based prototype with an ingress hashing engine, immutable verified memory regions, an execution-state machine, and a sparse-autoencoder checker accelerator.",
        href: "docs/measured-models.pdf",
        cover: "images/measured-models-cover.jpg",
        pages: 11
      }
    ],
    gallery: []
  },
  {
    id: "fu-lab",
    kind: "experience",
    title: "Microfabrication for Optoelectronic Biosensing",
    role: "Research Assistant",
    org: "Fu Lab, Princeton University",
    date: "August 2025 — December 2025",
    image: "images/fu-lab.jpg",
    blurb:
      "Ran cleanroom microfabrication to build a prototype centimeter-scale optoelectronic biosensing chip for pharmacology and neuroscience applications.",
    tags: ["KLayout", "Photolithography", "Thin films", "Cleanroom"],
    links: [],
    overview: [
      "I performed hands-on device fabrication in the Fu Lab, taking an optoelectronic biosensor from mask layout through a full process flow to an initial prototype."
    ],
    details: [
      {
        heading: "What I did",
        points: [
          "Conducted microfabrication procedures — KLayout mask design, photolithography, spin-coating, and metal deposition.",
          "Fabricated a prototype centimeter-scale optoelectronic biosensing chip intended for pharmacology and neuroscience applications."
        ]
      }
    ],
    /* Stacked, full-width figures with room to write between them.
       Each item: { src, alt, caption, text: ["paragraph", ...] } */
    figuresHeading: "In the lab",
    figures: [
      {
        src: "images/fu-1.png",
        alt: "Gowned up in the cleanroom",
        caption: "Gowned up for a run in the cleanroom.",
        text: [
          "Almost all of the fabrication happened in the Princeton Micro/Nanofabrication Center (MNFC) cleanroom. I followed a strict gowning protocol before entering to keep particles off the wafer."
        ]
      },
      {
        src: "images/fu-2.png",
        alt:
          "Device concept: cells on a 2D material over a substrate, excited by a laser from below",
        caption:
          "Device concept — cells sit on a 2D material, a laser excites from below, and the emitted light is read out.",
        text: [
          "We can obtain optical measurements of cellular voltages by placing cell cultures directly on top of the 2D material, exciting the material with a laser, and using a high-speed camera or photodetector to capture light emitted from the semiconductor.  The 2D semiconductor is a transition-metal dichalcogenide (WS2), which has a crystalline structure that becomes ‘direct-gap’ as we thin it to a single layer. In a ‘direct-gap material,’ the minimum energy level in the conduction band and the maximum energy level in the valence band occur at the same crystal momentum (k-value), allowing for electrons to transition between bands easily by absorbing or emitting photons. As such, these materials are very efficient light-emitters and can effectively be used as fluorescent probes in our voltage sensing device. Moreover, due to the atomically-thin geometry of these materials, they are extremely sensitive to surface electric fields: even those as weak as those produced by neurons." 
        ]
      },
      {
        src: "images/fu-3.png",
        alt: "Microscope image of photoresist after liftoff",
        caption: "Microscope image of photoresist after liftoff.",
        text: [
          "WS2 exhibits the best photoluminescent responsivity when a 600mV DC voltage bias is applied (this is the region in which the rate of change of the PL intensity with respect to the applied voltage is the highest). Thus, to achieve this, we must apply a uniform initial electrical potential to the entire monolayer. The method that we have proposed is to deposit a grid of thin metal traces directly on top of the 2D semiconductor, which, when connected to an external voltage source, will create a uniform electrostatic distribution across the entire monolayer, providing the initial carrier density required for high responsivity."
        ]
      },
      {
        src: "images/fu-4.png",
        alt:
          "Cross-section of a bilayer resist stack with AZ1505 over LOR3A and deposited metal",
        caption:
          "Bilayer resist stack — AZ1505 over LOR3A — set up for metal liftoff.",
        text: [
          "The images on this page depict the process of microfabrication for our device prototype. I designed the photomask in KLayout, and uploaded the resulting GDSII files to the Heidelberg DWL66+, where the photomask was exposed. The exposed photoresist was then removed and a Chrome Etcher was used to remove the chrome layer in areas where the photoresist was originally exposed. I then spincoated a bilayer configuration of photoresist onto our wafer, exposed the wafer using our fabricated photomask, and removed the exposed photoresist using developer solution. After obtaining a wafer with successful patterning of resist, the Angstrom NexDep E-Beam evaporator was used to deposit several layers of metal (gold and titanium) on the wafer. Upon the completion of the deposition, the wafer was placed into a heated dish of 1165 microposit remover for several hours for metal liftoff. During this process, the underlying photoresist is dissolved away, carrying away any metal deposited on top of it and leaving only the metal in the original pattern that I designed." 
        ]
      }
    ],
    gallery: []
  },
  {
    id: "hmei-air-pollution",
    kind: "experience",
    title: "India Air Pollution Data Platform",
    role: "Full-Stack Software Developer & Data Scientist",
    org: "High Meadows Environmental Institute",
    date: "June 2025 — August 2025",
    image: "images/hmei.jpg",
    blurb:
      "A React + FastAPI + PostgreSQL web app visualizing city-level air pollution across India, built to quantify how effective government policy has been over time.",
    tags: ["React", "FastAPI", "PostgreSQL", "Docker", "Jenkins", "Web Scraping", "Machine Learning"],
    links: [
      {
        label: "indiaairpollution.mauzerall.scholar.princeton.edu",
        href: "https://indiaairpollution.mauzerall.scholar.princeton.edu"
      }
    ],
    overview: [
      "A public research tool for the Mauzerall group at Princeton's High Meadows Environmental Institute. The platform brings city-level Indian air quality data into one place so researchers can measure the efficacy of government policies over time."
    ],
    details: [
      {
        heading: "Platform",
        points: [
          "Built a React + FastAPI + PostgreSQL web app visualizing city-level air pollution data in India.",
          "Dockerized the application and deployed it through a Jenkins pipeline."
        ]
      },
      {
        heading: "Data science",
        points: [
          "Built Selenium web scrapers the gather data in bulk from India's CPCB Website.",
          "Reduced missing-data bias by parallelizing Monte Carlo simulations on Princeton's Della cluster.",
          "Isolated emissions trends from historical weather patterns using machine learning (random forest)."
        ]
      }
    ],
    figures: [
      {
        video: "media/scraper.mp4",
        poster: "images/scraper-poster.jpg",
        wide: true,
        alt:
          "Automated browser stepping through the CPCB air quality portal, selecting state, city, station, and date range before submitting",
        caption:
          "The scraper working through the CPCB portal, station by station.",
        text: [
          "India's Central Pollution Control Board publishes station-level readings only through a form on its Central Control Room portal: one state, city, station, parameter set, and date range at a time, with no bulk export and no API.",
          "I built new custom web scraper scripts and improved upon old ones to collect hourly pollution data across hundreds of cities over the past decade. These scrapers also collected annual mitigation spending metrics and hundreds of city-specific action plan pdfs from the website."
        ]
      },
      {
        src: "images/hmei-3.png",
        alt:
          "Box plots of bias against threshold in days, with data-loss curves for three station-hour cutoffs",
        caption:
          "Choosing a completeness threshold for daily-to-monthly aggregation: bias falls as the threshold rises, but so does the amount of surviving data.",
        text: [
          "Station data arrives full of gaps, and we want to produce daily, monthly, and annual pollution metric averages that are robust against missing-data biases. We conducted large-scale randomized Monte Carlo style simulations on the Della computing cluster to figure out how strict our quality control thresholding should be. For example, requiring too few valid days per month would result in the averages being biased, while requiring too many would remove most cities from our dataset.",
          "I ran many sweeps in parallel on the Della cluster using SLURM scripts, enabling me to grid-search an array of policies."
        ]
      },
      {
        src: "images/hmei-2.png",
        wide: true,
        alt:
          "Diagram of a random forest deweathering model taking time variables and sampled meteorological conditions to output deweathered PM2.5",
        caption:
          "Deweathering: a random forest separates the emissions signal from year-to-year variation in the weather.",
        text: [
          "A drop in PM2.5 on the time series graph for a certain site doesn't necessarily imply a decrease in human-caused pollution. For instance, a windier or humid period may automatically decrease measured pollutant concentrations. To attribute changes to emissions, the weather has to be removed the signal first.",
          "I decided to use a Random Forest model to try to remove the effect of weather from our pollution time series. The model is trained to predict PM2.5 concentrations from time variables, which stand in for emissions, plus meteorology from ERA5. We then predicted each datapoint a thousand times over randomly resampled weather conditions and averaged the results, producing a 'deweathered' time series where a trend can reasonably be read as a change in what's being emitted."
        ]
      }
    ],
    gallery: []
  },

  /* ------------------------------ PROJECTS ------------------------------ */
  {
    id: "pacbot",
    kind: "project",
    title: "Pacbot — Autonomous Maze Robot",
    role: "Team Lead",
    org: "Princeton University Robotics Club",
    date: "September 2024 — Present",
    image: "images/pacbot.jpg",
    blurb:
      "A differential-drive robot that plays the game of PacMan in a physical maze. Implemented a noise-resistant power topology, motor drive system, gyroscope, and IR analog front-end on a custom 4-layer PCB.",
    tags: ["KiCad", "ESP32", "FreeRTOS", "PID control systems", "Analog design"],
    links: [],
    overview: [
      "Pacbot is a national competition in which teams build a robot that plays a physical game of Pac-Man in real time. I lead the hardware side of the team, from schematic capture to closed-loop software control on the finished board.",
      "The team placed 2nd in the 2025 National Pacbot Competition."
    ],
    details: [
      {
        heading: "Hardware",
        points: [
          "Designed the power topology, motor-drive circuitry, IR transceiver analog front-end, and KiCad PCB layout for a differential-drive maze robot.",
          "The differential-drive design achieved roughly 4x the PID update frequency and 2x the robot velocity of the previous omniwheel design.",
          "Debugged PCB hardware with oscilloscopes and multimeters; diagnosed and resolved signal integrity and analog circuit issues across multiple board revisions."
        ]
      },
      {
        heading: "Firmware",
        points: [
          "Implemented low-level drivers for TCP/IP communication, encoders, and IMU odometry in ESP-IDF (ESP32/FreeRTOS).",
          "Implemented PID motor control, integrating IR sensor, encoder, and gyro feedback for real-time closed-loop navigation."
        ]
      }
    ],
    figuresHeading: "The robot",
    figures: [
      {
        src: "images/pacbot-1.jpg",
        alt:
          "The assembled Pacbot: a round purple PCB with wheels, IR emitter and receiver pairs around the rim, and a LiPo battery strapped on top",
        caption:
          "The assembled robot. The current iteration is a two-wheel differential drive car, small enough to fit in the palm of your hand.",
        text: [
          "The entire robot is integrated onto a single four-layer PCB. Its energy-efficient power architecture uses several DC-DC switching regulators and an LDO regulator to supply the required voltages to each component. The PCB incorporates separate analog and switching ground planes, which are meant to minimize electromagnetic interference and maintain low-impedance return paths.",
          "The robot dynamically detects wall proximity, turns, and intersections using IR emitter and receiver pairs around the rim, integrating the measurements into the PID control loop to maintain course. The wheel encoder measurements are combined with feedforward speed control to follow a software speed profiler."
        ]
      },
      {
        src: "images/pacbot-2.jpg",
        alt:
          "A plywood practice maze with the differential-drive robot at one end and two older octagonal omniwheel robots at the other",
        caption:
          "The practice maze, with this year's differential-drive robot at the top and the previous omniwheel generations parked at the bottom.",
        text: [
          "We built a small plywood maze (representing a quadrant of the PacMan maze) to test in. The tape marks are reference points that we used for basic PID tuning.",
          "The two octagonal robots at the bottom are the previous omniwheel design. Moving to differential drive cost the ability to strafe, and required more sophisticated odometry, but brought the advantages of a higher robot top speed."
        ]
      }
    ],
    gallery: []
  },
  {
    id: "ooo-processor",
    kind: "project",
    title: "Out-of-Order and Superscalar RISC-V Processors",
    role: "Academic Project",
    org: "Princeton University",
    date: "February 2026 — April 2026",
    image: "images/ooo-processor.jpg",
    imageFit: "contain",
    blurb:
      "Implemented multiple fully bypassed, pipelined RISC-V cores in Verilog. Implemented a dual-issue (two-lane) superscalar. Implemented modern processor features such a scoreboard, reorder buffer (for out-of-order execution), and pipelined multiply/divide unit.",
    tags: ["Verilog", "RISC-V", "Microarchitecture", "Verification", "Waveform Debugging"],
    links: [],
    overview: [
      "Implemented multiple fully bypassed, pipelined RISC-V cores in Verilog. Implemented a dual-issue (two-lane) superscalar. Implemented modern processor features such a scoreboard, reorder buffer (for out-of-order execution), and pipelined multiply/divide unit."
    ],
    details: [
      {
        heading: "Microarchitecture",
        points: [
          "Designed and implemented a fully bypassed, pipelined dual-issue RISC-V processor in Verilog, including datapath, control logic, and a pipelined multiplication/division unit.",
          "Implemented a scoreboard and reorder buffer to support out-of-order execution and dependency tracking.",
          "Implemented control logic for exclusive and inclusive cache hierarchies."
        ]
      },
      {
        heading: "Verification",
        points: [
          "Developed Verilog testbenches and assembly-level verification programs to validate processor correctness."
        ]
      }
    ],
    figuresHeading: "Inside the core",
    figures: [
      {
        src: "images/ooo-1.png",
        wide: true,
        alt:
          "GTKWave window showing processor and cache signals during a vvadd benchmark trace",
        caption:
          "Debugging our RTL in GTKWave.",
        text: [
          "Much of the time that was spent building these processors was spent reading waveforms. When a benchmark or regression test returned a wrong value, we had to pull up GTKWave to view the vcd waveform for the run. My strategy was usually walking backwards from a problematic signal to trace the origin of a deadlock or indeterminate value.",
          "Testbenches and hand-written assembly programs also helped to verify the correctness of each unit in isolation."
        ]
      },
      {
        src: "images/ooo-2.png",
        alt:
          "Hand-drawn scoreboard table with a row per destination register and columns for active, pipe, is_load, is_muldiv, and per-stage data availability",
        caption:
          "Scoreboard hardware structure: one row per architectural register, tracking where its value is and when it will be ready.",
        text: [
          "Modern processors implement instruction dependency tracking using a hardware data structure called a Scoreboard, helping instructions in the Decode/Issue stage to know when they can be issued and where they can bypass values from.",
          "In order to issue instructions while respecting read-after-write register dependencies and structural hazards, we must know, for every register, whether there is a pending instruction writing to it and where it it is along the pipe (for bypassing). Each row here marks whether the register has a pending write, which pipe (A or B) will produce it, whether that producer is a load or a long-latency multiply/divide, and the current pipeline stage that the instruction is in.",
          "Our scoreboard was integrated with our dual-issue superscalar processor. Our superscalar was capable of issuing two instructions at once, which required us to implement sophisticated instruction steering control in the Decode stage. Furthermore, with two lanes, we had to consider difficult edge cases such as when a branch is resolved in an execution stage, requiring us to squash the adjacent instruction and roll back scoreboard state."
        ]
      },
      {
        src: "images/ooo-3.png",
        wide: true,
        alt:
          "Block diagram of the memory hierarchy: core, split L1 instruction and data caches, a round-robin 2-to-1 arbiter, unified L2 and L3, and a memory adapter",
        caption:
          "Basic block diagram of the memory hierarchies that I implemented for my final project.",
        text: [
          "For my final project, I implemented the control logic for both an inclusive and exclusive cache hierarchy (complete with an L1 instruction/data cache, L2 cache, and L3 cache), integrating them with one of our processors.",
          "An exclusive hierarchy maintains the invariant that a cache line lives in at most one level of the hierarchy at any given time.",
          "An inclusive hierarchy maintains the invariant that a cache line that lives in one cache must exist in all downstream caches (e.g. a line in L1 must also exist in L2 and L3).",
          "I quickly realized the complexity of the control logic for these hierarchies: they require strict invariants about the cache dimensions, victim handling, and cache line invalidation. I had to design multiple small FSM controllers in order to handle the logic for all of the different situations (e.g. an downstream request may or not carry a victim, it may or may not request a line to be sent back upstream, the victim may or may not be dirty, etc..)."
        ]
      },
      {
        src: "images/ooo-4.png",
        wide: true,
        alt:
          "Grouped bar chart of cycle counts for exclusive versus inclusive cache configurations across four benchmarks",
        caption:
          "Exclusive vs. inclusive performance across four benchmarks.",
        text: [
          "With both an inclusive and exclusive cache hierarchy implemented, I compared the performance of both configurations when running on different benchmark programs. Exclusive came out slightly ahead on most benchmarks, likely because it is able to hold more distinct lines for the same total capacity.",
        ]
      }
    ],
    gallery: []
  },
  {
    id: "rtl-processor-fpga",
    kind: "project",
    title: "16-bit RTL Processor on FPGA",
    role: "Academic Project",
    org: "Princeton University",
    date: "December 2025",
    image: "images/rtl-processor.jpg",
    blurb:
      "A 16-bit stored-program processor with a 20-instruction ISA, written in Verilog and synthesized onto a Xilinx FPGA with Vivado.",
    tags: ["Verilog", "FPGA", "Vivado", "ISA design"],
    links: [],
    overview: [
      "A 16-bit stored-program processor with a 20-instruction ISA, written in Verilog and synthesized onto a Xilinx FPGA with Vivado."
    ],

    figuresHeading: "Design",
    figures: [
      {
        src: "images/punc-3.jpg",
        tall: true,
        alt:
          "Hand-drawn datapath for PUnC: program counter, instruction register, 8x16 register file, ALU, 2^16 x 16 memory, sign extender, and N/Z/P condition registers, with every control signal labelled at the left edge",
        caption:
          "The datapath: every mux, register, and control signal in the processor.",
        text: [
          "The datapath for the machine includes a program counter, an instruction register, an 8×16 register file, an ALU, and memory, tied together by muxes that decide where each value comes from and is routed to. The N, Z, and P registers on the right latch the sign of the last instruction's result so that a subsequent branch knows whether or not to be taken.",
        ]
      },
      {
        src: "images/punc-2.jpg",
        wide: true,
        alt:
          "Spreadsheet mapping every control signal to every FSM state, with a selection-bit mapping table beneath it",
        caption:
          "The control table: we have one column per FSM state, one row per control signal, and a 1 wherever that signal should be asserted as HIGH.",
        text: [
          "Control is a finite state machine that walks from INIT to Fetch to Decode and then into a state per instruction, with multi-cycle instructions like LDI and STI split across numbered states. This table represents the control signals for each state, representing exactly which signals go high.",
        ]
      }
    ],
    gallery: []
  }
];
