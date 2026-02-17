import React, { useEffect, useState, lazy, Suspense } from "react";
import slide1 from "../assets/interior1.jpeg";
import after1 from "../assets/after1.jpg";
import special1 from "../assets/Special-Needs-Education-1024x576.webp";
import { interior1, service1, image1, image2, meal } from "../assets";
import { useScrollReveal } from "../hooks/useScrollReveal";

import "../styles/home.css";
import { Helmet } from "react-helmet";

const Footer = lazy(() => import("../components/Footer"));
const CTA = lazy(() => import("../components/cta"));

interface HomeData {
  title: string;
  welcome: string;
  mission: string;
}

const HERO_LINE_1 = "Building confidence.";
const HERO_LINE_2 = "Through meaningful activity.";
const TYPE_SPEED_MS = 38;
const PAUSE_BETWEEN_LINES_MS = 220;
const CURSOR_BLINK_MS = 480;

function HeroTypewriter() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const cursorInterval = setInterval(() => {
      if (cancelled) return;
      setShowCursor((c) => !c);
    }, CURSOR_BLINK_MS);

    const typeLine1 = () => {
      return new Promise<void>((resolve) => {
        let i = 0;
        const id = setInterval(() => {
          if (cancelled) {
            clearInterval(id);
            return;
          }
          if (i <= HERO_LINE_1.length) {
            setLine1(HERO_LINE_1.slice(0, i));
            i++;
          } else {
            clearInterval(id);
            resolve();
          }
        }, TYPE_SPEED_MS);
      });
    };

    const typeLine2 = () => {
      return new Promise<void>((resolve) => {
        let i = 0;
        const id = setInterval(() => {
          if (cancelled) {
            clearInterval(id);
            return;
          }
          if (i <= HERO_LINE_2.length) {
            setLine2(HERO_LINE_2.slice(0, i));
            i++;
          } else {
            clearInterval(id);
            setDone(true);
            setShowCursor(false);
            resolve();
          }
        }, TYPE_SPEED_MS);
      });
    };

    const run = async () => {
      await typeLine1();
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, PAUSE_BETWEEN_LINES_MS));
      if (cancelled) return;
      await typeLine2();
    };
    run();

    return () => {
      cancelled = true;
      clearInterval(cursorInterval);
    };
  }, []);

  const cursorOnLine1 = line2 === "";
  const cursorOnLine2 = line2.length > 0 && !done;

  return (
    <h1 className="hero-headline">
      <span className="hero-headline-line">
        {line1}
        {cursorOnLine1 && (
          <span className="hero-cursor" aria-hidden>
            {showCursor ? "|" : "\u00A0"}
          </span>
        )}
      </span>
      <span className="hero-headline-line">
        {line2}
        {cursorOnLine2 && (
          <span className="hero-cursor" aria-hidden>
            {showCursor ? "|" : "\u00A0"}
          </span>
        )}
      </span>
    </h1>
  );
}

const PROGRAMS = [
  {
    title: "Meal Prep & Cooking",
    description:
      "Safe, simple cooking and meal prep skills that build independence and confidence in the kitchen.",
    image: meal,
    href: "/services",
  },
  {
    title: "Social Circles",
    description:
      "In-person and online social programs that encourage connection, participation and belonging.",
    image: image2,
    href: "/services",
  },
  {
    title: "Special Skills Lounge",
    description:
      "Tailored activities that support growth, life skills and meaningful recreation for every participant.",
    image: special1,
    href: "/services",
  },
];

