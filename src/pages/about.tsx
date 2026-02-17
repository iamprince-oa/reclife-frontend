import { useEffect, useState } from "react";
import { Trophy, HeartHandshake, Leaf, Heart } from "lucide-react";
import Footer from "../components/Footer";
import CTA from "../components/cta";
import { Helmet } from "react-helmet";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/about.css";

interface AboutData {
  title: string;
  subtitle?: string;
  heroDescription?: string;
  // Add more fields as your API evolves
}

function About() {
  const [data, setData] = useState<AboutData | null>(null);
  const hero = useScrollReveal(0.08);
  const mission = useScrollReveal(0.08);
  const highlights = useScrollReveal(0.06);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/api/about/",
      // switch to "https://reclife-backend.onrender.com/api/about/" in production
    ) // switch to "https://reclife-backend.onrender.com/api/about/" in production
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error("Failed to load about data:", err));
  }, []);

  if (!data) {
    return (
      <div className="loading-wrapper" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text">Loading RecLife story...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {data.title ||
            "About RecLife – Empowering Lives Through Tailored Support"}
        </title>
        <meta
          name="description"
          content="RecLife provides affordable, reliable support for individuals with unique abilities through in-home, community, and group programs that foster connection and growth."
        />
        <meta property="og:title" content={data.title || "About RecLife"} />
        <meta
          property="og:description"
          content="Compassionate, award-winning programs designed to empower and support individuals and families."
        />
      </Helmet>

      <main className="about-page">
        <section className="about-hero" ref={hero.ref}>
          <div
            className={`about-hero-inner ${hero.visible ? "reveal-in-view" : ""}`}
          >
            <h1 className="about-hero-title">
              Empowering Lives Through Tailored Support
            </h1>
            <p className="about-hero-sub">
              Join us for affordable, reliable, and consistent support that
              exceeds expectations. We aim to build lasting relationships and
              offer unwavering support to families and individuals alike.
            </p>
            <p className="about-hero-sub">
              Our skilled team provides high-quality services designed for
              individuals with unique talents and abilities. Whether in-home,
              community-based, or group-oriented, our programs are crafted to
              meet your needs while fostering social connections.
            </p>
          </div>
        </section>

        <section className="about-mission" ref={mission.ref}>
          <div
            className={`about-mission-inner ${mission.visible ? "reveal-in-view" : ""}`}
          >
            <h2 className="section-label">Our Mission</h2>
            <h3 className="section-heading">
              Everyone deserves the opportunity to thrive
            </h3>
            <p>
              At RecLife, we deliver tailored, inclusive support that empowers
              individuals with developmental needs to build skills, form
              connections, and live joyful, fulfilling lives.
            </p>
            <p>
              From safe cooking classes and social circles to skill-building
              lounges, every program is designed with care, flexibility, and
              real impact in mind.
            </p>
          </div>
        </section>

        <section className="about-highlights" ref={highlights.ref}>
          <h2 className="section-heading about-highlights-title">
            Why families choose us
          </h2>
          <div
            className={`highlights-grid ${highlights.visible ? "reveal-in-view" : ""}`}
          >
            {/* 1 */}
            <div className="highlight-card">
              <Trophy className="highlight-icon" aria-hidden="true" />
              <h3>Award-Winning Programs</h3>
              <p>
                Recognized for excellence in creating meaningful,
                person-centered experiences.
              </p>
            </div>

            {/* 2 */}
            <div className="highlight-card">
              <HeartHandshake className="highlight-icon" aria-hidden="true" />
              <h3>Compassionate and Professional Team</h3>
              <p>
                Dedicated experts who bring care, skill, and understanding to
                every interaction.
              </p>
            </div>

            {/* 3 */}
            <div className="highlight-card">
              <Leaf className="highlight-icon" aria-hidden="true" />
              <h3>Holistic Approach to Well-Being</h3>
              <p>
                Supporting physical, social, emotional, and personal growth in
                every program.
              </p>
            </div>

            {/* 4 */}
            <div className="highlight-card">
              <Heart className="highlight-icon" aria-hidden="true" />
              <h3>Recognized by Families</h3>
              <p>
                Trusted partner chosen time and again for consistent, heartfelt
                support.
              </p>
            </div>
          </div>
        </section>

        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default About;
