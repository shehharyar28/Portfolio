"use client";

import { useState, type MouseEvent } from "react";
import { knowledge } from "@/data/knowledge";
import { GalaxyBackground } from "@/components/effects/GalaxyBackground";
import { HeroPortrait } from "@/components/effects/HeroPortrait";
import { HoloCard } from "@/components/effects/HoloCard";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { LazyMount } from "@/components/LazyMount";
import { riseIn, riseInX } from "@/lib/motion";
import { m } from "framer-motion";
import {
  BriefcaseBusiness,
  Code2,
  Download,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Orbit,
  ArrowDown,
} from "lucide-react";

const FEATURED_INITIAL = 3;

function scrollToSection(e: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  e.preventDefault();
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.pushState(null, "", href);
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <m.div className="mb-10 max-w-2xl" {...riseInX}>
      <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-300/90">
        <span className="inline-block h-px w-8 bg-gradient-to-r from-cyan-400 to-transparent" />
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-semibold tracking-wide text-slate-50 sm:text-3xl md:text-4xl">
        <span className="holo-text holo-glitch">{title}</span>
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </m.div>
  );
}

export function PortfolioShell() {
  const [showAllFeatured, setShowAllFeatured] = useState(false);
  const { about, projects, contact, social, resume, experience, skills } =
    knowledge;
  const heroName = about.fullName || about.name;

  const withImages = projects.filter((p) => (p.imageUrls?.length ?? 0) > 0);
  const featured = withImages.filter((p) => p.featured);
  const featuredVisible = showAllFeatured
    ? featured
    : featured.slice(0, FEATURED_INITIAL);
  const featuredIds = new Set(featured.map((p) => p.id));
  const mobile = projects.filter(
    (p) =>
      (p.imageUrls?.length ?? 0) > 0 &&
      !featuredIds.has(p.id) &&
      (p.categories.includes("mobile") ||
        p.categories.includes("ride-sharing") ||
        (p.categories.includes("ecommerce") && !p.categories.includes("web")) ||
        (p.categories.includes("social") && !p.categories.includes("web"))),
  );
  const web = projects.filter(
    (p) =>
      (p.imageUrls?.length ?? 0) > 0 &&
      !featuredIds.has(p.id) &&
      (p.categories.includes("web") || p.categories.includes("pos")),
  );
  const ai = projects.filter((p) => p.categories.includes("ai"));
  const healthcare = projects.filter((p) =>
    p.categories.includes("healthcare"),
  );
  const logistics = projects.filter(
    (p) =>
      (p.imageUrls?.length ?? 0) > 0 &&
      p.categories.includes("logistics") &&
      !featuredIds.has(p.id),
  );

  const navLinks = [
    ["#projects", "Work"],
    ["#mobile", "Mobile"],
    ["#web", "Web"],
    ["#ai", "AI"],
    ["#contact", "Contact"],
  ] as const;

  return (
    <div className="relative min-h-full overflow-x-hidden text-slate-100">
      <GalaxyBackground />

      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <div className="flex items-center gap-2">
          <Orbit className="h-5 w-5 text-cyan-300" />
          <p className="font-display text-xs font-semibold tracking-[0.18em] text-slate-50 sm:text-sm">
            {about.name.toUpperCase()}
            <span className="text-cyan-400">.DEV</span>
          </p>
        </div>
        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-sm text-slate-300 backdrop-blur-xl md:flex">
          {navLinks.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={(e) => scrollToSection(e, href)}
              className="rounded-full px-3 py-1.5 transition hover:bg-cyan-400/10 hover:text-cyan-100"
            >
              {label}
            </a>
          ))}
          <a
            href={resume.path}
            download={resume.fileName}
            className="btn-holo ml-1 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 px-3 py-1.5 text-xs font-medium text-slate-950"
          >
            <Download className="h-3.5 w-3.5" /> CV
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-5 pb-32 sm:px-8">
        {/* Hero */}
        <section className="relative grid min-h-[min(88vh,860px)] items-center gap-10 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 sm:pt-14">
          <div className="relative max-w-3xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-cyan-200">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
              {about.tagline}
            </p>

            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="holo-text block">{heroName}</span>
            </h1>

            <p className="mt-4 max-w-xl font-mono text-sm text-teal-200/80 sm:text-base">
              {about.title}
            </p>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
              {about.heroSummary ?? about.introduction}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, "#projects")}
                className="btn-holo inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)]"
              >
                View case work <ArrowDown className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm text-slate-200 backdrop-blur-md transition hover:border-cyan-300/40 hover:bg-cyan-400/10"
              >
                Hire {about.name}
              </a>
              <button
                type="button"
                onClick={() =>
                  document
                    .querySelector<HTMLButtonElement>(
                      '[aria-label="Open portfolio assistant"]',
                    )
                    ?.click()
                }
                className="inline-flex items-center gap-2 rounded-full border border-teal-400/40 bg-teal-400/10 px-6 py-3 text-sm text-teal-100 transition hover:bg-teal-400/20"
              >
                <Sparkles className="h-4 w-4" /> Chat with {about.name}'s AI assistant
              </button>
            </div>
          </div>

          {/* Animated personal portrait */}
          <div className="relative flex justify-center lg:justify-end">
            <HeroPortrait />
          </div>
        </section>

        <m.div
          className="mb-4 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4"
          {...riseIn}
        >
          {[
            ["3+", "Years"],
            ["10+", "Products"],
            ["2", "Stores"],
            ["5", "Live Deploys"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-3 text-center"
            >
              <p className="font-display text-xl text-cyan-300 sm:text-2xl">
                {value}
              </p>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </m.div>

        {/* Featured */}
        <section id="projects" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Selected case work"
            title="Featured Projects"
            subtitle="Real product screens — mobile apps, logistics platforms, POS, and AI systems shipped to production."
          />
          <div className="grid gap-8">
            {featuredVisible.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                delay={Math.min(i, 2) * 0.05}
                featuredLayout
                priorityCover={i === 0}
              />
            ))}
          </div>
          {!showAllFeatured && featured.length > FEATURED_INITIAL ? (
            <button
              type="button"
              onClick={() => setShowAllFeatured(true)}
              className="mt-8 w-full rounded-full border border-cyan-400/35 bg-cyan-400/10 px-5 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20 sm:w-auto"
            >
              Show {featured.length - FEATURED_INITIAL} more projects
            </button>
          ) : null}
        </section>

        <section id="mobile" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Mobile constellation"
            title="Mobile Applications"
            subtitle="React Native products with App Store & Play Store releases — presented in device frames."
          />
          <LazyMount minHeight={360} rootMargin="200px 0px">
            <div className="grid gap-8">
              {mobile.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={Math.min(i, 2) * 0.04} />
              ))}
              {mobile.length === 0 ? (
                <p className="font-mono text-sm text-slate-500">
                  Additional mobile case studies appear in Featured above.
                </p>
              ) : null}
            </div>
          </LazyMount>
        </section>

        <section id="web" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Web protocols"
            title="Web & POS Systems"
            subtitle="Next.js logistics platforms and POS — browser-framed production UI."
          />
          <LazyMount minHeight={360} rootMargin="200px 0px">
            <div className="grid gap-8">
              {web.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={Math.min(i, 2) * 0.04} />
              ))}
              {web.length === 0 ? (
                <p className="font-mono text-sm text-slate-500">
                  Primary web & POS work is showcased in Featured above — including
                  FleetEx, Rapid Express, and Order Intel POS.
                </p>
              ) : null}
            </div>
          </LazyMount>
        </section>

        <section id="healthcare" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Sector // Healthcare"
            title="Healthcare Systems"
          />
          <LazyMount minHeight={240} rootMargin="200px 0px">
            <div className="grid gap-5 sm:grid-cols-2">
              {healthcare.map((p, i) => (
                <HoloCard key={p.id} delay={Math.min(i, 2) * 0.05}>
                  <h3 className="font-display text-base text-slate-50">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{p.summary}</p>
                </HoloCard>
              ))}
            </div>
          </LazyMount>
        </section>

        <section id="logistics" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Sector // Logistics"
            title="Logistics Networks"
            subtitle="Freight platforms, portals, and LoadNavigator for carriers & drivers."
          />
          <LazyMount minHeight={320} rootMargin="200px 0px">
            <div className="grid gap-8">
              {logistics.map((p, i) => (
                <ProjectCard key={p.id} project={p} delay={Math.min(i, 2) * 0.04} />
              ))}
              {logistics.length === 0 ? (
                <p className="font-mono text-sm text-slate-500">
                  Logistics platforms are featured above — LoadNavigator, FleetEx,
                  and Rapid Express.
                </p>
              ) : null}
            </div>
          </LazyMount>
        </section>

        <section id="experience" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading eyebrow="Timeline" title="Experience" />
          <LazyMount minHeight={360} rootMargin="200px 0px">
            <div className="relative space-y-4 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-gradient-to-b before:from-cyan-400/60 before:via-teal-400/30 before:to-transparent sm:before:left-5">
              {experience.map((e) => (
                <div key={e.id} className="relative pl-10 sm:pl-12">
                  <span className="absolute left-2.5 top-6 h-3 w-3 rounded-full border-2 border-cyan-300 bg-[#030712] shadow-[0_0_12px_rgba(34,211,238,0.8)] sm:left-3.5" />
                  <HoloCard delay={0}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-sm tracking-wide text-slate-50 sm:text-base">
                        {e.title}
                      </h3>
                      <span className="font-mono text-[10px] text-cyan-300/70">
                        {e.startDate} – {e.endDate}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-teal-300/90">{e.company}</p>
                    <p className="mt-2 text-sm text-slate-400">{e.description}</p>
                  </HoloCard>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Core stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[...skills.primary, ...skills.secondary].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-[11px] text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-100"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </LazyMount>
        </section>

        <section id="contact" className="scroll-mt-24 py-14 sm:py-20">
          <SectionHeading
            eyebrow="Comms channel"
            title="Contact"
            subtitle="Available for high-impact mobile, web, POS, and AI product engagements."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <a href={`mailto:${contact.email}`} className="block">
              <HoloCard>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      Email
                    </p>
                    <p className="text-sm text-slate-100">{contact.email}</p>
                  </div>
                </div>
              </HoloCard>
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="block"
            >
              <HoloCard delay={0.05}>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                      Phone / WhatsApp
                    </p>
                    <p className="text-sm text-slate-100">{contact.phone}</p>
                  </div>
                </div>
              </HoloCard>
            </a>
            <HoloCard delay={0.1}>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-cyan-300" />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
                    Location
                  </p>
                  <p className="text-sm text-slate-100">{contact.location}</p>
                </div>
              </div>
            </HoloCard>
            <HoloCard delay={0.15}>
              <div className="flex flex-wrap items-center gap-5">
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-cyan-200"
                >
                  <Code2 className="h-5 w-5" /> GitHub
                </a>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-cyan-200"
                >
                  <BriefcaseBusiness className="h-5 w-5" /> LinkedIn
                </a>
                <a
                  href={resume.path}
                  download={resume.fileName}
                  className="inline-flex items-center gap-2 text-sm text-slate-200 hover:text-cyan-200"
                >
                  <Download className="h-5 w-5" /> CV
                </a>
              </div>
            </HoloCard>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-black/30 py-8 text-center font-mono text-[11px] text-slate-500 backdrop-blur">
        <span suppressHydrationWarning>
          © {new Date().getFullYear()} {about.fullName} · {withImages.length}{" "}
          visual case studies · Ask the assistant
        </span>
      </footer>
    </div>
  );
}