function Home() {
  const [data, setData] = useState<HomeData | null>(null);
  const story = useScrollReveal();
  const impactIntro = useScrollReveal(0.08);
  const impactCollage = useScrollReveal(0.06);
  const ready = useScrollReveal();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data)
    return (
      <div className="loading">
        <div className="spinner" />
        <p>Loading...</p>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.mission} />
      </Helmet>

      {/* HERO — typewriter headline, stable background, clear text */}
      <header className="hero">
        <div className="hero-bg-wrap" aria-hidden>
          <img src={slide1} alt="" className="hero-bg" />
          <div className="hero-overlay" />
        </div>

        <div className="hero-inner">
          <HeroTypewriter />
          <p className="hero-tagline">
            More than programs—we create belonging, growth and everyday life
            skills through inclusive recreation.
          </p>
          <p className="hero-brand">RECLIFE</p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-primary">
              Start a Conversation
            </a>
            <a href="/services" className="btn btn-ghost">
              View Programs
            </a>
          </div>
        </div>
      </header>

      <section className="trust-bar">
        <div className="trust-inner">
          <p>Inclusive programs</p>
          <span className="dot" />
          <p>Skill-building activities</p>
          <span className="dot" />
          <p>Supportive community</p>
        </div>
      </section>

      <main>
        {/* MEET THE MISSION — personal intro block */}
        <section className="section section-meet" id="story" ref={story.ref}>
          <h2 className="section-label">Why we&apos;re here</h2>
          <div className={`meet-grid ${story.visible ? "reveal-in-view" : ""}`}>
            <div className="meet-content">
              <p className="meet-lead">{data.mission}</p>
              <p className="meet-sub">
                We design recreational programs that support confidence,
                independence and joy. When you connect with RecLife, you can
                expect that and more.
              </p>
            </div>
            <div className="meet-image hover-reveal">
              <img src={after1} alt="Participants enjoying outdoor activity" />
            </div>
          </div>
        </section>

        {/* SERVICES PREVIEW — card grid with GET STARTED */}
        <section className="section section-services">
          <div ref={impactIntro.ref as React.RefObject<HTMLDivElement>}>
            <h2
              className={`section-heading ${impactIntro.visible ? "reveal-in-view" : ""}`}
            >
              Here&apos;s how we can support you
            </h2>
          </div>
          <p className="section-intro">
            A quick introduction to our programs and how we can assist you.
          </p>
          <div
            className={`service-cards ${impactCollage.visible ? "reveal-in-view" : ""}`}
            ref={impactCollage.ref as React.RefObject<HTMLDivElement>}
          >
            {PROGRAMS.map((program) => (
              <article key={program.title} className="service-card">
                <div className="service-card-image hover-zoom">
                  <img src={program.image} alt="" />
                </div>
                <div className="service-card-body">
                  <h3 className="service-card-title">{program.title}</h3>
                  <p className="service-card-desc">{program.description}</p>
                  <a href={program.href} className="btn btn-get-started">
                    Get Started
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* REAL GROWTH — collage + CTA */}
        <section className="section section-impact">
          <h2 className="section-heading">
            Real growth happens through experience
          </h2>
          <p className="section-intro">
            Every activity is designed to encourage participation, independence
            and connection.
          </p>
          <div className="impact-collage">
            <div className="impact-img main hover-zoom">
              <img src={image1} alt="RecLife program activity" />
            </div>
            <div className="impact-img top hover-zoom">
              <img src={interior1} alt="Indoor recreation" />
            </div>
            <div className="impact-img bottom hover-zoom">
              <img src={service1} alt="Service in action" />
            </div>
            <div className="impact-img side hover-zoom">
              <img src={special1} alt="Special needs education" />
            </div>
          </div>
          <div className="section-cta">
            <a href="/services" className="btn btn-primary btn-large">
              Explore Programs
            </a>
          </div>
        </section>

        {/* SO, READY TO START? — bridge to contact */}
        <section className="section section-ready" ref={ready.ref}>
          <h2
            className={`section-heading ${ready.visible ? "reveal-in-view" : ""}`}
          >
            So, ready to start?
          </h2>
          <p className="section-intro">
            Reach out and we&apos;ll help find the right fit for you or someone
            you care about.
          </p>
          <a href="#contact" className="btn btn-primary btn-large">
            Let&apos;s Connect
          </a>
        </section>

        <Suspense fallback={<div />}>
          <CTA />
        </Suspense>
      </main>

      <Suspense fallback={<div />}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
