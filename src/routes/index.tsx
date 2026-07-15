import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail, MapPin, Phone, ArrowDown, ArrowRight, Check } from "lucide-react";

import heroPortrait from "@/assets/hero-portrait.jpg";
import projectBoa from "@/assets/project-boa.jpg";
import projectReturn from "@/assets/project-returnfilers.jpg";

import { useLenis } from "@/components/portfolio/use-lenis";
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
  return (
    <main className="relative bg-background text-foreground">
      <ScrollProgress />
      <CursorFollower />
      <Nav />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Process />
      <Achievements />
      <Marquee />
      <Contact />
      <Footer />
    </main>
  );
}

/* ============================================================== NAV */

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "process", label: "Process" },
  { id: "contact", label: "Contact" },
];

function Nav() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 mix-blend-difference">
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <a href="#top" className="font-display text-lg tracking-tight text-bone">
          Aatif<span className="text-electric">.</span>
        </a>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-bone/70 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`transition-colors hover:text-bone ${active === s.id ? "text-bone" : ""}`}
            >
              {s.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="hidden text-xs uppercase tracking-[0.2em] text-bone/70 transition-colors hover:text-bone md:block"
        >
          Available for work
        </a>
      </div>
    </header>
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
      <motion.div style={{ x: smx, y: smy }} className="absolute inset-0 grid-bg opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--ink)_75%)]" />

      <motion.div style={{ y, opacity }} className="relative z-10 flex min-h-screen flex-col justify-between px-6 pt-32 pb-10 md:px-12">
        <div className="flex items-start justify-between text-xs uppercase tracking-[0.25em] text-bone/50">
          <div>Portfolio ’26 / v.04</div>
          <div className="hidden md:block">Bihar, India — GMT +5:30</div>
        </div>

        <div className="grid grid-cols-1 items-end gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <div className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-bone/60">
              <span className="inline-block h-[6px] w-[6px] rounded-full bg-electric" />
              Full Stack Developer · MERN · Java · AI/ML
            </div>
            <h1 className="font-display text-[14vw] leading-[0.88] tracking-[-0.04em] text-bone md:text-[9vw]">
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
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="md:col-span-4"
          >
            <p className="max-w-sm text-base leading-relaxed text-bone/70 md:text-lg">
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

        <div className="mt-14 flex items-end justify-between">
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

      {/* Portrait */}
      <motion.div
        style={{ x: smx, y: smy }}
        className="pointer-events-none absolute right-[-4%] top-[8%] hidden h-[78vh] w-[36vw] md:block"
      >
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
          className="relative h-full w-full"
        >
          <img
            src={heroPortrait}
            alt="Aatif Raza"
            width={1024}
            height={1280}
            className="h-full w-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </motion.div>
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
      year: "2024 — Now",
      role: "Freelance Full Stack Developer",
      org: "Independent",
      body: "Requirement gathering → system design → development → API testing → Linux deployment. Building production MERN & Java systems with JWT, RBAC and REST APIs.",
      tags: ["MERN", "Java", "JWT", "RBAC", "REST", "Linux"],
    },
    {
      year: "2024",
      role: "ReturnFilers — Tax Platform",
      org: "Full Stack Engineer",
      body: "Owned the product end-to-end. Auth, workflows, dashboards, deployment. Users trust it with real money.",
      tags: ["React", "Node", "MongoDB", "Payments"],
    },
    {
      year: "2023",
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
  return (
    <section id="skills" className="relative border-t border-border">
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
                className="group rounded-2xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_20px_60px_-20px_var(--electric)]"
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
];

function Projects() {
  return (
    <section id="work" className="relative border-t border-border">
      <div className="px-6 pt-32 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-baseline justify-between text-xs uppercase tracking-[0.25em] text-bone/40">
            <span>[ 005 ] · Selected Work</span>
            <span className="hidden md:inline">02 shipped · more in private</span>
          </div>
          <WordReveal as="h2" className="font-display text-[9vw] leading-[0.95] tracking-[-0.03em] md:text-[6vw]">
            Work that shipped.
          </WordReveal>
          <WordReveal
            as="h2"
            className="font-display text-[9vw] italic leading-[0.95] tracking-[-0.03em] text-bone/50 md:text-[6vw]"
            delay={0.1}
          >
            Users that stayed.
          </WordReveal>
        </div>
      </div>

      <div>
        {PROJECTS.map((p) => (
          <ProjectPinned key={p.n} project={p} />
        ))}
      </div>
    </section>
  );
}

function ProjectPinned({ project }: { project: (typeof PROJECTS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const mask = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0%)", "inset(0% 0% 100% 0%)"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <div ref={ref} className="relative h-[220vh] w-full">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden border-t border-border px-6 md:px-12">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 md:grid-cols-12">
          {/* Image */}
          <div className="md:col-span-7">
            <motion.div style={{ clipPath: mask }} className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-card">
              <motion.img
                src={project.image}
                alt={project.name}
                width={1600}
                height={1000}
                loading="lazy"
                style={{ scale }}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-bone/10" />
            </motion.div>
          </div>

          {/* Content */}
          <motion.div style={{ y: contentY }} className="md:col-span-5">
            <div className="font-mono text-xs uppercase tracking-[0.25em] text-electric">
              Project {project.n}
            </div>
            <h3 className="mt-3 font-display text-5xl leading-[0.95] tracking-tight md:text-6xl">
              {project.name}
            </h3>
            <p className="mt-3 text-lg text-bone/60">{project.tagline}</p>

            <div className="mt-8 grid grid-cols-1 gap-5 text-sm text-bone/70">
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.25em] text-bone/40">Problem</div>
                {project.problem}
              </div>
              <div>
                <div className="mb-1 text-[10px] uppercase tracking-[0.25em] text-bone/40">Solution</div>
                {project.solution}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 text-xs text-bone/60">
                  <Check className="h-3 w-3 text-electric" /> {f}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <span key={s} className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-bone/60">
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
              {project.impact.map((m) => (
                <div key={m.k}>
                  <div className="font-display text-2xl text-bone md:text-3xl">{m.v}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.25em] text-bone/40">{m.k}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Magnetic
                as="a"
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-bone px-5 py-2.5 text-sm text-ink transition-colors hover:bg-electric"
              >
                Live Demo <ArrowUpRight className="h-4 w-4" />
              </Magnetic>
              <Magnetic
                as="a"
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm text-bone hover:border-bone"
              >
                <Github className="h-4 w-4" /> GitHub
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== PROCESS */

const STEPS = ["Requirement", "Design", "Development", "Testing", "Deployment", "Maintenance"];

function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.3"] });
  const dash = useTransform(scrollYProgress, [0, 1], [1, 0]);
  return (
    <section id="process" className="relative border-t border-border px-6 py-32 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-xs uppercase tracking-[0.25em] text-bone/40">[ 006 ] · Process</div>
        <WordReveal as="h2" className="font-display text-[8vw] leading-[0.95] tracking-[-0.03em] md:text-[5vw]">
          Idea → Production, in six moves.
        </WordReveal>

        <div ref={ref} className="mt-24 grid grid-cols-1 gap-8 md:grid-cols-6">
          <svg className="pointer-events-none absolute left-0 top-0 hidden h-full w-full md:block" preserveAspectRatio="none" />
          {STEPS.map((s, i) => (
            <motion.div
              key={s}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative"
            >
              <div className="font-mono text-xs text-electric">0{i + 1}</div>
              <div className="mt-2 font-display text-2xl tracking-tight md:text-3xl">{s}</div>
              <div className="mt-4 h-px w-full bg-border">
                <motion.div style={{ scaleX: useTransform(dash, (v) => 1 - v) }} className="h-full origin-left bg-electric" />
              </div>
              {i < STEPS.length - 1 && (
                <ArrowRight className="mt-4 h-4 w-4 text-bone/30" />
              )}
            </motion.div>
          ))}
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
            <a className="flex items-center gap-3 hover:text-bone" href="mailto:aatif@example.com">
              <Mail className="h-4 w-4 text-electric" /> aatif.raza@example.com
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="tel:+91">
              <Phone className="h-4 w-4 text-electric" /> +91 · on request
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="#">
              <Linkedin className="h-4 w-4 text-electric" /> linkedin.com/in/aatifraza
            </a>
            <a className="flex items-center gap-3 hover:text-bone" href="#">
              <Github className="h-4 w-4 text-electric" /> github.com/aatifraza
            </a>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-electric" /> Bihar, India
            </div>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="md:col-span-6"
        >
          <div className="flex flex-col gap-8">
            <FloatingInput label="Your name" name="name" />
            <FloatingInput label="Email address" name="email" type="email" />
            <FloatingInput label="Company (optional)" name="company" />
            <FloatingInput label="Tell me about the project" name="message" textarea />

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
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  const [val, setVal] = useState("");
  const [focus, setFocus] = useState(false);
  const active = focus || val.length > 0;
  const shared = {
    name,
    value: val,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setVal(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className:
      "w-full bg-transparent pb-3 pt-6 text-lg text-bone outline-none placeholder:text-transparent",
  };
  return (
    <label className="relative block border-b border-border transition-colors focus-within:border-electric">
      <span
        className={`pointer-events-none absolute left-0 transition-all duration-300 ${
          active ? "top-0 text-[10px] uppercase tracking-[0.25em] text-electric" : "top-6 text-lg text-bone/40"
        }`}
      >
        {label}
      </span>
      {textarea ? <textarea rows={3} {...(shared as never)} /> : <input type={type} {...(shared as never)} />}
    </label>
  );
}

/* ============================================================== FOOTER */

function Footer() {
  return (
    <footer className="relative border-t border-border px-6 pb-10 pt-24 md:px-12">
      <div className="mx-auto max-w-7xl">
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
            <a href="#" className="hover:text-bone">LinkedIn</a>
            <a href="#" className="hover:text-bone">GitHub</a>
            <a href="mailto:aatif@example.com" className="hover:text-bone">Email</a>
            <a href="#top" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 hover:border-bone">
              Back to top <ArrowDown className="h-3 w-3 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
