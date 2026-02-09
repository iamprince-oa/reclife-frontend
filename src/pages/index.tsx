import { useEffect, useState, lazy, Suspense } from "react";
import logo from "../assets/logo.jpeg";
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
      <header className="header-hero">
        <div className="logo-bar">
          <img
            src={logo}
            alt="RecLife Logo"
            className="logo-small"
            loading="lazy"
          />
        </div>
        <section className="hero-clean">
          <h1>{data.welcome}</h1>
        </section>
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
