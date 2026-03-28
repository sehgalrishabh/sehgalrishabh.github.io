"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowUpRightFromSquare, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import projects from "../data/projects.json";
import contributions from "../data/contributions.json";
import MagneticButton from "@/components/MagneticButton";
import StackMarquee from "@/components/StackMarquee";
import Loader from "@/components/Loader";

// Three.js scene — SSR disabled
const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
});

/* ─────────────────────────────────────────────────────── */
/*  Data                                                    */
/* ─────────────────────────────────────────────────────── */

const experience = [
  {
    date: "Jul 2022 → Present",
    org: "Infosys",
    designation: "Mobile Application Developer",
  },
  {
    date: "Sep 2021 → Jul 2022",
    org: "RowthTech (Pvt) Ltd",
    designation: "Mobile Application Developer / Team Lead",
  },
  {
    date: "Feb 2021 → Sep 2021",
    org: "Suffescom Solutions Pvt. Ltd",
    designation: "React Native Developer",
  },
  {
    date: "Jun 2019 → Feb 2021",
    org: "AppsMaven",
    designation: "Android Developer / React Native Developer",
  },
];

const technologies = [
  { image: "../assets/android.png", title: "Android" },
  { image: "../assets/angular.png", title: "Angular" },
  { image: "../assets/aws.png", title: "AWS" },
  { image: "../assets/azure.png", title: "Azure" },
  { image: "../assets/bootstrap.png", title: "Bootstrap" },
  { image: "../assets/firebase.png", title: "Firebase" },
  { image: "../assets/Flutter.png", title: "Flutter" },
  { image: "../assets/google-cloud.png", title: "GCP" },
  { image: "../assets/graphql.png", title: "GraphQL" },
  { image: "../assets/javascript.png", title: "JavaScript" },
  { image: "../assets/laravel.png", title: "Laravel" },
  { image: "../assets/material-ui.png", title: "Material UI" },
  { image: "../assets/mongodb.png", title: "MongoDB" },
  { image: "../assets/mysql.png", title: "MySQL" },
  { image: "../assets/node.svg", title: "Node.js" },
  { image: "../assets/react.png", title: "React / RN" },
  { image: "../assets/redis.png", title: "Redis" },
  { image: "../assets/socket-io.svg", title: "Socket.IO" },
  { image: "../assets/swift.png", title: "Swift" },
  { image: "../assets/twilio.png", title: "Twilio" },
  { image: "../assets/typescript.png", title: "TypeScript" },
];

/* ─────────────────────────────────────────────────────── */
/*  Helpers                                                 */
/* ─────────────────────────────────────────────────────── */

