import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import CTA from "../components/cta";
import "../styles/about.css";

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      //"http://127.0.0.1:8000/api/about/",
      "https://cornerstone-djangorestframework.onrender.com/api/about/"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => console.error(err));
  }, []);

  if (!data)
    return (
      <div className="loading-wrapper">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    );

  return (
    <>
      <title>{data.title}</title>

      <section className="about-hero">
        <h1>About Cornerstone Development and Construction</h1>
        <p className="about-hero-subtitle">{data.subtitle}</p>
      </section>

      <div className="about-content">
        <section className="info-card">
          <h2>Who We Are</h2>
          <p>
            <b>Cornerstone Development and Construction</b> is a property and
            building company focused on delivering genuine lands, quality homes,
            and reliable construction services. We support clients who want to
            invest, build, or settle with confidence.
          </p>
        </section>

        <section className="info-card">
          <h2>What We Do</h2>
          <p>
            Our work covers land sales in safe and well planned areas, sales of
            completed buildings, and full construction services from start to
            finish. We guide every client with clarity and honesty. Our team
            verifies all documents, handles site planning, and ensures that
            every project meets strong standards.
          </p>
        </section>

        <section className="info-card">
          <h2>Our Approach</h2>
          <p>
            Whether someone is buying land, choosing a home, or starting a
            building project, we keep the entire process simple and stress free.
            <b> Cornerstone Development and Construction</b> is built on trust,
            good service, and long term value.
          </p>
        </section>

        <section className="info-card">
          <h2>Our Goal</h2>
          <p>
            Our goal is to help families and businesses secure property that can
            grow with them for years to come.
          </p>
        </section>

        <CTA />
      </div>

      <Footer />
    </>
  );
}

export default About;
