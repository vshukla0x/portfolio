export interface ProjectRibbon {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  image: string;
  link?: string;
}

export interface WorkCaseStudy {
  id: string;
  name: string;
  headline: string;
  sub: string;
  year: string;
  role: string;
  image: string;
  link?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ExperienceCard {
  phase: string;
  period: string;
  title: string;
  description: string;
  highlights: {
    title: string;
    description: string;
  }[];
}

export interface SocialLink {
  name: string;
  url: string;
}

export const PORTFOLIO_DATA = {
  // 1. Brand & Identity
  brand: {
    name: "VIVEK SHUKLA",
    dot: "●",
    tagline: "WEB DEV = CYBERSECURITY",
  },

  // 2. Hero Section
  hero: {
    titleLine1: "BUILDING FULL-STACK",
    titleLine2: "DIGITAL EXPERIENCES",
    roleLabel: "WEB DEV = CYBERSECURITY",
    bio: "Transitioning into full-stack development and cybersecurity, building high-performance web applications and secure digital systems.",
    focusAreas: [
      "WEB DEV = CYBERSECURITY",
      "FULL-STACK WEB",
      "SYSTEM DESIGN",
      "SECURE ARCHITECTURE",
    ],
  },

  // 3. About Me Section
  about: {
    heading: "ABOUT ME",
    bannerTitle: "MERGING FULL-STACK SOFTWARE DEVELOPMENT WITH A STRONG FOUNDATION IN SECURITY",
    location: "GORAKHPUR, UTTAR PRADESH, INDIA (AVAILABLE WORLDWIDE)",
    disciplinesTag: "CORE DISCIPLINES & SKILLS",
    disciplines: [
      "WEB DEV = CYBERSECURITY",
      "FULL-STACK DEVELOPMENT",
      "PROBLEM SOLVING",
      "COMPUTER HARDWARE",
    ],
    bio: "Student at Deen Dayal Upadhyaya (DDU) Gorakhpur University, actively developing scalable web apps like Fit Forge while expanding practical software engineering and cybersecurity skills.",
    buttons: [
      { label: "EXPLORE PROJECTS", href: "#projects", primary: true },
      { label: "MY EXPERIENCE", href: "#experience", primary: false },
    ],
  },

  // 4. Career Timeline & Experience
  experience: {
    sectionSub: "01 / TIMELINE & JOURNEY",
    sectionTitle: "WHERE I'VE BEEN",
    watermarkTitle: "FULL-STACK DEVELOPER",
    watermarkSub: "2024 — PRESENT",
    cards: [
      {
        phase: "PHASE 01",
        period: "2024 — PRESENT",
        title: "SOFTWARE &\nFULL-STACK DEV",
        description:
          "Actively engineering full-featured applications and participating in developer communities while pursuing higher education at DDU Gorakhpur University.",
        highlights: [
          {
            title: "APPLICATION DEVELOPMENT",
            description: "Engineered full-featured web solutions like Fit Forge for gym-goers.",
          },
          {
            title: "COMMUNITY & OPEN SOURCE",
            description: "Participated in technical events and hackathons like Hacktoberfest Hack Day at DDU.",
          },
          {
            title: "CONTINUOUS LEARNING",
            description: "Rapidly scaling up end-to-end web architecture and coding practices.",
          },
        ],
      },
      {
        phase: "PHASE 02",
        period: "ONGOING",
        title: "ASPIRING FULL-STACK\nSOFTWARE ENGINEER",
        description:
          "Focused on building production-ready applications, modern web tools, and secure system architectures.",
        highlights: [
          {
            title: "PROJECT BUILDING",
            description: "Shipping production-ready applications and developer tools on GitHub (vshukla0x).",
          },
          {
            title: "TECH STACK EXPANSION",
            description: "Mastering modern web frameworks, frontend interfaces, and backend logic.",
          },
          {
            title: "SECURE ARCHITECTURE",
            description: "Integrating cybersecurity awareness and resilient architecture into web systems.",
          },
        ],
      },
    ] as ExperienceCard[],
  },

  // 5. Featured Projects (Wavy Ribbon Slider)
  landingProjects: [
    {
      id: "01",
      title: "FIT FORGE",
      category: "Full-Stack Fitness Web App",
      subtitle: "A dedicated fitness app created to help gym-goers track workouts and manage fitness routines seamlessly.",
      image: "/fit-forge.png",
      link: "https://github.com/vshukla0x/fit-forge-",
    },
    {
      id: "02",
      title: "BETTER TECH",
      category: "OS & System Advisory",
      subtitle: "Interactive guide platform helping users choose the operating system tailored to their specific use case.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      link: "https://github.com/vshukla0x/better-tech-",
    },
    {
      id: "03",
      title: "CYBER SECURITY LABS",
      category: "Security & Defense",
      subtitle: "Hands-on penetration testing, system hardening, network security, and hardware diagnostics.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
      link: "https://github.com/vshukla0x",
    },
    {
      id: "04",
      title: "PORTFOLIO & WEB PRESENCE",
      category: "Interactive 3D Web",
      subtitle: "Modern high-performance web experience showcasing full-stack capabilities with GSAP and Framer Motion.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80",
      link: "https://vshukla0x.github.io",
    },
  ] as ProjectRibbon[],

  // 6. Case Studies (3D Ring & Vertical Rolodex Stack)
  works26: [
    {
      id: "01",
      name: "FIT FORGE",
      headline: "Dedicated Fitness Workout Tracker",
      sub: "Built for gym-goers to track sets, reps, and routines with an intuitive interface and responsive layout.",
      year: "2026",
      role: "Lead Full-Stack Developer",
      image: "/fit-forge.png",
      link: "https://github.com/vshukla0x/fit-forge-",
    },
    {
      id: "02",
      name: "BETTER TECH",
      headline: "Interactive OS Recommender",
      sub: "Helping developers and enthusiasts discover the perfect operating system matching their workflow needs.",
      year: "2026",
      role: "Creator & Developer",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80",
      link: "https://github.com/vshukla0x/better-tech-",
    },
    {
      id: "03",
      name: "SECURE APPS SUITE",
      headline: "Hardened Web Applications",
      sub: "Applying defensive security principles, safe data handling, and clean full-stack architecture.",
      year: "2025",
      role: "Security & Full-Stack",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80",
      link: "https://github.com/vshukla0x",
    },
  ] as WorkCaseStudy[],

  // 7. Services Offered
  services: [
    {
      id: "1",
      title: "FULL-STACK WEB DEVELOPMENT",
      description:
        "Building responsive, high-performance web applications using modern JavaScript/TypeScript, Python, and scalable frontend architectures.",
      tags: ["JAVASCRIPT", "PYTHON", "REACT", "NEXT.JS", "REST APIS"],
    },
    {
      id: "2",
      title: "CYBERSECURITY & APPLICATION DEFENSE",
      description:
        "Implementing security best practices, secure authentication, data integrity, vulnerability identification, and system hardening.",
      tags: ["CYBERSECURITY", "APP SECURITY", "LINUX", "HARDWARE SYSTEMS"],
    },
    {
      id: "3",
      title: "SYSTEM DESIGN & PROBLEM SOLVING",
      description:
        "Designing modular code structures, optimizing application speed, and engineering intuitive user experiences that solve real-world problems.",
      tags: ["PROBLEM SOLVING", "SYSTEM DESIGN", "PERFORMANCE", "CLEAN ARCHITECTURE"],
    },
  ] as ServiceItem[],

  // 8. Footer & Contact
  footer: {
    tickerText: "VIVEK SHUKLA • ASPIRING FULL-STACK DEVELOPER & CYBERSECURITY ENTHUSIAST • OPEN FOR COLLABORATION & NEW OPPORTUNITIES",
    headline: "LET'S TALK",
    email: "shuklavivek0x@gmail.com",
    socials: [
      { name: "GITHUB", url: "https://github.com/vshukla0x" },
      { name: "LINKEDIN", url: "https://linkedin.com/in/vshukla0x" },
      { name: "PORTFOLIO", url: "https://vshukla0x.github.io" },
    ] as SocialLink[],
    copyright: "VIVEK SHUKLA 2026 — ALL RIGHTS RESERVED",
  },
};
