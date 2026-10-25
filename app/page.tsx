"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "./portfolio-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EchoPortfolio() {
  const [loading, setLoading] = useState(false);
  const [activeService, setActiveService] = useState<string>("1");
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);
  const [ribbonOffset, setRibbonOffset] = useState(0);

  // Refs for GSAP animations
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const aboutPortalRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);

  const experienceSectionRef = useRef<HTMLDivElement>(null);
  const experienceTrackRef = useRef<HTMLDivElement>(null);
  const experienceWatermarkRef = useRef<HTMLDivElement>(null);

  const worksSectionRef = useRef<HTMLDivElement>(null);
  const [worksProgress, setWorksProgress] = useState(0);

  // 1. Preloader Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // 2. GSAP ScrollTrigger Animations
  useEffect(() => {
    if (loading) return;

    const ctx = gsap.context(() => {
      // A. "ABOUT ME" Scroll-Zoom Portal
      if (aboutSectionRef.current && aboutPortalRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 0.8,
          },
        });

        tl.to(
          aboutPortalRef.current,
          {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            ease: "power2.inOut",
          },
          0
        ).fromTo(
          aboutContentRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.45
        );
      }

      // B. "WHERE I'VE BEEN" Horizontal Scroll Section
      if (experienceSectionRef.current && experienceTrackRef.current) {
        const totalScroll =
          experienceTrackRef.current.scrollWidth - window.innerWidth;

        gsap.to(experienceTrackRef.current, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: experienceSectionRef.current,
            start: "top top",
            end: () => `+=${totalScroll}`,
            pin: true,
            scrub: 1,
          },
        });

        if (experienceWatermarkRef.current) {
          gsap.to(experienceWatermarkRef.current, {
            x: -350,
            ease: "none",
            scrollTrigger: {
              trigger: experienceSectionRef.current,
              start: "top top",
              end: () => `+=${totalScroll}`,
              scrub: 1.2,
            },
          });
        }
      }

      // C. 3D Ring to Vertical Rolodex Stack
      if (worksSectionRef.current) {
        const worksCount = PORTFOLIO_DATA.works26.length;
        ScrollTrigger.create({
          trigger: worksSectionRef.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.6,
          onUpdate: (self) => {
            setWorksProgress(self.progress);
            if (self.progress > 0.35 && worksCount > 0) {
              const stackProg = (self.progress - 0.35) / 0.65;
              const idx = Math.min(
                worksCount - 1,
                Math.floor(stackProg * worksCount)
              );
              setActiveWorkIndex(idx);
            } else {
              setActiveWorkIndex(0);
            }
          },
        });
      }
    });

    return () => ctx.revert();
  }, [loading]);

  // Continuous gentle motion for Wavy Ribbon Slider
  useEffect(() => {
    let raf: number;
    const animateRibbon = () => {
      setRibbonOffset((prev) => prev + 0.008);
      raf = requestAnimationFrame(animateRibbon);
    };
    raf = requestAnimationFrame(animateRibbon);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Generate organic wavy circle path for Preloader
  const wavyCirclePath = React.useMemo(() => {
    const points = 120;
    const baseRadius = 115;
    let d = "";
    for (let i = 0; i <= points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const wave = Math.sin(angle * 8) * 6 + Math.cos(angle * 5) * 4;
      const r = baseRadius + wave;
      const x = 150 + r * Math.cos(angle);
      const y = 150 + r * Math.sin(angle);
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    }
    return d + " Z";
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F4F0] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#F4F4F0]">
      {/* =========================================================
          1. PRELOADER / INTRO OVERLAY
      ========================================================= */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] text-[#F4F4F0]"
          >
            <div className="relative flex items-center justify-center w-[300px] h-[300px]">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full -rotate-90 overflow-visible"
              >
                <motion.path
                  d={wavyCirclePath}
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="1.8"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2.1, ease: "easeInOut" }}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,255,255,0.6))",
                  }}
                />
              </svg>
              <motion.h1
                initial={{ opacity: 0, letterSpacing: "0.3em" }}
                animate={{ opacity: 1, letterSpacing: "0.18em" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute text-3xl md:text-4xl font-black tracking-[0.18em] text-white text-center px-4 uppercase"
              >
                {PORTFOLIO_DATA.brand.name}
                <span className="text-white/70">{PORTFOLIO_DATA.brand.dot}</span>
              </motion.h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          2. HERO SECTION
      ========================================================= */}
      <section
        id="home"
        className="relative min-h-screen w-full bg-[#F4F4F0] flex flex-col justify-between px-6 md:px-12 pt-6 pb-10 overflow-hidden"
      >
        {/* Top Navbar */}
        <header className="relative z-20 flex items-center justify-between border-b border-black/10 pb-4">
          <a
            href="#home"
            className="text-lg font-black tracking-tighter flex items-center gap-1 uppercase"
          >
            {PORTFOLIO_DATA.brand.name}
            <span className="text-xs">{PORTFOLIO_DATA.brand.dot}</span>
          </a>

          <nav className="hidden md:flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.16em] text-black/70">
            <a href="#home" className="text-black font-bold">
              HOME
            </a>
            <a href="#about" className="hover:text-black transition">
              ABOUT
            </a>
            <a href="#experience" className="hover:text-black transition">
              EXPERIENCE
            </a>
            <a href="#projects" className="hover:text-black transition">
              PROJECTS
            </a>
            <a href="#works" className="hover:text-black transition">
              CASE STUDIES
            </a>
            <a href="#services" className="hover:text-black transition">
              SERVICES
            </a>
          </nav>

          <a
            href="#contact"
            className="px-4 py-1.5 rounded-full bg-[#0A0A0A] text-[#F4F4F0] text-[10px] font-semibold uppercase tracking-[0.18em] hover:bg-black/80 transition"
          >
            LET&apos;S TALK
          </a>
        </header>

        {/* Centerpiece Typography & Portrait */}
        <div className="relative my-auto flex flex-col items-center justify-center py-6">
          <h1 className="select-none text-center font-black uppercase leading-[0.92] tracking-[-0.035em] text-[#0A0A0A] text-[10vw] md:text-[8vw]">
            {PORTFOLIO_DATA.hero.titleLine1}
            <br />
            {PORTFOLIO_DATA.hero.titleLine2}
          </h1>

          {/* Portrait positioned cleanly below the headline with zero overlap */}
          <div className="relative mt-6 md:mt-8 w-[200px] sm:w-[260px] md:w-[310px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 rounded-3xl bg-black/[0.04] border border-black/10 scale-105" />
            <img
              src="/hero-portrait.png"
              alt={PORTFOLIO_DATA.brand.name}
              className="relative z-10 w-full h-full object-contain rounded-2xl drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] select-none"
            />
          </div>
        </div>

        {/* Bottom Corner Micro-Copy */}
        <div className="relative z-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-6 text-[10px] uppercase tracking-[0.18em] text-black/75">
          <div className="font-semibold">{PORTFOLIO_DATA.hero.roleLabel}</div>

          <div className="flex flex-col md:items-end text-left md:text-right gap-4">
            <p className="max-w-[320px] leading-relaxed text-black/65">
              {PORTFOLIO_DATA.hero.bio}
            </p>
            <ul className="flex flex-col md:items-end gap-1 font-bold text-[#0A0A0A]">
              {PORTFOLIO_DATA.hero.focusAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. "ABOUT ME" SCROLL-ZOOM SECTION
      ========================================================= */}
      <section
        id="about"
        ref={aboutSectionRef}
        className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#E5E5E0]"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <svg
            viewBox="0 0 1440 900"
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full object-cover opacity-90"
          >
            <defs>
              <pattern
                id="engravingLines"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(25)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="12"
                  stroke="#1a1a1a"
                  strokeWidth="1.2"
                />
              </pattern>
            </defs>
            <rect width="1440" height="900" fill="#DCDCD6" />
            <rect width="1440" height="900" fill="url(#engravingLines)" opacity="0.35" />

            {[
              { cx: 250, cy: 180, r: 95 },
              { cx: 680, cy: 150, r: 130 },
              { cx: 1120, cy: 210, r: 110 },
              { cx: 920, cy: 360, r: 85 },
              { cx: 430, cy: 340, r: 75 },
            ].map((swirl, idx) => (
              <g key={idx} opacity="0.55">
                {[1, 0.8, 0.6, 0.4, 0.25].map((scale, sIdx) => (
                  <circle
                    key={sIdx}
                    cx={swirl.cx}
                    cy={swirl.cy}
                    r={swirl.r * scale}
                    fill="none"
                    stroke="#141414"
                    strokeWidth={sIdx % 2 === 0 ? "3" : "1.5"}
                    strokeDasharray="18 8 6 8"
                  />
                ))}
              </g>
            ))}

            <path
              d="M0,260 Q360,120 720,260 T1440,220 M0,310 Q360,170 720,310 T1440,270 M0,360 Q360,220 720,360 T1440,320"
              fill="none"
              stroke="#141414"
              strokeWidth="2.5"
              strokeDasharray="14 6"
              opacity="0.5"
            />

            <path
              d="M0,900 L0,640 L45,640 L60,510 L75,640 L110,640 L135,380 L160,640 L185,640 L205,450 L225,640 L260,640 L285,310 L315,640 L355,640 L375,520 L395,640 L460,720 L1440,780 L1440,900 Z"
              fill="#0A0A0A"
            />
          </svg>
        </div>

        {/* Split Heading */}
        <div className="pointer-events-none absolute z-10 flex items-center justify-center w-full px-8">
          <h2 className="text-[11vw] md:text-[8.5vw] font-black uppercase tracking-tighter text-[#F4F4F0] mix-blend-difference select-none">
            {PORTFOLIO_DATA.about.heading}
          </h2>
        </div>

        {/* Center Expanding Dark Portal */}
        <div
          ref={aboutPortalRef}
          className="relative z-20 w-[280px] h-[330px] md:w-[340px] md:h-[380px] bg-[#0A0A0A] text-[#F4F4F0] overflow-hidden flex flex-col justify-between p-6 md:p-12 shadow-2xl"
        >
          {/* Volumetric Light Beam */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 800 600" className="w-full h-full object-cover">
              <defs>
                <linearGradient id="lightBeam" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.16)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>
              <polygon
                points="550,-50 850,-50 380,650 140,650"
                fill="url(#lightBeam)"
              />
            </svg>
          </div>

          <div
            ref={aboutContentRef}
            className="relative z-10 w-full h-full flex flex-col justify-between"
          >
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/15 pb-4 text-[10px] md:text-xs uppercase tracking-[0.18em]">
              <span className="font-bold text-white max-w-xl">
                {PORTFOLIO_DATA.about.bannerTitle}
              </span>
              <span className="text-white/60">{PORTFOLIO_DATA.about.location}</span>
            </div>

            {/* Bottom Bar */}
            <div className="flex flex-col gap-6 pt-6 border-t border-white/15">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="space-y-3 max-w-xl">
                  <div className="flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    <span className="text-white font-bold">
                      {PORTFOLIO_DATA.about.disciplinesTag}
                    </span>
                    {PORTFOLIO_DATA.about.disciplines.map((d, i) => (
                      <React.Fragment key={d}>
                        <span>{d}</span>
                        {i < PORTFOLIO_DATA.about.disciplines.length - 1 && (
                          <span>•</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-white/75 leading-relaxed">
                    {PORTFOLIO_DATA.about.bio}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  {PORTFOLIO_DATA.about.buttons.map((btn) => (
                    <a
                      key={btn.label}
                      href={btn.href}
                      className={`px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] flex items-center gap-2 transition ${
                        btn.primary
                          ? "bg-white text-black hover:bg-white/90"
                          : "border border-white/30 text-white hover:bg-white/10"
                      }`}
                    >
                      {btn.primary && <Sparkles className="w-3.5 h-3.5" />}
                      {btn.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">
                PROFILE &amp; PHILOSOPHY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. "WHERE I'VE BEEN" HORIZONTAL SCROLL SECTION
      ========================================================= */}
      <section
        id="experience"
        ref={experienceSectionRef}
        className="relative h-screen w-full bg-[#0A0A0A] text-[#F4F4F0] overflow-hidden flex flex-col justify-between py-12"
      >
        <div className="px-6 md:px-12 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50 z-20">
          <span>CAREER TIMELINE</span>
          <span>{PORTFOLIO_DATA.experience.watermarkSub}</span>
        </div>

        {/* Background Watermark */}
        <div
          ref={experienceWatermarkRef}
          className="pointer-events-none select-none absolute inset-y-0 left-0 flex flex-col justify-center whitespace-nowrap z-0 opacity-[0.07]"
        >
          <div className="text-[19vw] font-black uppercase leading-[0.82] tracking-tighter">
            {PORTFOLIO_DATA.experience.watermarkTitle}
          </div>
          <div className="text-[16vw] font-black uppercase leading-[0.82] tracking-tighter">
            {PORTFOLIO_DATA.experience.watermarkSub}
          </div>
        </div>

        {/* Horizontal Scroll Track */}
        <div
          ref={experienceTrackRef}
          className="relative z-10 flex items-center h-full w-max px-6 md:px-16 gap-16 md:gap-28"
        >
          {/* Intro Card */}
          <div className="w-[85vw] md:w-[50vw] shrink-0 flex flex-col justify-center">
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 mb-4">
              {PORTFOLIO_DATA.experience.sectionSub}
            </span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight">
              {PORTFOLIO_DATA.experience.sectionTitle}
            </h2>
          </div>

          {/* Dynamic Experience Cards */}
          {PORTFOLIO_DATA.experience.cards.map((exp, idx) => (
            <div
              key={idx}
              className="w-[90vw] md:w-[68vw] shrink-0 flex flex-col justify-center border-l border-white/15 pl-8 md:pl-14"
            >
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/50 mb-3">
                <span>{exp.period}</span>
                <span>{exp.phase}</span>
              </div>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase leading-[0.95] tracking-tight mb-6 whitespace-pre-line">
                {exp.title}
              </h3>
              <p className="max-w-xl text-xs md:text-sm text-white/70 leading-relaxed mb-8">
                {exp.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-white/15 text-xs">
                {exp.highlights.map((item, hIdx) => (
                  <div key={hIdx}>
                    <h4 className="font-bold uppercase tracking-wider text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white/60 text-[11px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 md:px-12 flex items-center gap-4 text-[10px] uppercase tracking-[0.2em] text-white/50 z-20">
          <span className="px-3 py-1 rounded-full border border-white/20 text-white">
            TIMELINE
          </span>
          <span>FULL ARCHIVE</span>
        </div>
      </section>

      {/* =========================================================
          5. "FEATURED PROJECT" WAVY RIBBON SLIDER
      ========================================================= */}
      <section
        id="projects"
        className="relative min-h-screen w-full bg-[#F4F4F0] text-[#0A0A0A] py-20 px-6 md:px-12 flex flex-col justify-between overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-4xl font-light uppercase tracking-tight">
            FEATURED PROJECTS
          </h2>
          <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            HORIZONTAL WAVE
          </span>
        </div>

        {/* 3D Wavy Ribbon Track */}
        <div className="relative my-auto py-16 perspective-1500">
          <div className="flex items-center justify-center gap-6 md:gap-8 overflow-x-auto no-scrollbar py-10 px-4">
            {PORTFOLIO_DATA.landingProjects.map((project, idx) => {
              const phase = ribbonOffset + idx * 0.85;
              const waveY = Math.sin(phase) * 24;
              const rotateY = Math.cos(phase) * 16;
              const skewY = Math.cos(phase) * 5;

              return (
                <div
                  key={project.id}
                  style={{
                    transform: `translateY(${waveY}px) rotateY(${rotateY}deg) skewY(${skewY}deg)`,
                    transition: "transform 0.1s linear",
                  }}
                  className="group relative w-[290px] sm:w-[360px] md:w-[420px] shrink-0 flex flex-col items-center"
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-sm shadow-xl bg-[#0A0A0A] border border-black/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent p-6 flex flex-col justify-between text-white">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                        {project.id} / {project.category}
                      </span>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/75 mt-1">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 text-center">
                    <div className="text-xs font-semibold text-black/80">
                      {project.category}
                    </div>
                    <div className="text-[11px] text-black/50">
                      {project.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <h3 className="text-xl md:text-3xl font-light uppercase tracking-tight">
            SELECTED SHOWCASE
          </h3>
          <span className="text-[10px] uppercase tracking-[0.2em] text-black/50">
            01 — {String(PORTFOLIO_DATA.landingProjects.length).padStart(2, "0")} ARCHIVE
          </span>
        </div>
      </section>

      {/* =========================================================
          6. "CASE STUDIES" 3D RING TO VERTICAL ROLODEX STACK
      ========================================================= */}
      <section
        id="works"
        ref={worksSectionRef}
        className="relative h-screen w-full bg-[#F4F4F0] text-[#0A0A0A] overflow-hidden flex items-center justify-between px-6 md:px-12"
      >
        {/* Left Active Case Study Indicator */}
        <div
          style={{
            opacity: worksProgress > 0.32 ? 1 : 0,
            transform: `translateY(${worksProgress > 0.32 ? 0 : 20}px)`,
            transition: "all 0.4s ease",
          }}
          className="hidden md:flex flex-col z-20 w-1/4"
        >
          <span className="text-[10px] uppercase tracking-[0.22em] text-black/45 mb-1">
            SELECTED CASE STUDY
          </span>
          <h3 className="text-xl lg:text-2xl font-medium tracking-tight uppercase">
            {PORTFOLIO_DATA.works26[activeWorkIndex]?.name}
          </h3>
          <span className="text-xs text-black/60 mt-1 uppercase">
            ROLE: {PORTFOLIO_DATA.works26[activeWorkIndex]?.role}
          </span>
        </div>

        {/* Center 3D Viewport */}
        <div className="relative flex-1 h-full flex items-center justify-center perspective-1500">
          <div
            style={{
              opacity: Math.max(0, 1 - worksProgress * 2.5),
              transform: `scale(${1 - worksProgress * 0.3})`,
            }}
            className="pointer-events-none absolute z-10 text-center"
          >
            <h2 className="text-2xl md:text-3xl font-medium uppercase tracking-tight">
              CASE STUDIES
            </h2>
          </div>

          <div className="relative w-full h-full flex items-center justify-center preserve-3d">
            {PORTFOLIO_DATA.works26.map((work, i) => {
              const total = PORTFOLIO_DATA.works26.length;
              const ringAngle = (i / total) * Math.PI * 2 + worksProgress * Math.PI;
              const ringRadius = 240;
              const ringX = Math.cos(ringAngle) * ringRadius;
              const ringY = Math.sin(ringAngle) * ringRadius;
              const ringRotZ = (ringAngle * 180) / Math.PI + 90;

              const stackProgress = Math.max(0, Math.min(1, (worksProgress - 0.35) / 0.65));
              const activeFloat = stackProgress * (total - 1);
              const offsetFromActive = i - activeFloat;

              const stackY = offsetFromActive * 210;
              const stackZ = -Math.abs(offsetFromActive) * 110;
              const stackRotX = offsetFromActive * -18;

              const morph = Math.min(1, worksProgress / 0.35);
              const x = ringX * (1 - morph);
              const y = ringY * (1 - morph) + stackY * morph;
              const z = stackZ * morph;
              const rotZ = ringRotZ * (1 - morph);
              const rotX = stackRotX * morph;
              const scale = 0.58 * (1 - morph) + 1 * morph;

              return (
                <div
                  key={work.id}
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg) scale(${scale})`,
                    opacity:
                      morph < 1
                        ? 1
                        : Math.max(0.15, 1 - Math.abs(offsetFromActive) * 0.45),
                    zIndex: 20 - Math.round(Math.abs(offsetFromActive) * 5),
                  }}
                  className="absolute w-[300px] sm:w-[440px] md:w-[500px] aspect-[16/10] rounded-lg overflow-hidden shadow-2xl bg-white border border-black/10 flex flex-col justify-between"
                >
                  <img
                    src={work.image}
                    alt={work.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 p-6 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/75">
                      <span>{work.name}</span>
                      <span>{work.year}</span>
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold tracking-tight">
                        {work.headline}
                      </h4>
                      <p className="text-xs text-white/75 mt-1">{work.sub}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-black text-[10px] font-bold uppercase tracking-wider">
                        EXPLORE CASE STUDY <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sticky Metadata Index */}
        <div className="hidden md:flex flex-col items-end text-right z-20 w-1/4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3">
            ARCHIVE
          </span>
          <ul className="space-y-1.5 text-[11px] uppercase tracking-[0.14em]">
            {PORTFOLIO_DATA.works26.map((w, idx) => (
              <li
                key={w.id}
                className={`transition-colors ${
                  idx === activeWorkIndex
                    ? "text-black font-bold"
                    : "text-black/35"
                }`}
              >
                {w.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =========================================================
          7. "SERVICES" ACCORDION
      ========================================================= */}
      <section
        id="services"
        className="relative w-full bg-[#F4F4F0] text-[#0A0A0A] py-28 px-6 md:px-12 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-light uppercase tracking-tight text-center mb-14">
          SERVICES OFFERED
        </h2>

        <div className="w-full max-w-4xl flex flex-col gap-5">
          {PORTFOLIO_DATA.services.map((service) => {
            const isOpen = activeService === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onClick={() => setActiveService(service.id)}
                className={`cursor-pointer rounded-2xl transition-all duration-500 px-6 md:px-10 py-6 border ${
                  isOpen
                    ? "bg-[#0A0A0A] text-[#F4F4F0] border-[#0A0A0A] shadow-2xl scale-[1.01]"
                    : "bg-[#EFECE6] text-[#0A0A0A] border-black/15 hover:border-black/40"
                }`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                  <span className={isOpen ? "text-white/60" : "text-black/40"}>
                    {service.id}
                  </span>
                  <h3 className="text-sm md:text-base font-bold tracking-[0.15em]">
                    {service.title}
                  </h3>
                  <span className={isOpen ? "text-white/60" : "text-black/40"}>
                    •
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-6 text-xs md:text-sm text-white/80 max-w-2xl leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.18em] text-white/60">
                        <div className="flex flex-wrap gap-3">
                          {service.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                        <span className="text-white font-bold uppercase">
                          {PORTFOLIO_DATA.brand.name}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          8. FOOTER SECTION ("LET'S TALK")
      ========================================================= */}
      <footer id="contact" className="w-full bg-[#F4F4F0] pt-8 pb-6 px-3 md:px-6">
        {/* Availability Ticker Bar */}
        <div className="max-w-7xl mx-auto mb-4 flex items-center justify-between border border-black/25 bg-[#F4F4F0] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-10">
            <span>{PORTFOLIO_DATA.footer.tickerText}</span>
            <span>•</span>
            <span>{PORTFOLIO_DATA.footer.tickerText}</span>
          </div>
        </div>

        {/* Massive Dark Container */}
        <div className="w-full bg-[#0A0A0A] text-[#F4F4F0] rounded-sm px-6 md:px-12 py-16 md:py-24 flex flex-col justify-between items-center text-center">
          <h2 className="text-[16vw] md:text-[13vw] font-black uppercase leading-none tracking-tighter select-none">
            {PORTFOLIO_DATA.footer.headline}
          </h2>

          {/* Social Links */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {PORTFOLIO_DATA.footer.socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full border border-white/25 text-[10px] font-semibold uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition"
              >
                {social.name}
              </a>
            ))}
            <a
              href={`mailto:${PORTFOLIO_DATA.footer.email}`}
              className="px-6 py-2.5 rounded-full bg-[#F4F4F0] text-[#0A0A0A] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition"
            >
              GET IN TOUCH
            </a>
          </div>

          {/* Bottom Copyright */}
          <div className="w-full mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase tracking-[0.18em] text-white/45">
            <span>{PORTFOLIO_DATA.footer.copyright}</span>
            <span className="uppercase">
              DESIGNED &amp; DEVELOPED BY {PORTFOLIO_DATA.brand.name}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
