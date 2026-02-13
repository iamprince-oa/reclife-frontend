import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import CTA from "../components/cta";
import { Helmet } from "react-helmet";
import "../styles/services.css";
import "../styles/loading.css";
import * as Images from "../assets";

interface ServicesData {
  service1: string;
  service2: string;
  service3: string;
  service4: string;
  title: string;
}

function Services() {
  const [data, setData] = useState<ServicesData | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/services/")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(setData)
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  if (!data) {
    return (
      <div className="loading-wrapper" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p className="loading-text">Loading RecLife services…</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Community Inclusion",
      text: data.service1,
      image: Images.image1,
    },
    {
      title: "In-Centre Services",
      text: data.service2,
      image: Images.interior1,
    },
    {
      title: "Online Social Circle",
      text: data.service3,
      image: Images.image2,
    },
    {
      title: "Special Skills Lounge",
      text: data.service4,
      image: Images.interior2,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{data.title} | RecLife – Empowering Every Step</title>
        <meta
          name="description"
          content="Discover RecLife's inclusive programs supporting independence, connection and growth."
        />
      </Helmet>

      <main className="services-page">
        {/* HERO */}
        <header className="services-hero">
          <h2>Our Services</h2>
          <p className="services-intro">
            <h3>You come first! We provide the following:</h3>
          </p>
        </header>

        {/* SECTIONS */}
        <div className="services-sections">
          {sections.map((section, index) => (
            <section className="service-section" key={section.title}>
              <div className={`service-inner ${index % 2 ? "reverse" : ""}`}>
                <div className="service-image">
                  <img src={section.image} alt={section.title} loading="lazy" />
                </div>

                <div className="service-content">
                  <h2>{section.title}</h2>
                  <p>{section.text}</p>
                </div>
              </div>
            </section>
          ))}
        </div>

        <CTA />
      </main>

      <Footer />
    </>
  );
}

export default Services;
