import type { KnowledgeBase, KnowledgeEntry } from "./types";

/**
 * Baber's portfolio knowledge base.
 * Add new projects, skills, or links here — the assistant logic stays unchanged.
 */
export const knowledge: KnowledgeBase = {
  about: {
    name: "Sheharyar",
    fullName: "Sheharyar",
    title: "Mobile Application Developer",
    tagline: "Cross-Platform · React Native · Flutter · AI · 3+ Years",
    introduction:
      "Sheharyar is a results-driven Mobile Application Developer with over three years of experience building cross-platform mobile applications with React Native and Flutter. He has delivered production software across fintech, healthcare, ride-hailing, logistics, e-commerce, facilities management, retail POS, AI surveillance, and enterprise platforms. From Karachi, Pakistan, Sheharyar leads teams, designs scalable architectures, integrates third-party services, and ships App Store and Play Store products from concept to deployment.",
    heroSummary:
      "Mobile Application Developer with 3+ years of experience. Specialized in React Native and Flutter — delivering 10+ commercial apps, App Store & Play Store releases, multi-brand POS systems, and AI surveillance deployed for real venues and brands.",
    yearsExperience: 3,
    location: "Karachi, Pakistan",
  },

  experience: [
    // {
    //   id: "exp-team-lead",
    //   title: "Team Lead - Mobile Applications",
    //   company: "VirtueXolutions",
    //   startDate: "Dec 2023",
    //   endDate: "Present",
    //   description:
    //     "Leads React Native and full-product engineering teams across multiple client projects, owning architecture, planning, code reviews, and deployments.",
    //   highlights: [
    //     "Owns project architecture, development planning, code reviews and deployments",
    //     "Coordinates directly with stakeholders and clients for successful delivery",
    //     "Mentors developers and establishes team-wide development standards",
    //   ],
    // },
    {
      id: "exp-senior-rn",
      title: "React Native Developer",
      company: "VirtueXolutions",
      startDate: "Jan 2024",
      endDate: "Present",
      description:
        "Developed and deployed multiple production-grade mobile applications with end-to-end architecture ownership.",
      highlights: [
        "Designed system workflows and end-to-end application architecture",
        "Integrated payment gateways, chat systems, streaming and mapping solutions",
      ],
    },
    {
      id: "exp-software-engineer-intern",
      title: "Software Engineer Intern",
      company: "SUPARCO",
      startDate: "July 2023",
      endDate: "Oct 2023",
      description:
        "Built Weh App for GIS Data Management and Visualization.",
      highlights: [
        "Integrated WebGis Library and PHP for Backend",
      ],
    },
    // {
    //   id: "exp-associate",
    //   title: "Associate Developer",
    //   company: "SAS Solution",
    //   startDate: "Nov 2020",
    //   endDate: "Feb 2022",
    //   description:
    //     "Progressed from intern to a professional mobile development role, contributing to hybrid mobile application development and maintenance.",
    //   highlights: [
    //     "Contributed to hybrid mobile application development and maintenance",
    //   ],
    // },
  ],

  skills: {
    primary: [
      "React Native",
      "TypeScript",
      "JavaScript",
      "React.js",
      "Flutter",
      "Node js",
      "Redux Toolkit",
      "Firebase",
      "REST APIs",
      "AI / Computer Vision",
    ],
    secondary: [
      "Google Maps",
      "Agora",
      "CometChat",
      "Payment Gateways",
      "Electron",
      "Tailwind CSS",
      "Framer Motion",
    ],
    tools: [
      "Git / GitHub",
      "Android Studio",
      "Xcode",
      "Agile Development",
      "Vercel",
    ],
  },

  projects: [
    {
      id: "proj-daweeye",
      name: "Daweeye",
      summary: "Multilingual healthcare and hospital management platform.",
      description:
        "A multilingual healthcare and hospital management platform designed for clinical workflows, patient coordination, and hospital operations.",
      categories: ["mobile", "healthcare", "enterprise"],
      technologies: ["React Native", "Firebase", "REST APIs", "TypeScript"],
      featured: false,
      highlights: [
        "Multilingual healthcare workflows",
        "Hospital management features",
      ],
    },
    {
      id: "proj-ridelynk",
      name: "RideLynk",
      summary: "Ride-hailing platform with real-time tracking and payments.",
      description:
        "RideLink makes everyday travel simple and convenient with easy ride booking, smart location search, secure payments, and real-time updates in one seamless app — published on the Google Play Store.",
      categories: ["mobile", "ride-sharing", "fintech"],
      technologies: [
        "React Native",
        "Google Maps",
        "Firebase",
        "Payment Gateways",
        "REST APIs",
      ],
      featured: true,
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.ridelinkUser",
      imageUrls: [
        "/assets/screenshots/Ridelynk/01.webp",
        "/assets/screenshots/Ridelynk/02.webp",
        "/assets/screenshots/Ridelynk/03.webp",
        "/assets/screenshots/Ridelynk/04.webp",
        "/assets/screenshots/Ridelynk/05.webp",
      ],
      highlights: [
        "Real-time ride tracking",
        "Payments integration",
        "User and rider apps on Play Store",
      ],
    },
    {
      id: "proj-ridelynk-rider",
      name: "RideLynk Rider",
      summary: "Driver-side ride-hailing application for RideLynk.",
      description:
        "RideLink Rider is a smart driver app that helps riders accept trips, manage bookings, track earnings, and provide safe, reliable transportation with ease — available on the Google Play Store.",
      categories: ["mobile", "ride-sharing"],
      technologies: ["React Native", "Google Maps", "Firebase", "REST APIs"],
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.ridelink_rider",
      imageUrls: [
        "/assets/screenshots/RidelynkRider/01.webp",
        "/assets/screenshots/RidelynkRider/02.webp",
        "/assets/screenshots/RidelynkRider/03.webp",
        "/assets/screenshots/RidelynkRider/04.webp",
        "/assets/screenshots/RidelynkRider/05.webp",
      ],
      highlights: [
        "Trip accept & booking management",
        "Earnings tracking for drivers",
      ],
    },
    {
      id: "proj-lookclean",
      name: "LookClean",
      summary:
        "Beauty & grooming booking + e-commerce app — live on Play Store & App Store.",
      description:
        "LookClean makes beauty and grooming appointments simple and convenient. Book trusted barbers, nail artists, and beauty professionals for home services or salon visits, schedule individual or group bookings, and enjoy a seamless experience — all in one app, published on both the Google Play Store and the Apple App Store.",
      categories: ["mobile", "ecommerce"],
      technologies: ["React Native", "Firebase", "Payment Gateways", "REST APIs"],
      featured: true,
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.lookclean",
      appStoreUrl: "https://apps.apple.com/ca/app/look-clean/id6504813666",
      imageUrls: [
        "/assets/screenshots/Lookclean/01.webp",
        "/assets/screenshots/Lookclean/02.webp",
        "/assets/screenshots/Lookclean/03.webp",
        "/assets/screenshots/Lookclean/04.webp",
        "/assets/screenshots/Lookclean/05.webp",
        "/assets/screenshots/Lookclean/06.webp",
      ],
      highlights: [
        "Barber, nail & beauty booking flows",
        "Home service & salon visit scheduling",
        "Live on iOS App Store and Google Play",
      ],
    },
    {
      id: "proj-facilitate",
      name: "Facilitate",
      summary:
        "Facilities management app for work orders — live on App Store & Play Store.",
      description:
        "Facilitate is a facilities management mobile app that lets managers review work orders, enter new requests, and view locations from anywhere. It is live on the Apple App Store and Google Play Store (Pedro Facilit / com.pedrofacilit8).",
      categories: ["mobile", "enterprise"],
      technologies: ["React Native", "Firebase", "REST APIs"],
      featured: true,
      playStoreUrl:
        "https://play.google.com/store/apps/details?id=com.pedrofacilit8",
      appStoreUrl: "https://apps.apple.com/sa/app/facilitate/id1494731927",
      highlights: [
        "Work order management",
        "Secure facilities workflows",
        "Live on App Store and Play Store",
      ],
    },
    {
      id: "proj-mbn",
      name: "MBN App",
      summary: "Modern mobile shopping app for browsing, cart & checkout.",
      description:
        "MBNApp is a modern mobile shopping app that makes everyday buying simple and convenient. Browse products, discover categories, save favorites, manage your cart, and complete secure purchases with ease. It offers account management, order tracking, and fast checkout anytime, anywhere.",
      categories: ["mobile", "ecommerce"],
      technologies: ["React Native", "Firebase", "Payment Gateways", "REST APIs"],
      featured: true,
      imageUrls: [
        "/assets/screenshots/MBN/01.webp",
        "/assets/screenshots/MBN/02.webp",
        "/assets/screenshots/MBN/03.webp",
        "/assets/screenshots/MBN/04.webp",
        "/assets/screenshots/MBN/05.webp",
        "/assets/screenshots/MBN/06.webp",
      ],
      highlights: [
        "Product browsing & category discovery",
        "Cart, checkout & order tracking",
        "Account management and fast secure purchases",
      ],
    },
    {
      id: "proj-qbid",
      name: "QBid",
      summary: "Marketplace connecting service seekers with trusted providers.",
      description:
        "QBid is a mobile platform designed to connect people who need help with trusted professionals and service providers. Users can create requests, browse available offers, communicate directly, and complete transactions in a simple and secure experience — making hiring, negotiating, and managing services easier, faster, and more transparent for both customers and service providers.",
      categories: ["mobile", "enterprise"],
      technologies: ["React Native", "Firebase", "REST APIs"],
      featured: true,
      imageUrls: [
        "/assets/screenshots/Qbid/01.webp",
        "/assets/screenshots/Qbid/02.webp",
        "/assets/screenshots/Qbid/03.webp",
        "/assets/screenshots/Qbid/04.webp",
        "/assets/screenshots/Qbid/05.webp",
        "/assets/screenshots/Qbid/06.webp",
      ],
      highlights: [
        "Service request creation & offer browsing",
        "Direct in-app communication",
        "Secure hiring and transaction flows",
      ],
    },
    {
      id: "proj-youarehere",
      name: "YouAreHere",
      summary: "Smart travel companion for discovering and planning trips.",
      description:
        "YouAreHere is a smart travel companion that helps you discover exciting places, save your favorite locations, and plan memorable trips with ease. Whether exploring a new city or organizing the next getaway, YouAreHere makes travel more convenient, inspiring, and enjoyable.",
      categories: ["mobile", "social"],
      technologies: ["React Native", "Google Maps", "Firebase", "REST APIs"],
      imageUrls: [
        "/assets/screenshots/YouAreHere/01.webp",
        "/assets/screenshots/YouAreHere/02.webp",
        "/assets/screenshots/YouAreHere/03.webp",
        "/assets/screenshots/YouAreHere/04.webp",
        "/assets/screenshots/YouAreHere/05.webp",
        "/assets/screenshots/YouAreHere/06.webp",
      ],
      highlights: [
        "Place discovery & favorites",
        "Trip planning tools",
      ],
    },
    {
      id: "proj-disc-music",
      name: "Disc Music",
      summary: "Music streaming app for songs, artists, albums & playlists.",
      description:
        "Discover a world of music with Disc Music. Stream your favorite songs, explore trending artists, albums, and playlists, and enjoy a seamless, high-quality listening experience — at home, at work, or on the go.",
      categories: ["mobile", "social"],
      technologies: ["React Native", "Firebase", "REST APIs"],
      imageUrls: [
        "/assets/screenshots/dicsmusic/01.webp",
        "/assets/screenshots/dicsmusic/02.webp",
        "/assets/screenshots/dicsmusic/03.webp",
        "/assets/screenshots/dicsmusic/04.webp",
        "/assets/screenshots/dicsmusic/05.webp",
      ],
      highlights: [
        "Streaming for songs, artists & albums",
        "Playlist discovery",
      ],
    },
    {
      id: "proj-load-navigator",
      name: "LoadNavigator",
      summary:
        "Logistics & trucking app for loads, routes, permits and payments.",
      description:
        "LoadNavigator is a smart mobile solution designed for the transportation and logistics industry. It helps drivers, carriers, and operators manage loads, routes, payments, and essential documents in one place — with load posting, route planning, permit scanning, job tracking, and profile management, making trucking and freight operations more convenient, faster, and transparent.",
      categories: ["mobile", "logistics"],
      technologies: ["React Native", "Google Maps", "Firebase", "REST APIs"],
      featured: true,
      imageUrls: [
        "/assets/screenshots/loadNavigator/01.webp",
        "/assets/screenshots/loadNavigator/02.webp",
        "/assets/screenshots/loadNavigator/03.webp",
        "/assets/screenshots/loadNavigator/04.webp",
        "/assets/screenshots/loadNavigator/05.webp",
        "/assets/screenshots/loadNavigator/06.webp",
      ],
      highlights: [
        "Load posting & route planning",
        "Permit scanning and document management",
        "Job tracking for drivers & carriers",
      ],
    },
    // {
    //   id: "proj-hatchsocial",
    //   name: "HatchSocial",
    //   summary: "Social network with chat and live streaming features.",
    //   description:
    //     "A social networking platform featuring chat and live streaming capabilities.",
    //   categories: ["mobile", "social"],
    //   technologies: ["React Native", "Agora", "Pusher", "Firebase", "Google Pay"],
    //   imageUrls: [
    //     "/assets/screenshots/hatchsocial/01.webp",
    //     "/assets/screenshots/hatchsocial/02.webp",
    //     "/assets/screenshots/hatchsocial/03.webp",
    //     "/assets/screenshots/hatchsocial/04.webp",
    //     "/assets/screenshots/hatchsocial/05.webp",
    //     "/assets/screenshots/hatchsocial/06.webp",
    //     "/assets/screenshots/hatchsocial/07.webp",
    //     "/assets/screenshots/hatchsocial/08.webp",
    //     "/assets/screenshots/hatchsocial/09.webp",
    //     "/assets/screenshots/hatchsocial/10.webp",
    //     "/assets/screenshots/hatchsocial/11.webp",
    //     "/assets/screenshots/hatchsocial/12.webp",
    //   ],
    //   highlights: ["Chat", "Live streaming"],
    // },
    {
      id: "proj-menocrysis",
      name: "MenoCrysis",
      summary: "Guided wellness app for onboarding, tracking, and support.",
      description:
        "A wellness app focused on onboarding, health assessment, plan selection, and ongoing symptom, cycle, and activity tracking.",
      categories: ["mobile", "healthcare", "enterprise"],
      technologies: ["React Native", "Firebase", "REST APIs", "TypeScript"],
      imageUrls: [
        "/assets/screenshots/menocrysis/01.webp",
        "/assets/screenshots/menocrysis/02.webp",
        "/assets/screenshots/menocrysis/03.webp",
        // "/assets/screenshots/menocrysis/04.webp",
        "/assets/screenshots/menocrysis/05.webp",
        "/assets/screenshots/menocrysis/07.webp",
        "/assets/screenshots/menocrysis/08.webp",
        "/assets/screenshots/menocrysis/09.webp",
        // "/assets/screenshots/menocrysis/10.webp",
        "/assets/screenshots/menocrysis/11.webp",
        // "/assets/screenshots/menocrysis/12.webp",
        "/assets/screenshots/menocrysis/13.webp",
        // "/assets/screenshots/menocrysis/14.webp",
        "/assets/screenshots/menocrysis/15.webp",
        "/assets/screenshots/menocrysis/16.webp",
        "/assets/screenshots/menocrysis/17.webp",
        // "/assets/screenshots/menocrysis/18.webp",
        "/assets/screenshots/menocrysis/19.webp",
        // "/assets/screenshots/menocrysis/20.webp",
        // "/assets/screenshots/menocrysis/21.webp",
        "/assets/screenshots/menocrysis/22.webp",
        // "/assets/screenshots/menocrysis/23.webp",
      ],
      highlights: [
        "Onboarding and health assessment flow",
        "Symptom, cycle, and activity tracking",
        "Wellness support and education",
      ],
    },
    {
      id: "proj-indoor",
      name: "Indoor Positioning App",
      summary: "BLE-based indoor navigation for Dubai malls.",
      description:
        "A BLE-based indoor navigation solution designed for mall environments in Dubai.",
      categories: ["mobile", "enterprise"],
      technologies: ["React Native", "BLE", "Maps"],
      highlights: ["Indoor BLE navigation", "Dubai mall deployments"],
    },
    {
      id: "proj-endorse",
      name: "EndorseMe",
      summary: "US-based freelance marketplace platform.",
      description:
        "A US-based freelance marketplace platform connecting talent with opportunities.",
      categories: ["mobile", "enterprise", "fintech"],
      technologies: ["React Native", "REST APIs", "Firebase"],
    },
    {
      id: "proj-fleetex",
      name: "FleetEx Logistics",
      summary:
        "Premium international freight & supply chain website for a Pakistan-based logistics firm.",
      description:
        "A polished marketing and company website for FleetEx Logistics, covering air, ocean, and road freight services with global network messaging.",
      categories: ["web", "logistics", "enterprise"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      featured: true,
      liveUrl: "https://www.fleetexlogistics.com/",
      imageUrls: [
        "/assets/screenshots/fleetexlogistics/01.webp",
        "/assets/screenshots/fleetexlogistics/02.webp",
        "/assets/screenshots/fleetexlogistics/03.webp",
        "/assets/screenshots/fleetexlogistics/04.webp",
      ],
      highlights: [
        "International freight positioning",
        "Services, industries, and global network sections",
      ],
    },
    {
      id: "proj-rel",
      name: "Rapid Express Logistics",
      summary:
        "Pakistan's gateway to global logistics — domestic and international shipping website.",
      description:
        "A full marketing website for Rapid Express Logistics covering domestic shipping, international freight, warehousing, and e-commerce fulfillment.",
      categories: ["web", "logistics", "enterprise"],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      featured: true,
      liveUrl: "https://www.rapidexpresslogistic.com/",
      imageUrls: [
        "/assets/screenshots/rapidexpresslogistics/01.webp",
        "/assets/screenshots/rapidexpresslogistics/02.webp",
        "/assets/screenshots/rapidexpresslogistics/03.webp",
        "/assets/screenshots/rapidexpresslogistics/04.webp",
        "/assets/screenshots/rapidexpresslogistics/05.webp",
      ],
      highlights: [
        "Domestic & international logistics messaging",
        "Shipment tracking entry points",
      ],
    },
    {
      id: "proj-rel-portal",
      name: "Rapid Express Logistics Portal",
      summary: "Client logistics portal for tracking and shipment management.",
      description:
        "A client-facing logistics portal for Rapid Express Logistics with login and shipment visibility.",
      categories: ["web", "logistics", "enterprise"],
      technologies: ["Next.js", "TypeScript", "REST APIs"],
      liveUrl: "https://www.rapidexpresslogistic.com/portal/login",
      imageUrls: [
        "/assets/screenshots/rapidPortal/01.webp",
        "/assets/screenshots/rapidPortal/02.webp",
        "/assets/screenshots/rapidPortal/03.webp",
        "/assets/screenshots/rapidPortal/04.webp",
        "/assets/screenshots/rapidPortal/05.webp",
        "/assets/screenshots/rapidPortal/06.webp",
      ],
    },
    {
      id: "proj-pos",
      name: "Order Intel POS",
      summary:
        "POS for retail brands — Costa Coffee, Broadway & California; Electron desktop EXE planned.",
      description:
        "Order Intel POS is an Angular-based point-of-sale frontend built for retail order intelligence. It is designed for multi-brand rollout including Costa Coffee, Broadway, and California, with a planned Electron wrapper for native Windows EXE deployment. A live demo is available online.",
      categories: ["web", "pos", "enterprise"],
      technologies: ["Angular", "TypeScript", "Electron", "REST APIs"],
      featured: true,
      liveUrl: "https://pos-frontend-rdsr.vercel.app/pos",
      imageUrls: [
        "/assets/screenshots/POS/01.webp",
        "/assets/screenshots/POS/02.webp",
        "/assets/screenshots/POS/03.webp",
        "/assets/screenshots/POS/04.webp",
        "/assets/screenshots/POS/05.webp",
        "/assets/screenshots/POS/06.webp",
        "/assets/screenshots/POS/07.webp",
        "/assets/screenshots/POS/08.webp",
      ],
      highlights: [
        "Built with Angular for Electron desktop packaging",
        "Target brands: Costa Coffee, Broadway, California",
        "POS workflows and order intelligence UI",
      ],
    },
    {
      id: "proj-ai-surveillance",
      name: "AI Surveillance System",
      summary: "AI surveillance live at California and Broadway venues.",
      description:
        "An AI-powered surveillance system with intelligent video monitoring and detection workflows. It is currently implemented at California and Broadway locations. Demo footage is available in the portfolio.",
      categories: ["ai", "mobile", "enterprise"],
      technologies: ["React Native", "AI / Computer Vision", "REST APIs"],
      featured: true,
      videoUrl: "/assets/ai-surveillance-demo.mp4",
      highlights: [
        "Currently implemented at California and Broadway",
        "AI-assisted surveillance and monitoring",
        "Enterprise venue deployment",
      ],
    },
  ],

  technologies: [
    "React Native",
    "TypeScript",
    "JavaScript",
    "React.js",
    "Next.js",
    "Angular",
    "Electron",
    "Redux Toolkit",
    "Firebase",
    "REST APIs",
    "AI / Computer Vision",
    "Google Maps",
    "Agora",
    "CometChat",
    "Payment Gateways",
    "Tailwind CSS",
    "Framer Motion",
    "Git / GitHub",
    "Android Studio",
    "Xcode",
    "BLE",
  ],

  industries: [
    "Healthcare",
    "Logistics & Freight",
    "Fintech",
    "Ride-hailing",
    "E-commerce",
    "Social Networking",
    "AI Surveillance",
    "Retail / POS",
    "Food & Beverage (Costa Coffee)",
    "Hospitality / Venue Ops",
    "Enterprise Software",
    "Facilities Management",
  ],

  education: [
    {
      degree: "BS Computer Science",
      institution: "Bahria University, Karachi Campus",
      location: "Karachi, Pakistan",
      details: "CGPA: 3.2",
    },
  ],

  achievements: [
    "3+ years of professional mobile development experience",
    "Proven team leadership as Mobile Applications Team Lead",
    "Multiple commercial apps published on Google Play Store and Apple App Store",
    "Delivered software across fintech, healthcare, logistics, e-commerce and social platforms",
    "Built POS for multi-brand retail (Costa Coffee, Broadway, California) with Electron roadmap",
    "AI surveillance currently implemented at California and Broadway",
    "LookClean and Facilitate live on both App Store and Play Store",
  ],

  liveApps: [
    {
      id: "live-fleetex",
      name: "FleetEx Logistics",
      type: "website",
      url: "https://www.fleetexlogistics.com/",
      description: "International freight & supply chain company website.",
    },
    {
      id: "live-rel",
      name: "Rapid Express Logistics",
      type: "website",
      url: "https://www.rapidexpresslogistic.com/",
      description: "Domestic and international logistics company website.",
    },
    {
      id: "live-rel-portal",
      name: "REL Client Portal",
      type: "portal",
      url: "https://www.rapidexpresslogistic.com/portal/login",
      description: "Logistics client portal login and tracking experience.",
    },
    {
      id: "live-pos",
      name: "Order Intel POS",
      type: "pos",
      url: "https://pos-frontend-rdsr.vercel.app/pos",
      description:
        "POS demo — Costa Coffee, Broadway & California rollout; Electron EXE planned.",
    },
  ],

  playStoreApps: [
    {
      id: "ps-facilitate",
      name: "Facilitate",
      platform: "play_store",
      url: "https://play.google.com/store/apps/details?id=com.pedrofacilit8",
      packageId: "com.pedrofacilit8",
      description: "Facilities / work-order management app (Pedro Facilit).",
    },
    {
      id: "ps-ridelink-user",
      name: "RideLynk User",
      platform: "play_store",
      url: "https://play.google.com/store/apps/details?id=com.ridelinkUser",
      packageId: "com.ridelinkUser",
      description: "Ride-hailing user application.",
    },
    {
      id: "ps-ridelink-rider",
      name: "RideLynk Rider",
      platform: "play_store",
      url: "https://play.google.com/store/apps/details?id=com.ridelink_rider",
      packageId: "com.ridelink_rider",
      description: "Ride-hailing rider/driver application.",
    },
    {
      id: "ps-lookclean",
      name: "LookClean",
      platform: "play_store",
      url: "https://play.google.com/store/apps/details?id=com.lookclean",
      packageId: "com.lookclean",
      description: "Barber booking and e-commerce app.",
    },
  ],

  appStoreApps: [
    {
      id: "as-lookclean",
      name: "LookClean",
      platform: "app_store",
      url: "https://apps.apple.com/ca/app/look-clean/id6504813666",
      description: "Barber booking and e-commerce app on the Apple App Store.",
    },
    {
      id: "as-facilitate",
      name: "Facilitate",
      platform: "app_store",
      url: "https://apps.apple.com/sa/app/facilitate/id1494731927",
      description:
        "Facilities management / work-order app by NEST International on the App Store.",
    },
  ],

  certificates: [],

  resume: {
    path: "/assets/Sheharyar-Resume.pdf",
    fileName: "Sheharyar-Resume.pdf",
  },

  availability: {
    status: "Available for select opportunities",
    message:
      "Sheharyar is open to discussing high-impact mobile, cross-platform, and full-stack product engagements — especially enterprise, logistics, healthcare, and AI-adjacent builds.",
  },

  services: [
    {
      id: "svc-rn",
      title: "React Native App Development",
      description:
        "End-to-end cross-platform mobile apps for iOS and Android with production-ready architecture.",
    },
    {
      id: "svc-enterprise",
      title: "Enterprise Software",
      description:
        "Enterprise-grade mobile and web systems for logistics, healthcare, management, and operations.",
    },
    {
      id: "svc-web",
      title: "Next.js Web Applications",
      description:
        "Modern marketing sites, portals, and operational web apps for logistics and enterprise brands.",
    },
    {
      id: "svc-angular",
      title: "Angular + Electron POS",
      description:
        "Angular point-of-sale systems with Electron packaging for desktop EXE — multi-brand retail deployments.",
    },
    {
      id: "svc-ai",
      title: "AI Surveillance Systems",
      description:
        "Intelligent monitoring and computer-vision assisted surveillance for venue and enterprise deployments.",
    },
    {
      id: "svc-leadership",
      title: "Team Leadership & Architecture",
      description:
        "Technical leadership, code reviews, architecture design, and mentoring for mobile and product teams.",
    },
  ],

  contact: {
    email: "sheharyar1456@gmail.com",
    phone: "03110287289",
    location: "Karachi, Pakistan",
    whatsapp: "+923292297354",
  },

  social: {
    github: "https://github.com/shehharyar28",
    linkedin: "https://www.linkedin.com/in/sheharyar-2ba7b9352/",
    portfolio: "https://portfolio-devurl2.vercel.app/",
  },

  faqs: [
    {
      id: "faq-who",
      question: "Who is Sheharyar?",
      answer:
        "Sheharyar is a Mobile Application Developer based in Karachi, Pakistan, with over three years of experience building React Native and Flutter apps for healthcare, logistics, ride-hailing, e-commerce, retail POS, and enterprise products.",
      aliases: ["who are you", "about sheharyar", "introduce sheharyar"],
    },
    {
      id: "faq-rn",
      question: "Has Sheharyar worked on React Native?",
      answer:
        "Yes. Sheharyar has built production React Native apps for ride-hailing, healthcare, logistics, shopping, and POS workflows, including RideLynk, LookClean, Facilitate, MBN App, QBid, and LoadNavigator.",
      aliases: ["react native", "rn experience", "react-native"],
    },
    {
      id: "faq-apps-count",
      question: "How many apps has he published?",
      answer:
        "Sheharyar has contributed to 10+ commercial applications and multiple live releases, including RideLynk, LookClean, Facilitate, MBN App, QBid, and LoadNavigator across App Store and Play Store listings.",
      aliases: ["how many apps", "published apps", "play store apps", "app store"],
    },
    {
      id: "faq-pos",
      question: "Can Sheharyar build POS software?",
      answer:
        "Yes. He built Order Intel POS in Angular for multi-brand retail rollout across Costa Coffee, Broadway, and California, with a planned Electron-based desktop path for Windows deployment.",
      aliases: ["pos", "point of sale", "point-of-sale", "costa", "electron"],
    },
    {
      id: "faq-angular",
      question: "Has Sheharyar worked on Angular?",
      answer:
        "Yes. Sheharyar has Angular experience through the Order Intel POS frontend, which was designed for retail order intelligence and multi-brand deployments.",
      aliases: ["angular", "ng", "has sheharyar worked on angular"],
    },
    {
      id: "faq-backend",
      question: "Can Sheharyar build scalable backend systems?",
      answer:
        "Yes. He regularly designs end-to-end product architectures and integrates REST APIs, Firebase, authentication, notifications, payments, chat, and mapping services for mobile and enterprise applications.",
      aliases: ["backend", "scalable backend", "fastapi", "api"],
    },
  ],

  entries: [],
};

/** Build searchable entries from structured knowledge — call once at module load. */
function buildEntries(kb: KnowledgeBase): KnowledgeEntry[] {
  const entries: KnowledgeEntry[] = [];

  entries.push({
    id: "about",
    category: "about",
    title: "About Sheharyar",
    content: kb.about.introduction,
    keywords: [
      "who",
      "about",
      "introduction",
      "profile",
      "sheharyar",
      "developer",
      "mobile developer",
      "team lead",
    ],
    aliases: ["who is sheharyar", "tell me about sheharyar", "personal introduction"],
    priority: 10,
    actions: [
      { type: "scroll_contact", label: "Contact Sheharyar", targetId: "contact" },
      { type: "download_resume", label: "Download Resume" },
    ],
  });

  entries.push({
    id: "experience",
    category: "experience",
    title: "Professional Experience",
    content: kb.experience
      .map(
        (e) =>
          `${e.title} at ${e.company} (${e.startDate} – ${e.endDate}): ${e.description}`,
      )
      .join(" "),
    keywords: [
      "experience",
      "work",
      "career",
      "job",
      "virtuexolutions",
      "suparco",
      // "team lead",
      "react native developer",
    ],
    aliases: ["work history", "professional experience", "where did he work"],
    priority: 9,
    actions: [{ type: "download_resume", label: "Download Resume" }],
  });

  entries.push({
    id: "skills",
    category: "skills",
    title: "Skills & Technologies",
    content: `Sheharyar's core skills include ${kb.skills.primary.join(", ")}. He also works with ${kb.skills.secondary.join(", ")}. Tools: ${kb.skills.tools.join(", ")}.`,
    keywords: [
      "skills",
      "technologies",
      "tech stack",
      "stack",
      "know",
      "expertise",
    ],
    aliases: ["what technologies", "tech stack", "what does he know"],
    technologies: [...kb.skills.primary, ...kb.skills.secondary],
    priority: 9,
    actions: [
      { type: "scroll_projects", label: "View Projects", targetId: "projects" },
    ],
  });

  entries.push({
    id: "react-native",
    category: "technologies",
    title: "React Native Experience",
    content:
      "Yes. Sheharyar has built production React Native apps across healthcare, logistics, ride-hailing, e-commerce, retail POS, and enterprise platforms, including RideLynk, LookClean, Facilitate, MBN App, QBid, and LoadNavigator.",
    keywords: [
      "react native",
      "rn",
      "mobile apps",
      "mobile development",
      "cross platform",
      "cross-platform",
      "ios",
      "android",
    ],
    aliases: [
      "react native",
      "rn",
      "mobile apps",
      "mobile development",
      "has sheharyar worked on react native",
    ],
    technologies: [
      "React Native",
      "Redux Toolkit",
      "Firebase",
      "REST APIs",
      "TypeScript",
    ],
    projectIds: [
      "proj-daweeye",
      "proj-ridelynk",
      "proj-ridelynk-rider",
      "proj-lookclean",
      "proj-mbn",
      "proj-qbid",
      "proj-youarehere",
      "proj-disc-music",
      "proj-load-navigator",
      "proj-hatchsocial",
      "proj-ai-surveillance",
    ],
    priority: 12,
    actions: [
      { type: "scroll_mobile", label: "View Mobile Apps", targetId: "mobile" },
      { type: "download_resume", label: "Download Resume" },
    ],
  });

  entries.push({
    id: "flutter",
    category: "technologies",
    title: "Flutter",
    content:
      "Sheharyar also works with Flutter and has used it alongside React Native for cross-platform app delivery, with a focus on polished mobile experiences and production-ready architecture.",
    keywords: ["flutter", "dart"],
    aliases: ["flutter", "dart apps"],
    priority: 4,
  });

  entries.push({
    id: "nextjs",
    category: "technologies",
    title: "Next.js Experience",
    content:
      "Yes. Sheharyar builds modern web applications with Next.js and TypeScript. Live examples include FleetEx Logistics, Rapid Express Logistics, and the REL client portal.",
    keywords: ["nextjs", "next.js", "next", "react", "web", "website"],
    aliases: ["next js", "nextjs", "does sheharyar know next.js"],
    technologies: ["Next.js", "TypeScript", "React", "Tailwind CSS"],
    projectIds: ["proj-fleetex", "proj-rel", "proj-rel-portal"],
    priority: 11,
    actions: [
      { type: "scroll_web", label: "View Web Apps", targetId: "web" },
    ],
  });

  entries.push({
    id: "angular",
    category: "technologies",
    title: "Angular Experience",
    content:
      "Yes. Sheharyar has professional Angular experience. He built Order Intel POS in Angular for multi-brand retail deployments targeting Costa Coffee, Broadway, and California.",
    keywords: [
      "angular",
      "ng",
      "electron",
      "costa",
      "costa coffee",
      "broadway",
      "california",
      "exe",
      "desktop",
    ],
    aliases: [
      "angular",
      "has sheharyar worked on angular",
      "electron",
      "costa coffee",
    ],
    technologies: ["Angular", "TypeScript", "Electron", "REST APIs"],
    projectIds: ["proj-pos"],
    priority: 12,
    actions: [
      {
        type: "open_external",
        label: "Open POS Demo",
        href: "https://pos-frontend-rdsr.vercel.app/pos",
      },
      { type: "scroll_web", label: "View Web Apps", targetId: "web" },
    ],
  });

  entries.push({
    id: "fastapi",
    category: "technologies",
    title: "FastAPI",
    content:
      "Sheharyar regularly integrates REST APIs and designs end-to-end product architectures, though specific FastAPI project details are not highlighted in the public portfolio.",
    keywords: ["fastapi", "fast api", "python backend"],
    aliases: ["fastapi", "has sheharyar worked with fastapi"],
    priority: 5,
  });

  entries.push({
    id: "ai",
    category: "ai",
    title: "AI Projects",
    content:
      "Yes. Sheharyar has worked on AI-driven surveillance systems, with deployments at California and Broadway venues and a portfolio demo highlighting intelligent monitoring capabilities.",
    keywords: [
      "ai",
      "artificial intelligence",
      "surveillance",
      "computer vision",
      "ml",
      "machine learning",
      "california",
      "broadway",
    ],
    aliases: [
      "ai projects",
      "has sheharyar worked on ai",
      "ai surveillance",
      "california",
      "broadway",
    ],
    technologies: ["React Native", "AI / Computer Vision", "REST APIs"],
    projectIds: ["proj-ai-surveillance"],
    priority: 12,
    actions: [
      { type: "scroll_ai", label: "Open AI Section", targetId: "ai" },
      {
        type: "highlight_ai",
        label: "Highlight AI Projects",
        targetId: "ai",
      },
    ],
  });

  entries.push({
    id: "healthcare",
    category: "industries",
    title: "Healthcare Experience",
    content:
      "Sheharyar has built multilingual healthcare and hospital management software, including Daweeye — a platform designed for clinical workflows and hospital operations.",
    keywords: [
      "healthcare",
      "health",
      "hospital",
      "medical",
      "daweeye",
      "clinical",
    ],
    aliases: ["healthcare projects", "show healthcare", "hospital"],
    technologies: ["React Native", "Firebase", "REST APIs", "TypeScript"],
    projectIds: ["proj-daweeye"],
    priority: 11,
    actions: [
      {
        type: "scroll_healthcare",
        label: "View Healthcare Projects",
        targetId: "healthcare",
      },
      {
        type: "highlight_healthcare",
        label: "Highlight Healthcare",
        targetId: "healthcare",
      },
    ],
  });

  entries.push({
    id: "logistics",
    category: "industries",
    title: "Logistics Experience",
    content:
      "Sheharyar has delivered live logistics products including FleetEx Logistics, Rapid Express Logistics, and the REL client portal — covering international freight, domestic shipping, and operational portals for Pakistan-based logistics companies — plus LoadNavigator, a mobile app for trucking, load posting, and route planning.",
    keywords: [
      "logistics",
      "freight",
      "shipping",
      "supply chain",
      "fleetex",
      "rapid express",
      "courier",
      "loadnavigator",
      "load navigator",
      "trucking",
    ],
    aliases: ["logistics experience", "show logistics", "freight"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs"],
    projectIds: ["proj-fleetex", "proj-rel", "proj-rel-portal", "proj-load-navigator"],
    priority: 12,
    actions: [
      {
        type: "scroll_logistics",
        label: "View Logistics Projects",
        targetId: "logistics",
      },
      {
        type: "highlight_logistics",
        label: "Highlight Logistics",
        targetId: "logistics",
      },
    ],
  });

  entries.push({
    id: "pos",
    category: "projects",
    title: "POS Software",
    content:
      "Yes. Sheharyar can build POS software. Order Intel POS is built with Angular for multi-brand retail — Costa Coffee, Broadway, and California — and is designed to support Electron-based desktop deployment for Windows.",
    keywords: [
      "pos",
      "point of sale",
      "point-of-sale",
      "retail",
      "order intel",
      "cashier",
      "costa",
      "costa coffee",
      "broadway",
      "california",
      "electron",
      "exe",
    ],
    aliases: [
      "can sheharyar build pos",
      "pos software",
      "point of sale",
      "costa coffee",
      "electron pos",
    ],
    technologies: ["Angular", "TypeScript", "Electron", "REST APIs"],
    projectIds: ["proj-pos"],
    priority: 12,
    actions: [
      {
        type: "open_external",
        label: "Open POS Demo",
        href: "https://pos-frontend-rdsr.vercel.app/pos",
      },
      { type: "scroll_web", label: "View Web Apps", targetId: "web" },
    ],
  });

  entries.push({
    id: "enterprise",
    category: "services",
    title: "Enterprise Software",
    content:
      "Yes. Sheharyar builds enterprise software for logistics, healthcare, AI surveillance, management systems, ride-sharing platforms, and operational tools such as POS and client portals.",
    keywords: [
      "enterprise",
      "scalable",
      "management systems",
      "business software",
    ],
    aliases: ["can sheharyar build enterprise", "enterprise software"],
    projectIds: [
      "proj-daweeye",
      "proj-fleetex",
      "proj-rel",
      "proj-pos",
      "proj-ai-surveillance",
    ],
    priority: 10,
    actions: [
      { type: "scroll_projects", label: "View Projects", targetId: "projects" },
    ],
  });

  entries.push({
    id: "mobile-apps",
    category: "projects",
    title: "Mobile Applications",
    content:
      "Sheharyar specializes in mobile applications. Published and delivered work includes RideLynk (user & rider), LookClean, Facilitate, MBN App, QBid, YouAreHere, Disc Music, LoadNavigator, Daweeye, and an indoor positioning app for Dubai malls — plus AI surveillance deployed at California and Broadway.",
    keywords: [
      "mobile",
      "apps",
      "mobile apps",
      "mobile applications",
      "android",
      "ios",
      "play store",
      "app store",
    ],
    aliases: ["show mobile apps", "mobile applications", "phone apps"],
    technologies: ["React Native", "TypeScript", "Firebase", "REST APIs"],
    projectIds: [
      "proj-ridelynk",
      "proj-ridelynk-rider",
      "proj-lookclean",
      "proj-facilitate",
      "proj-mbn",
      "proj-qbid",
      "proj-youarehere",
      "proj-disc-music",
      "proj-load-navigator",
      "proj-daweeye",
      "proj-hatchsocial",
    ],
    priority: 11,
    actions: [
      { type: "scroll_mobile", label: "View Mobile Apps", targetId: "mobile" },
      {
        type: "open_external",
        label: "LookClean on App Store",
        href: "https://apps.apple.com/ca/app/look-clean/id6504813666",
      },
    ],
  });

  entries.push({
    id: "web-apps",
    category: "projects",
    title: "Web Applications",
    content:
      "Sheharyar has built live web applications including FleetEx Logistics and Rapid Express Logistics (Next.js), the REL client portal, and Order Intel POS (Angular) for Costa Coffee, Broadway, and California retail brands.",
    keywords: ["web", "website", "web apps", "web applications", "portal"],
    aliases: ["show web applications", "websites", "web projects"],
    technologies: ["Next.js", "Angular", "TypeScript", "Tailwind CSS"],
    projectIds: ["proj-fleetex", "proj-rel", "proj-rel-portal", "proj-pos"],
    priority: 11,
    actions: [
      { type: "scroll_web", label: "View Web Apps", targetId: "web" },
    ],
  });

  entries.push({
    id: "published-apps",
    category: "achievements",
    title: "Published Apps Count",
    content:
      "Sheharyar has contributed to 10+ commercial applications with multiple live releases, including RideLynk, LookClean, Facilitate, MBN App, QBid, YouAreHere, Disc Music, and LoadNavigator across the App Store and Google Play Store.",
    keywords: [
      "how many",
      "published",
      "count",
      "number of apps",
      "play store",
      "app store",
    ],
    aliases: ["how many apps", "apps published", "play store count", "app store apps"],
    projectIds: [
      "proj-ridelynk",
      "proj-ridelynk-rider",
      "proj-lookclean",
      "proj-facilitate",
      "proj-mbn",
      "proj-qbid",
      "proj-youarehere",
      "proj-disc-music",
      "proj-load-navigator",
    ],
    priority: 11,
    actions: [
      { type: "scroll_mobile", label: "View Mobile Apps", targetId: "mobile" },
      { type: "download_resume", label: "Download Resume" },
    ],
  });

  entries.push({
    id: "education",
    category: "education",
    title: "Education",
    content: `Sheharyar holds a ${kb.education[0].degree} from ${kb.education[0].institution}${kb.education[0].details ? ` (${kb.education[0].details})` : ""}.`,
    keywords: ["education", "degree", "university", "bahria", "studied"],
    aliases: ["where did he study", "education background"],
    priority: 7,
  });

  entries.push({
    id: "services",
    category: "services",
    title: "Services",
    content: `Sheharyar provides: ${kb.services.map((s) => s.title).join("; ")}. ${kb.services.map((s) => s.description).join(" ")}`,
    keywords: ["services", "offer", "hire", "provide", "what can he do"],
    aliases: ["what services", "services offered", "hire sheharyar"],
    priority: 9,
    actions: [
      { type: "scroll_contact", label: "Contact Sheharyar", targetId: "contact" },
    ],
  });

  entries.push({
    id: "contact",
    category: "contact",
    title: "Contact",
    content: `Visitors can reach Sheharyar at ${kb.contact.email} or ${kb.contact.phone}. He is based in ${kb.contact.location}.`,
    keywords: [
      "contact",
      "email",
      "phone",
      "reach",
      "hire",
      "whatsapp",
      "message",
    ],
    aliases: ["where can i contact", "contact sheharyar", "get in touch"],
    priority: 12,
    actions: [
      { type: "scroll_contact", label: "Open Contact", targetId: "contact" },
      {
        type: "open_external",
        label: "Send Email",
        href: `mailto:${kb.contact.email}`,
      },
    ],
  });

  entries.push({
    id: "resume",
    category: "resume",
    title: "Resume / CV",
    content:
      "Sheharyar's professional resume is available for download. It covers his experience as a mobile developer, React Native and Flutter specialist, UI/UX-focused builder, and contributor to commercial projects across healthcare, logistics, retail, and enterprise domains.",
    keywords: ["resume", "cv", "download", "curriculum"],
    aliases: ["download resume", "download cv", "get resume"],
    priority: 12,
    actions: [{ type: "download_resume", label: "Download Resume" }],
  });

  entries.push({
    id: "github",
    category: "social",
    title: "GitHub",
    content: `Sheharyar's GitHub profile is available at ${kb.social.github}.`,
    keywords: ["github", "git", "code", "repositories", "repos"],
    aliases: ["open github", "github profile"],
    priority: 11,
    actions: [
      {
        type: "open_github",
        label: "Open GitHub",
        href: kb.social.github,
      },
    ],
  });

  entries.push({
    id: "linkedin",
    category: "social",
    title: "LinkedIn",
    content: `Sheharyar's LinkedIn profile is available at ${kb.social.linkedin}.`,
    keywords: ["linkedin", "linked in", "professional profile"],
    aliases: ["open linkedin", "linkedin profile"],
    priority: 11,
    actions: [
      {
        type: "open_linkedin",
        label: "Open LinkedIn",
        href: kb.social.linkedin,
      },
    ],
  });

  entries.push({
    id: "availability",
    category: "availability",
    title: "Availability",
    content: `${kb.availability.status}. ${kb.availability.message}`,
    keywords: ["available", "availability", "hire", "open to work", "freelance"],
    aliases: ["is sheharyar available", "availability"],
    priority: 8,
    actions: [
      { type: "scroll_contact", label: "Contact Sheharyar", targetId: "contact" },
    ],
  });

  entries.push({
    id: "industries",
    category: "industries",
    title: "Industries",
    content: `Sheharyar has worked across these industries: ${kb.industries.join(", ")}.`,
    keywords: ["industries", "domains", "sectors", "verticals"],
    aliases: ["what industries", "which domains"],
    priority: 8,
    actions: [
      { type: "scroll_projects", label: "View Projects", targetId: "projects" },
    ],
  });

  entries.push({
    id: "live-apps",
    category: "live",
    title: "Live Applications",
    content: `Live applications include: ${kb.liveApps.map((a) => `${a.name} (${a.url})`).join("; ")}.`,
    keywords: ["live", "demo", "deployed", "production urls", "websites live"],
    aliases: ["live apps", "live websites", "demos"],
    projectIds: ["proj-fleetex", "proj-rel", "proj-rel-portal", "proj-pos"],
    priority: 10,
    actions: [
      { type: "scroll_web", label: "View Web Apps", targetId: "web" },
    ],
  });

  // Per-project entries for granular retrieval
  for (const project of kb.projects) {
    entries.push({
      id: `project-${project.id}`,
      category: "projects",
      title: project.name,
      content: `${project.name}: ${project.description} ${project.highlights?.join(". ") ?? ""}`,
      keywords: [
        project.name.toLowerCase(),
        ...project.categories,
        ...project.technologies.map((t) => t.toLowerCase()),
      ],
      aliases: [project.name.toLowerCase()],
      technologies: project.technologies,
      projectIds: [project.id],
      priority: project.featured ? 9 : 7,
      actions: [
        ...(project.liveUrl
          ? [
              {
                type: "open_external" as const,
                label: `Open ${project.name}`,
                href: project.liveUrl,
              },
            ]
          : []),
        ...(project.playStoreUrl
          ? [
              {
                type: "open_external" as const,
                label: "Open on Play Store",
                href: project.playStoreUrl,
              },
            ]
          : []),
        ...(project.appStoreUrl
          ? [
              {
                type: "open_external" as const,
                label: "Open on App Store",
                href: project.appStoreUrl,
              },
            ]
          : []),
        ...(project.videoUrl
          ? [
              {
                type: "scroll_ai" as const,
                label: "Watch Demo",
                targetId: "ai",
              },
            ]
          : []),
      ],
    });
  }

  for (const faq of kb.faqs) {
    entries.push({
      id: faq.id,
      category: "faq",
      title: faq.question,
      content: faq.answer,
      keywords: faq.question.toLowerCase().split(/\s+/),
      aliases: faq.aliases,
      priority: 8,
    });
  }

  return entries;
}

knowledge.entries = buildEntries(knowledge);

export const SUGGESTED_QUESTIONS = [
  "React Native",
  "Angular",
  "Next.js",
  "AI Projects",
  "Healthcare",
  "Logistics",
  "Mobile Apps",
  "POS",
  "FastAPI",
  "Contact",
  "Download CV",
] as const;

export const WELCOME_MESSAGE = `Hello 👋

I'm Baber's Portfolio Assistant.

You can ask me anything about Baber's experience, projects, skills, technologies or services.

Try asking:
• Has Baber worked on React Native?
• Show AI Projects
• Can Baber build POS software?
• How many apps has he published?`;