/** Wrap each word in overflow-hidden + inner span for GSAP reveal */
function WordReveal({
  text,
  className,
  Tag = "span",
}: {
  text: string;
  className?: string;
  Tag?: keyof JSX.IntrinsicElements;
}) {
  return (
    <Tag className={className}>
      {text.split(" ").map((word, wi) => (
        <span
          key={wi}
          className="overflow-clip"
          style={{ marginRight: "0.28em" }}
        >
          <span className="hero-word">{word}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Nav                                                     */
/* ─────────────────────────────────────────────────────── */

function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav ref={navRef} className="nav">
      <div className="nav-inner">
        <span className="nav-logo">
          RS<span>.</span>
        </span>
        <ul className="nav-links">
          {["about", "experience", "projects", "contact"].map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="nav-link">
                {s}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Hero Section                                           */
/* ─────────────────────────────────────────────────────── */

function HeroSection({ visible }: { visible: boolean }) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!visible) return;
    let cancelled = false;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (cancelled) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ delay: 0.1 });

        tl.from(".hero-word", {
          y: "110%",
          opacity: 0,
          stagger: 0.07,
          duration: 1,
          ease: "power4.out",
        })
          .from(
            ".hero-tagline",
            { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
            "-=0.4"
          )
          .from(
            ".hero-bio",
            { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
            "-=0.5"
          )
          .from(
            ".hero-btns",
            { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" },
            "-=0.5"
          )
          .from(
            ".scroll-indicator",
            { opacity: 0, duration: 0.8, ease: "power2.out" },
            "-=0.2"
          );
      }, heroRef);

      return () => ctx.revert();
    };

    let cleanup: (() => void) | undefined;
    run().then((fn) => {
      cleanup = fn;
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [visible]);

  return (
    <section ref={heroRef} id="hero" className="hero">
      {/* Three.js particle background */}
      <ParticleField />

      {/* Gradient overlay so text stays readable */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 50%, transparent 30%, rgba(10,10,10,0.7) 100%)",
        }}
      />

      <div
        className="section-inner relative z-20"
        style={{ paddingTop: "8rem" }}
      >
        {/* Greeting */}
        <div className="section-label" style={{ marginBottom: "1.25rem" }}>
          <span className="overflow-clip">
            <span className="hero-word">Hello, World.</span>
          </span>
        </div>

        {/* Name */}
        <div className="hero-name">
          <WordReveal text="Rishabh" />
          <br />
          <WordReveal text="Sehgal" />
          <span
            className="overflow-clip"
            style={{ marginLeft: "0.15em", color: "var(--primary)" }}
          >
            <span className="hero-word">.</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="hero-tagline">Mobile Application Expert</p>

        {/* Bio */}
        <p className="hero-bio">
          Senior mobile developer with 5+ years crafting cross-platform
          experiences with React Native & Flutter. Problem-solver focused on
          performance, clean architecture, and shipping products that scale.
        </p>

        {/* CTA buttons */}
        <div
          className="hero-btns flex flex-wrap gap-3"
          style={{ marginTop: "2rem" }}
        >
          <MagneticButton>
            <Link
              href="https://github.com/sehgalrishabh/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn"
            >
              <FontAwesomeIcon icon={faGithub} style={{ width: "0.9em" }} />
              GitHub
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link
              href="https://www.linkedin.com/in/rshbhshgl/"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn"
            >
              <FontAwesomeIcon icon={faLinkedin} style={{ width: "0.9em" }} />
              LinkedIn
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link href="mailto:rishabbh004@gmail.com" className="pill-btn">
              <FontAwesomeIcon icon={faEnvelope} style={{ width: "0.9em" }} />
              Email
            </Link>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>scroll</span>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  About / Stats                                          */
/* ─────────────────────────────────────────────────────── */

function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;

      const ctx = gsap.context(() => {
        gsap.from(".stat-block", {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });
        gsap.from(".about-text", {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }, ref);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={ref} id="about" className="section">
      <div className="section-inner">
        <div className="section-label">01 — About</div>

        {/* Stats */}
        <div
          className="grid grid-cols-2 gap-8"
          style={{ marginBottom: "4rem", maxWidth: 600 }}
        >
          {[
            { val: "5+", label: "Years of Experience" },
            { val: "20+", label: "Apps Shipped" },
            { val: "4", label: "Open Source Packages" },
            { val: "3", label: "Companies Served" },
          ].map((s, i) => (
            <div key={i} className="stat-block">
              <div className="stat-value">{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <p
          className="about-text"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            color: "var(--text)",
            lineHeight: 1.65,
            maxWidth: 680,
          }}
        >
          I build mobile-first products that feel native, perform at scale, and
          make engineers proud. My toolkit spans React Native, Flutter, Swift,
          and the full JS stack — but what I care most about is the craft:
          minimal APIs, bulletproof state, silky animations.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Experience                                             */
/* ─────────────────────────────────────────────────────── */

function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;

      const ctx = gsap.context(() => {
        gsap.to(".exp-item", {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      }, ref);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={ref} id="experience" className="section">
      <div className="section-inner">
        <div className="section-label">02 — Experience</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Work History
        </h2>

        <div>
          {experience.map((item, i) => (
            <div key={i} className="exp-item">
              <span className="exp-number">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="exp-org">{item.org}</div>
                <div className="exp-role">{item.designation}</div>
              </div>
              <span className="exp-date">{item.date}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Projects                                               */
/* ─────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);

    const rx = (e.clientY - rect.top - rect.height / 2) / 18;
    const ry = -(e.clientX - rect.left - rect.width / 2) / 18;
    card.style.transform = `perspective(800px) rotateX(${-rx}deg) rotateY(${ry}deg) scale(1.01)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition =
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.4s ease";
    card.style.transform =
      "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    setTimeout(() => {
      if (cardRef.current) cardRef.current.style.transition = "";
    }, 600);
  }, []);

  const tech = "tech" in project ? (project.tech as string[]) : [];
  const category = "category" in project ? (project.category as string) : "";

  return (
    <div
      ref={cardRef}
      className="project-card reveal"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <span className="project-num">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="project-category">{category}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.desc}</p>
      {tech.length > 0 && (
        <div className="project-tags">
          {tech.map((t, ti) => (
            <span key={ti} className="project-tag">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".project-card").forEach((card) => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
          });
        });
      }, ref);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={ref} id="projects" className="section">
      <div className="section-inner">
        <div className="section-label">03 — Work</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Selected Projects
        </h2>

        <div className="grid grid-cols-1 gap-6" style={{ maxWidth: 860 }}>
          {projects.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Open Source                                            */
/* ─────────────────────────────────────────────────────── */

function OpenSourceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;

      const ctx = gsap.context(() => {
        gsap.from(".oss-card", {
          opacity: 0,
          y: 40,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });
      }, ref);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={ref} id="opensource" className="section">
      <div className="section-inner">
        <div className="section-label">04 — Open Source</div>
        <h2 className="section-title" style={{ marginBottom: "3rem" }}>
          Published Packages
        </h2>

        <div
          className="grid grid-cols-1 gap-5"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 360px), 1fr))",
          }}
        >
          {contributions.map((item, i) => (
            <div key={i} className="oss-card">
              <div className="oss-title">{item.title}</div>
              <p className="oss-desc">{item.desc}</p>
              <div className="oss-links">
                {"link" in item && item.link && (
                  <Link
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oss-link"
                  >
                    <FontAwesomeIcon
                      icon={faArrowUpRightFromSquare}
                      style={{ width: "0.75em" }}
                    />
                    Package
                  </Link>
                )}
                {"doc" in item && (item as { doc?: string }).doc && (
                  <Link
                    href={(item as { doc?: string }).doc!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oss-link"
                  >
                    <FontAwesomeIcon
                      icon={faBookOpen}
                      style={{ width: "0.75em" }}
                    />
                    Docs
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Tech Stack                                             */
/* ─────────────────────────────────────────────────────── */

function StackSection() {
  return (
    <section id="stack" className="section" style={{ paddingBottom: "3rem" }}>
      <div className="section-inner" style={{ marginBottom: "2.5rem" }}>
        <div className="section-label">05 — Stack</div>
        <h2 className="section-title">Technologies</h2>
      </div>
      <StackMarquee technologies={technologies} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Contact                                                */
/* ─────────────────────────────────────────────────────── */

function ContactSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (cancelled || !ref.current) return;

      const ctx = gsap.context(() => {
        gsap.from(".contact-reveal", {
          opacity: 0,
          y: 50,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        });
      }, ref);

      return () => ctx.revert();
    };
    let cleanup: (() => void) | undefined;
    run().then((fn) => { cleanup = fn; });
    return () => { cancelled = true; cleanup?.(); };
  }, []);

  return (
    <section ref={ref} id="contact" className="section">
      <div className="section-inner">
        <div className="section-label contact-reveal">06 — Contact</div>
        <h2
          className="section-title contact-reveal"
          style={{ marginBottom: "1.5rem" }}
        >
          Let&apos;s Build Something Great.
        </h2>
        <p
          className="contact-reveal"
          style={{
            color: "var(--muted)",
            fontSize: "0.9rem",
            marginBottom: "3rem",
            maxWidth: 460,
            lineHeight: 1.65,
          }}
        >
          Open to senior roles, freelance contracts, and interesting
          collaborations. Drop me a line and let&apos;s talk.
        </p>

        <MagneticButton className="contact-reveal" strength={0.25}>
          <Link
            href="mailto:rishabbh004@gmail.com"
            className="contact-email"
          >
            rishabbh004@gmail.com
          </Link>
        </MagneticButton>

        {/* Social row */}
        <div
          className="contact-reveal flex gap-4"
          style={{ marginTop: "3rem" }}
        >
          {[
            {
              href: "https://github.com/sehgalrishabh/",
              icon: faGithub,
              label: "GitHub",
            },
            {
              href: "https://www.linkedin.com/in/rshbhshgl/",
              icon: faLinkedin,
              label: "LinkedIn",
            },
          ].map((s) => (
            <MagneticButton key={s.label}>
              <Link
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-btn"
              >
                <FontAwesomeIcon icon={s.icon} style={{ width: "0.9em" }} />
                {s.label}
              </Link>
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Footer                                                 */
/* ─────────────────────────────────────────────────────── */

function Footer() {
  return (
    <footer>
      <div
        className="section-inner"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          © {new Date().getFullYear()} Rishabh Sehgal
        </span>
        <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
          Built with Next.js · GSAP · Three.js
        </span>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Root Page                                              */
/* ─────────────────────────────────────────────────────── */

export default function Landing() {
  const [loaded, setLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    // Refresh ScrollTrigger once content is visible
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      <Loader onComplete={handleLoadComplete} />

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease 0.1s",
        }}
      >
        <Nav />
        <main>
          <HeroSection visible={loaded} />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <OpenSourceSection />
          <StackSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
