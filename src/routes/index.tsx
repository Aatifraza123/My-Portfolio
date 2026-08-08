import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone, ArrowDown, ArrowRight, Check } from "lucide-react";

import projectBoa from "@/assets/boa-project.png";
import projectReturn from "@/assets/returnfilers-portfolio.png";
import projectElection from "@/assets/general-election.png";
import GridScan from "@/components/ui/GridScan";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";
import { Card } from "@/components/ui/card";

import { SkillPreviewVisual } from "@/components/portfolio/SkillPreviewVisuals";
import { PixelTransition } from "@/components/portfolio/PixelTransition";
import { GhostCursorEffect } from "@/components/portfolio/GhostCursorEffect";
import { useLenis } from "@/components/portfolio/use-lenis";
import { Text3DIntro } from "@/components/portfolio/Text3DIntro";
import { Navbar } from "@/components/ui/mini-navbar";
import {
  WordReveal,
  ScrollHighlightText,
  Magnetic,
  Counter,
  CursorFollower,
  ScrollProgress,
} from "@/components/portfolio/primitives";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

function PortfolioPage() {
  useLenis();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {showIntro && (
          <Text3DIntro onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>
      <main className="relative bg-background text-foreground">
        <ScrollProgress />
        <CursorFollower />
        <Nav />
        <Hero />
        <About />
        <Experience />
        <Skills />
        <PixelTransition mode="enter" />
        <Projects />
        <PixelTransition mode="exit" />
        <Process />
        <Achievements />
        <Marquee />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

/* ============================================================== NAV */

function Nav() {
  const navLinksData = [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Skills", href: "#skills" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  const logoElement = (
    <a href="#top" className="font-display text-sm md:text-base tracking-tight text-bone flex items-center gap-2">
      <div className="relative w-4 h-4 flex items-center justify-center">
        <span className="absolute w-1.5 h-1.5 rounded-full bg-electric top-0 left-1/2 transform -translate-x-1/2 opacity-90"></span>
        <span className="absolute w-1.5 h-1.5 rounded-full bg-electric left-0 top-1/2 transform -translate-y-1/2 opacity-90"></span>
        <span className="absolute w-1.5 h-1.5 rounded-full bg-electric right-0 top-1/2 transform -translate-y-1/2 opacity-90"></span>
        <span className="absolute w-1.5 h-1.5 rounded-full bg-electric bottom-0 left-1/2 transform -translate-x-1/2 opacity-90"></span>
      </div>
      <span>Aatif<span className="text-electric">.</span></span>
    </a>
  );

  const actionsElement = (
    <a
      href="#contact"
      className="relative group w-full sm:w-auto block"
    >
      <div className="absolute inset-0 -m-1 rounded-full hidden sm:block bg-electric opacity-40 filter blur-md pointer-events-none transition-all duration-300 ease-out group-hover:opacity-70 group-hover:blur-lg"></div>
      <button className="relative z-10 px-4 py-1.5 text-xs font-semibold text-black bg-gradient-to-r from-bone via-gray-100 to-electric rounded-full hover:brightness-110 transition-all duration-200 w-full sm:w-auto">
        Available for work
      </button>
    </a>
  );

  return (
    <Navbar
      logo={logoElement}
      links={navLinksData}
      actions={actionsElement}
    />
  );
}

/* ============================================================== HERO */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 30;
      const ny = (e.clientY / window.innerHeight - 0.5) * 30;
      mx.set(nx);
      my.set(ny);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20 z-[2]"
        fill="white"
      />
      <div className="absolute inset-0 z-0">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--ink)_85%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-16 md:pt-20 pb-10 md:px-12">
        <div className="flex items-start justify-between text-xs uppercase tracking-[0.25em] text-bone/50">
          <div>Portfolio ’26 / v.04</div>
          <div className="hidden md:block">New Delhi, India — GMT +5:30</div>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone/60">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-electric" />
              Full Stack Developer · MERN · Java · AI/ML
            </div>
            <h1 className="font-display text-[14vw] leading-[0.88] tracking-[-0.04em] text-bone md:text-[7.5vw]">
              <span className="block reveal-mask">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  Aatif
                </motion.span>
              </span>
              <span className="block reveal-mask">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block italic text-bone/70"
                >
                  Raza<span className="text-electric">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-8"
            >
              <p className="max-w-lg text-base leading-relaxed text-bone/70 md:text-lg">
                I turn ideas into scalable digital products — from requirement gathering to production deployment on Linux servers.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Magnetic
                  as="a"
                  href="#work"
                  className="group inline-flex items-center gap-3 rounded-full bg-bone px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-electric hover:text-ink"
                >
                  View Projects
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Magnetic>
                <Magnetic
                  as="a"
                  href="#contact"
                  className="inline-flex items-center gap-3 rounded-full border border-bone/20 px-6 py-3 text-sm font-medium text-bone transition-colors hover:border-bone"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </Magnetic>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative lg:col-span-6 h-[420px] sm:h-[520px] lg:h-[640px] w-full flex items-center justify-center bg-transparent"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full bg-transparent"
            />
          </motion.div>
        </div>

        <div className="mt-10 flex items-end justify-between">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone/50">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
            Scroll
          </div>
          <div className="hidden text-right font-mono text-[10px] uppercase tracking-[0.25em] text-bone/40 md:block">
            [ 001 ] · The Introduction
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ============================================================== ABOUT */

function About() {
  const stats = [
    { value: 2, suffix: "+", label: "Production Projects" },
    { value: 150, suffix: "+", label: "Users Served" },
    { value: 4.4, suffix: "L+", prefix: "₹", label: "Transactions", decimals: 1 },
    { value: 100, suffix: "+", label: "Active Users" },
  ];
  return (
    <section id="about" className="relative border-t border-border px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-bone/40">
          <span>[ 002 ] · About</span>
          <span className="hidden md:inline">A short introduction</span>
        </div>

        <WordReveal
          as="h2"
          className="font-display text-[9vw] leading-[0.95] tracking-[-0.03em] text-bone md:text-[6.5vw]"
        >
          Engineer by training,
        </WordReveal>
        <WordReveal
          as="h2"
          className="font-display text-[9vw] italic leading-[0.95] tracking-[-0.03em] text-bone/60 md:text-[6.5vw]"
          delay={0.15}
        >
          builder by obsession.
        </WordReveal>

        <div className="mt-20 grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-5 md:col-start-2">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">01 — Origin</div>
            <ScrollHighlightText className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              Trained as a Computer Science Engineer specialising in AI & ML, I write systems the way a director cuts film — deliberately, one scene at a time.
            </ScrollHighlightText>
          </div>
          <div className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">02 — Practice</div>
            <ScrollHighlightText className="mt-6 font-display text-2xl leading-snug md:text-3xl">
              I gather requirements, design the system, ship the code, harden the API, and deploy it to a Linux server that actually stays up.
            </ScrollHighlightText>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl tracking-tight text-bone md:text-7xl">
                <Counter
                  to={s.value}
                  prefix={s.prefix ?? ""}
                  suffix={s.suffix}
                  decimals={s.decimals ?? 0}
                />
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-bone/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== EXPERIENCE */

function Experience() {
  const items = [
    {
      year: "2025 — Now",
      role: "Freelance Full Stack Developer",
      org: "Independent",
      body: "Requirement gathering → system design → development → API testing → Linux deployment. Building production MERN & Java systems with JWT, RBAC and REST APIs.",
      tags: ["MERN", "Java", "JWT", "RBAC", "REST", "Linux"],
    },
    {
      year: "2025",
      role: "ReturnFilers — Tax Platform",
      org: "Full Stack Engineer",
      body: "Owned the product end-to-end. Auth, workflows, dashboards, deployment. Users trust it with real money.",
      tags: ["React", "Node", "MongoDB", "Payments"],
    },
    {
      year: "2025",
      role: "BOA Bihar — Gov Analytics",
      org: "Full Stack Engineer",
      body: "Analytics platform for the Bihar administration. Data ingestion, RBAC, role-based dashboards.",
      tags: ["React", "Express", "SQL", "Power BI"],
    },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative border-t border-border px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-bone/40">
          <span>[ 003 ] · Experience</span>
        </div>
        <WordReveal as="h2" className="mb-24 font-display text-[8vw] leading-[0.95] tracking-[-0.03em] md:text-[5vw]">
          A short résumé, worth reading.
        </WordReveal>

        <div ref={ref} className="relative pl-6 md:pl-16">
          <div className="absolute left-0 top-0 h-full w-px bg-border md:left-6" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-electric md:left-6"
          />
          <div className="flex flex-col gap-24">
            {items.map((it, i) => (
              <TimelineCard key={it.role} item={it} align={i % 2 === 0 ? "left" : "right"} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineCard({
  item,
  align,
}: {
  item: { year: string; role: string; org: string; body: string; tags: string[] };
  align: "left" | "right";
}) {
  const dir = align === "left" ? -60 : 60;
  return (
    <motion.div
      initial={{ opacity: 0, x: dir }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid grid-cols-1 gap-6 md:grid-cols-12"
    >
      <div className="absolute -left-[26px] top-2 h-3 w-3 rounded-full bg-electric ring-4 ring-background md:-left-[38px]" />
      <div className="md:col-span-3">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-bone/50">{item.year}</div>
        <div className="mt-1 text-sm text-bone/70">{item.org}</div>
      </div>
      <div className="md:col-span-9">
        <h3 className="font-display text-3xl leading-tight md:text-4xl">{item.role}</h3>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-bone/70">{item.body}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span key={t} className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-bone/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================== SKILLS (sticky grid) */

const SKILL_GROUPS = [
  { title: "Backend", items: ["Node.js", "Express", "REST APIs", "JWT / RBAC", "Java / Spring"] },
  { title: "Frontend", items: ["React", "Vite", "TailwindCSS", "GSAP", "Framer Motion"] },
  { title: "Database", items: ["MongoDB", "MySQL", "PostgreSQL", "Mongoose", "SQL"] },
  { title: "Programming", items: ["JavaScript", "TypeScript", "Java", "Python", "C++"] },
  { title: "Tools", items: ["Git", "GitHub", "Linux", "Postman", "Power BI"] },
  { title: "Core CS", items: ["Data Structures", "Algorithms", "System Design", "OS", "AI / ML"] },
];

function Skills() {
  const [activeSkillTitle, setActiveSkillTitle] = useState<string | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 240, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 240, damping: 24 });
  const rotate = useTransform(springX, [0, typeof window !== "undefined" ? window.innerWidth : 1200], [-6, 6]);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <section id="skills" className="relative border-t border-border">
      {/* Floating Clean Visual Cursor Follower - No Glassmorphism */}
      <AnimatePresence>
        {activeSkillTitle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 26 }}
            style={{
              left: springX,
              top: springY,
              rotate,
              x: "-50%",
              y: "-50%",
            }}
            className="pointer-events-none fixed z-50 hidden h-52 w-84 overflow-hidden rounded-2xl border border-electric/40 bg-[#09090b] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_20px_rgba(59,130,246,0.25)] md:block"
          >
            <SkillPreviewVisual title={activeSkillTitle} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-6 py-24 md:grid-cols-12 md:px-12">
        <div className="md:col-span-5">
          <div className="sticky top-32">
            <div className="mb-8 text-xs uppercase tracking-[0.25em] text-bone/40">[ 004 ] · Skills</div>
            <WordReveal
              as="h2"
              className="font-display text-[7vw] leading-[0.95] tracking-[-0.03em] text-bone md:text-[4.5vw]"
            >
              The toolkit,
            </WordReveal>
            <WordReveal
              as="h2"
              className="font-display text-[7vw] italic leading-[0.95] tracking-[-0.03em] text-bone/50 md:text-[4.5vw]"
              delay={0.1}
            >
              earned, not listed.
            </WordReveal>
            <p className="mt-8 max-w-md text-base text-bone/60">
              Six disciplines. Each shipped to production, not just studied in a course.
            </p>
          </div>
        </div>

        <div className="md:col-span-7">
          <div className="flex flex-col gap-6">
            {SKILL_GROUPS.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={(e) => {
                  setActiveSkillTitle(g.title);
                  handleMouseMove(e);
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setActiveSkillTitle(null)}
                className="group relative rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_20px_60px_-20px_var(--electric)] cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-2 font-display text-3xl text-bone md:text-4xl">{g.title}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-bone/40 transition-all group-hover:rotate-45 group-hover:text-electric" />
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((it, j) => (
                    <motion.span
                      key={it}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + j * 0.05 }}
                      className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-xs uppercase tracking-widest text-bone/70"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== PROJECTS (pinned) */

const PROJECTS = [
  {
    n: "01",
    name: "BOA Bihar",
    tagline: "Analytics platform for governance.",
    image: projectBoa,
    problem: "Multiple government departments needed unified analytics across scattered datasets.",
    solution: "A role-based dashboard system with ingestion pipelines and drill-down analytics.",
    features: ["Role based access", "Live dashboards", "Ingestion pipelines", "Report exports"],
    stack: ["React", "Node", "Express", "SQL", "Power BI"],
    impact: [
      { k: "Users", v: "150+" },
      { k: "Departments", v: "6" },
      { k: "Uptime", v: "99.9%" },
    ],
  },
  {
    n: "02",
    name: "ReturnFilers",
    tagline: "Tax filing, without the paperwork.",
    image: projectReturn,
    problem: "Individuals and SMBs waste weeks each year filing taxes across scattered tools.",
    solution: "A single MERN application with guided workflows, secure payments and status tracking.",
    features: ["Guided filing flow", "Secure payments", "Doc vault", "Client dashboards"],
    stack: ["React", "Node", "MongoDB", "JWT", "REST"],
    impact: [
      { k: "Transactions", v: "₹4.4L+" },
      { k: "Active users", v: "100+" },
      { k: "Retention", v: "82%" },
    ],
  },
  {
    n: "03",
    name: "General Election",
    tagline: "Real-time election tracking & constituency analytics platform.",
    image: projectElection,
    problem: "Voters, journalists, and analysts needed live constituency metrics, candidate insights, and real-time result aggregation during peak election traffic.",
    solution: "Built a high-throughput MERN analytics dashboard featuring interactive constituency maps, live vote counters, and role-based data verification.",
    features: ["Live vote counters", "Interactive maps", "Candidate search & analytics", "High concurrency REST APIs"],
    stack: ["React", "Node", "MongoDB", "Express", "TailwindCSS"],
    impact: [
      { k: "Votes Tracked", v: "1M+" },
      { k: "Constituencies", v: "543" },
      { k: "Peak RPS", v: "2.5k" },
    ],
  },
];

function Projects() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation across the 3 project slides
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-67%"]);

  return (
    <section ref={targetRef} id="work" className="relative h-[320vh] bg-gradient-to-b from-white via-zinc-100 to-white text-zinc-950">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-8 md:px-12 md:py-10">
        {/* Section Header */}
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-zinc-500 font-mono">
            <span>[ 005 ] · Selected Work</span>
            <span className="hidden md:inline">03 shipped · more in private</span>
          </div>
          <div className="mt-3 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-3xl leading-[0.95] tracking-[-0.03em] text-zinc-950 md:text-5xl">
                Work that shipped<span className="text-zinc-400 italic"> — Users that stayed.</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Horizontal Track */}
        <div className="my-auto w-full overflow-hidden py-2">
          <motion.div style={{ x }} className="flex gap-8 md:gap-16 w-max pl-4 md:pl-12 pr-12 items-center">
            {PROJECTS.map((p) => (
              <ProjectCardHorizontal key={p.n} project={p} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}

function ProjectCardHorizontal({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <div className="relative w-[85vw] md:w-[72vw] lg:w-[65vw] flex-shrink-0 rounded-3xl border border-zinc-200/80 bg-white/95 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-6 md:p-10 backdrop-blur-sm overflow-hidden group">
      {/* Giant Watermark Project Number */}
      <div className="pointer-events-none absolute -bottom-8 -right-4 font-display text-[18vw] font-bold leading-none text-zinc-900/[0.04] select-none z-0">
        {project.n}
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column: Image */}
        <div className="md:col-span-6">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-lg ring-1 ring-zinc-900/10">
            <img
              src={project.image}
              alt={project.name}
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
          </div>
        </div>

        {/* Right Column: Project Info */}
        <div className="md:col-span-6">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
            Project {project.n}
          </div>
          <h3 className="mt-2 font-display text-3xl leading-[0.95] tracking-tight text-zinc-950 md:text-5xl">
            {project.name}
          </h3>
          <p className="mt-2 text-base text-zinc-600 leading-snug">{project.tagline}</p>

          <div className="mt-5 space-y-2.5 text-xs md:text-sm text-zinc-700">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-0.5">Problem</span>
              {project.problem}
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400 block mb-0.5">Solution</span>
              {project.solution}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.features.map((f) => (
              <span key={f} className="inline-flex items-center gap-1 text-xs text-zinc-700 font-medium">
                <Check className="h-3.5 w-3.5 text-electric" /> {f}
              </span>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] uppercase tracking-widest text-zinc-800 font-mono">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3 border-t border-zinc-200 pt-4">
            {project.impact.map((m) => (
              <div key={m.k}>
                <div className="font-display text-xl text-zinc-950 md:text-2xl font-normal">{m.v}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-mono">{m.k}</div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex gap-3">
            <Magnetic
              as="a"
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs text-white transition-colors hover:bg-electric hover:text-black font-medium shadow-md"
            >
              Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
            </Magnetic>
            <Magnetic
              as="a"
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2 text-xs text-zinc-900 transition-colors hover:border-zinc-950 font-medium shadow-sm"
            >
              <Github className="h-3.5 w-3.5" /> GitHub
            </Magnetic>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== PROCESS (Circular Scroll Dial) */

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Requirement Gathering",
    sub: "Defining goals, user personas, tech scope & system architecture.",
    detail: "Deep dive into client specifications, feature requirements, data flow modeling, and performance criteria before writing code.",
  },
  {
    n: "02",
    title: "System & DB Design",
    sub: "Data modeling, schema design & API architecture.",
    detail: "Architecting MongoDB / SQL schemas, defining RESTful endpoints, JWT security layers, and role-based access control (RBAC).",
  },
  {
    n: "03",
    title: "Core Development",
    sub: "Writing clean, modular & scalable MERN / Java code.",
    detail: "Implementing high-performance backend services, frontend state management with React, and fluid micro-animations.",
  },
  {
    n: "04",
    title: "API & Unit Testing",
    sub: "Postman validation, edge-case testing & security audits.",
    detail: "Thorough API integration testing, authentication security verification, edge-case handling, and latency optimizations.",
  },
  {
    n: "05",
    title: "Linux Deployment",
    sub: "Server setup, Nginx reverse proxy, SSL & process control.",
    detail: "Configuring Linux production servers, Nginx reverse proxying, SSL certificates, PM2 process management, and live domain setup.",
  },
  {
    n: "06",
    title: "Monitoring & Support",
    sub: "Uptime tracking, automated backups & live scaling.",
    detail: "Real-time log monitoring, database automated backups, performance tuning, and ongoing feature updates for 99.9% uptime.",
  },
];

function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const stepIndex = Math.min(
        PROCESS_STEPS.length - 1,
        Math.floor(latest * PROCESS_STEPS.length)
      );
      setActiveStep(stepIndex);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Rotate ring based on scroll progress
  const dialRotation = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <section ref={containerRef} id="process" className="relative h-[320vh] border-t border-border">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden px-6 py-8 md:px-12 md:py-10">
        
        {/* Section Header */}
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-bone/40 font-mono">
            <span>[ 006 ] · Process</span>
            <span className="hidden md:inline">06 Moves · Idea → Production</span>
          </div>
          <WordReveal as="h2" className="mt-2 font-display text-3xl leading-[0.95] tracking-[-0.03em] md:text-5xl">
            Idea → Production, in six moves.
          </WordReveal>
        </div>

        {/* Main Content Grid with Circular Dial & Fixed Position Step Card */}
        <div className="my-auto mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12">
          
          {/* Left Column: Circular Dial Wheel Visualizer */}
          <div className="md:col-span-6 flex justify-center items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              
              {/* Glowing Ambient Outer Ring */}
              <div className="absolute inset-0 rounded-full border border-electric/20 bg-card/40 backdrop-blur-xl shadow-[0_0_60px_rgba(59,130,246,0.1)]" />

              {/* Rotating Outer Perimeter Indicator */}
              <motion.div
                style={{ rotate: dialRotation }}
                className="absolute inset-2 rounded-full border border-dashed border-electric/40 pointer-events-none"
              />

              {/* 6 Circular Perimeter Step Nodes */}
              {PROCESS_STEPS.map((step, i) => {
                const angleRad = (i * 60 - 90) * (Math.PI / 180);
                const radius = 130;
                const isActive = i === activeStep;

                return (
                  <motion.button
                    key={step.n}
                    onClick={() => setActiveStep(i)}
                    animate={{
                      scale: isActive ? 1.25 : 1,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                      left: `calc(50% + ${Math.cos(angleRad) * radius}px - 20px)`,
                      top: `calc(50% + ${Math.sin(angleRad) * radius}px - 20px)`,
                    }}
                    className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 z-20 ${
                      isActive
                        ? "bg-electric text-ink shadow-[0_0_20px_rgba(59,130,246,0.8)] ring-4 ring-electric/30"
                        : i < activeStep
                        ? "bg-bone/20 text-bone border border-bone/40"
                        : "bg-background/80 text-bone/40 border border-border"
                    }`}
                  >
                    {step.n}
                  </motion.button>
                );
              })}

              {/* Center Hub Visualizer */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 rounded-full w-36 h-36 sm:w-44 sm:h-44 bg-background border border-electric/30 shadow-inner">
                <span className="font-mono text-xs tracking-widest text-electric uppercase">
                  Step {PROCESS_STEPS[activeStep].n} / 06
                </span>
                <span className="mt-1 font-display text-lg sm:text-xl text-bone leading-tight font-medium">
                  {PROCESS_STEPS[activeStep].title}
                </span>
                <div className="mt-2 flex gap-1">
                  {PROCESS_STEPS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeStep ? "w-5 bg-electric" : "w-1.5 bg-bone/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Fixed Position Step Details Card */}
          <div className="md:col-span-6">
            <div className="relative min-h-[300px] rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-md shadow-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
                      Phase {PROCESS_STEPS[activeStep].n}
                    </span>
                    <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-electric">
                      Step {activeStep + 1} of 6
                    </span>
                  </div>

                  <h3 className="font-display text-3xl md:text-4xl text-bone leading-tight">
                    {PROCESS_STEPS[activeStep].title}
                  </h3>

                  <p className="font-mono text-sm text-electric/90 leading-relaxed">
                    {PROCESS_STEPS[activeStep].sub}
                  </p>

                  <p className="text-base text-bone/70 leading-relaxed">
                    {PROCESS_STEPS[activeStep].detail}
                  </p>

                  {/* Step Selector Navigation Buttons */}
                  <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                    {PROCESS_STEPS.map((s, idx) => (
                      <button
                        key={s.n}
                        onClick={() => setActiveStep(idx)}
                        className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider transition-all ${
                          idx === activeStep
                            ? "bg-electric text-ink font-bold"
                            : "bg-background border border-border text-bone/50 hover:text-bone hover:border-bone/40"
                        }`}
                      >
                        0{idx + 1} {s.title.split(" ")[0]}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ============================================================== ACHIEVEMENTS */

function Achievements() {
  const items = [
    { title: "Bold Analytics", score: "100/100", body: "Perfect score analytics engagement." },
    { title: "Java Certification", score: "Verified", body: "Advanced Java, OOP & data structures." },
    { title: "MERN Certification", score: "Verified", body: "Full stack JavaScript, end-to-end." },
  ];
  return (
    <section id="achievements" className="relative border-t border-border px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-xs uppercase tracking-[0.25em] text-bone/40">[ 007 ] · Achievements</div>
        <WordReveal as="h2" className="mb-16 font-display text-[8vw] leading-[0.95] tracking-[-0.03em] md:text-[5vw]">
          Receipts on the wall.
        </WordReveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-electric/40"
            >
              <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
                Cert · 0{i + 1}
              </div>
              <div className="mt-6 font-display text-3xl">{it.title}</div>
              <div className="mt-2 text-4xl font-light text-bone/80">{it.score}</div>
              <p className="mt-6 text-sm text-bone/60">{it.body}</p>
              <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-electric/30 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== MARQUEE */

const TECH = ["React", "Node", "Express", "MongoDB", "Java", "Python", "SQL", "Git", "Linux", "JWT", "REST API", "Postman", "Power BI"];

function Marquee() {
  return (
    <section className="relative border-t border-border py-16">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...TECH, ...TECH, ...TECH, ...TECH].map((t, i) => (
            <span key={i} className="mx-8 flex items-center gap-8 font-display text-6xl tracking-tight text-bone/60 md:text-8xl">
              {t}
              <span className="inline-block h-2 w-2 rounded-full bg-electric" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== CONTACT */

function Contact() {
  const [sent, setSent] = useState(false);
  const [result, setResult] = useState("");
  const [clearSignal, setClearSignal] = useState(0);
  return (
    <section id="contact" className="relative border-t border-border px-6 py-32 md:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 md:grid-cols-12">
        <div className="md:col-span-6">
          <div className="mb-8 text-xs uppercase tracking-[0.25em] text-bone/40">[ 008 ] · Contact</div>
          <WordReveal as="h2" className="font-display text-[10vw] leading-[0.9] tracking-[-0.04em] md:text-[6.5vw]">
            Let’s build
          </WordReveal>
          <WordReveal
            as="h2"
            className="font-display text-[10vw] italic leading-[0.9] tracking-[-0.04em] text-electric md:text-[6.5vw]"
            delay={0.1}
          >
            something great.
          </WordReveal>

          <div className="mt-12 space-y-4 text-sm text-bone/70">
            <a className="flex items-center gap-3 hover:text-bone" href="mailto:razaaatif25@gmail.com">
              <Mail className="h-4 w-4 text-electric" /> razaaatif25@gmail.com
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="tel:+91">
              <Phone className="h-4 w-4 text-electric" /> +91 · on request
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="https://www.linkedin.com/in/aatif-raza-8ab2aa241/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-4 w-4 text-electric" /> linkedin.com/in/aatif-raza-8ab2aa241
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="https://github.com/Aatifraza123" target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 text-electric" /> github.com/Aatifraza123
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-electric" /> New Delhi, India
            </div>
          </div>
        </div>

        <form
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            formData.append("access_key", "d3c0503d-f89b-4e8a-a1d6-e59f5a0611d0");

            const response = await fetch("https://api.web3forms.com/submit", {
              method: "POST",
              body: formData,
            });
            const data = await response.json();
            setSent(data.success);
            setResult(data.success ? "Success! Your message has been sent." : "Error sending message. Please try again.");
            if (data.success) {
              setClearSignal((prev) => prev + 1);
            }
          }}
          className="md:col-span-6"
        >
          <div className="flex flex-col gap-8">
            <FloatingInput label="Your name" name="name" clearSignal={clearSignal} />
            <FloatingInput label="Email address" name="email" type="email" clearSignal={clearSignal} />
            <FloatingInput label="Company (optional)" name="company" clearSignal={clearSignal} />
            <FloatingInput label="Tell me about the project" name="message" textarea clearSignal={clearSignal} />

            <Magnetic
              as="button"
              className="group relative mt-4 inline-flex w-fit items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-medium text-ink transition-colors hover:bg-electric"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span key="s" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                    <Check className="h-4 w-4" /> Sent — I’ll be in touch
                  </motion.span>
                ) : (
                  <motion.span key="i" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="flex items-center gap-2">
                    Send message <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </motion.span>
                )}
              </AnimatePresence>
            </Magnetic>
            {result && (
              <p className="mt-4 text-sm text-bone/70">{result}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function FloatingInput({
  label,
  name,
  type = "text",
  textarea = false,
  clearSignal,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  clearSignal?: number;
}) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;
  const commonClass =
    "w-full bg-transparent pb-3 pt-6 text-lg text-bone outline-none placeholder:text-transparent";

  useEffect(() => {
    if (clearSignal !== undefined) {
      setVal("");
    }
  }, [clearSignal]);

  return (
    <label className="relative block border-b border-border transition-colors focus-within:border-electric">
      <span
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${active ? "top-0 text-[10px] uppercase tracking-[0.25em] text-electric" : "top-6 text-lg text-bone/40"
          }`}
      >
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={commonClass}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={commonClass}
        />
      )}
    </label>
  );
}

/* ============================================================== FOOTER */

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border px-6 pb-10 pt-24 md:px-12">
      <GhostCursorEffect />
      <div className="relative z-10 mx-auto max-w-7xl">
        <WordReveal
          as="h2"
          className="font-display text-[11vw] leading-[0.9] tracking-[-0.04em] text-bone md:text-[8vw]"
        >
          Building digital
        </WordReveal>
        <WordReveal
          as="h2"
          className="font-display text-[11vw] italic leading-[0.9] tracking-[-0.04em] text-bone/50 md:text-[8vw]"
          delay={0.1}
        >
          products that scale.
        </WordReveal>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-8 text-xs uppercase tracking-[0.25em] text-bone/50 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Aatif Raza — All rights reserved</div>
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/aatif-raza-8ab2aa241/" target="_blank" rel="noopener noreferrer" className="hover:text-bone">LinkedIn</a>
            <a href="https://github.com/Aatifraza123" target="_blank" rel="noopener noreferrer" className="hover:text-bone">GitHub</a>
            <a href="mailto:razaaatif25@gmail.com" className="hover:text-bone">Email</a>
            <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-bone">
              Back to top <ArrowDown className="h-3 w-3 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
