import { useEffect, useState, lazy, Suspense } from "react";
import slide1 from "../assets/interior1.jpeg";
import slide2 from "../assets/interior2.jpeg";
import "../styles/home.css";
import "../styles/loading.css";
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
          {/* IMAGE CARD 1 */}
          <div className="hero-media">
            <div
              id="carousel-1"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="w-100" src={slide1} alt="Programs support" />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 carousel-caption-content">
                      <h5 className="text-white text-uppercase mb-3">
                        Empowering Unique Abilities
                      </h5>
                      <h3 className="display-2 text-white mb-4">
                        Discover programs fostering growth, connection,
                        independence.
                      </h3>
                      <a
                        href="#contact"
                        className="btn btn-secondary py-md-3 px-md-5"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/*
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel-1"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel-1"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
              */}
            </div>
          </div>

          {/* IMAGE CARD 2 */}
          <div className="hero-media">
            <div
              id="carousel-2"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img className="w-100" src={slide2} alt="Holistic care" />
                  <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                    <div className="p-3 carousel-caption-content">
                      <h5 className="text-white text-uppercase mb-3">
                        Holistic Care, Proven Results
                      </h5>
                      <h1 className="display-2 text-white mb-4">
                        Physical, emotional, and social well-being prioritized.
                      </h1>
                      <a
                        href="#contact"
                        className="btn btn-secondary py-md-3 px-md-5"
                      >
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/*<button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carousel-2"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carousel-2"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
              */}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="home-content">
        <section className="info-card" aria-labelledby="mission-title">
          <h2 id="mission-title">Our Mission</h2>
          <p>{data.mission}</p>
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
