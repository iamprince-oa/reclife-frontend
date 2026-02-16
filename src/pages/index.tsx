import { useEffect, useState, lazy, Suspense } from "react";
import slide1 from "../assets/interior1.jpeg";
import slide2 from "../assets/interior2.jpeg";
import interior1 from "../assets/interior1.jpeg";
import interior2 from "../assets/interior2.jpeg";
import image1 from "../assets/Image2.jpeg";
import service1 from "../assets/service-1.jpg";
import service2 from "../assets/service-2.jpg";
import after1 from "../assets/after1.jpg";
import special1 from "../assets/Special-Needs-Education-1024x576.webp";
import "../styles/home.css";
import "../styles/loading.css";
import "../styles/cta.css";
import { Helmet } from "react-helmet"; // safer for React 19

const Footer = lazy(() => import("../components/Footer"));
const CTA = lazy(() => import("../components/cta"));

interface HomeData {
  title: string;
  welcome: string;
  mission: string;
}

function Home() {
  const [data, setData] = useState<HomeData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data)
    return (
      <div className="loading-wrapper" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={data.mission} />
        <meta
          name="keywords"
          content="RecLife, Development, Support, Accessibility"
        />
        <meta name="author" content="RecLife" />
        <link rel="canonical" href="https://reclife.com/" />

        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.mission} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/default-og.jpg" />
        <meta property="og:url" content="https://reclife.com/" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "RecLife",
            url: "https://reclife.com/",
            logo: "https://reclife.com/logo.jpeg",
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="hero-split">
        <div className="hero-container">
          {/* CARD 1 */}
          <div className="hero-card">
            <img src={slide1} alt="Programs support" className="hero-img" />

            <div className="hero-overlay">
              <div className="hero-content">
                <p className="hero-eyebrow">Empowering Unique Abilities</p>
                <h2 className="hero-title">
                  Discover programs fostering growth, connection and
                  independence
                </h2>
                <a href="#contact" className="hero-cta">
                  Contact Us
                </a>
              </div>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="hero-card">
            <img src={slide2} alt="Holistic care" className="hero-img" />

            <div className="hero-overlay">
              <div className="hero-content">
                <p className="hero-eyebrow">Holistic Care, Proven Results</p>
                <h2 className="hero-title">
                  Physical, emotional and social wellbeing prioritized
                </h2>
                <a href="#contact" className="hero-cta">
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-content">
        <section className="mission-section" aria-labelledby="mission-title">
          <div className="mission-card">
            {/* Image group */}
            <div className="mission-media">
              <img
                src={after1}
                alt="Group enjoying inclusive outdoor activities together"
                className="mission-img main"
              />

              <div className="mission-stack">
                <img
                  src={special1}
                  alt="Participants in adaptive sports smiling and engaging"
                  className="mission-img"
                />
                <img
                  src={service2}
                  alt="Community members supporting each other in recreational programs"
                  className="mission-img"
                />
              </div>
            </div>

            {/* Text */}
            <div className="mission-text">
              <h2 id="mission-title">Our Mission</h2>
              <p>{data.mission}</p>
            </div>
          </div>
        </section>

        {/* Image collage – static grid instead of slideshow */}
        <section className="gallery-section" aria-labelledby="gallery-title">
          <div className="gallery-header text-center">
            <h2 id="gallery-title">Our Impact in Action</h2>
            <p className="gallery-subtitle">
              Meaningful moments created every day through inclusive recreation
            </p>
          </div>

          <div className="collage-grid">
            <img
              src={image1}
              alt="Person engaged in meaningful recreational activity"
              className="collage-img tall"
              loading="lazy"
            />
            <img
              src={interior1}
              alt="Group participating in adaptive recreation session"
              className="collage-img wide"
              loading="lazy"
            />
            <img
              src={service1}
              alt="Participant enjoying supported inclusive activity"
              className="collage-img"
              loading="lazy"
            />
            <img
              src={interior2}
              alt="Joyful community connection moment"
              className="collage-img"
              loading="lazy"
            />
          </div>

          {/* Moved here – now sits below the grid */}
          <div className="text-center mt-10 md:mt-12 lg:mt-16">
            <a href="/services" className="btn-explore">
              Explore Programs
            </a>
          </div>
        </section>

        <Suspense fallback={<div>Loading call-to-action...</div>}>
          <CTA />
        </Suspense>
      </main>

      <Suspense fallback={<div>Loading footer...</div>}>
        <Footer />
      </Suspense>
    </>
  );
}

export default Home;
