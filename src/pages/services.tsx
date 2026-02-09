import { useEffect, useState } from "react";
import ServiceCarousel from "../components/ServicesCarousel";
import Footer from "../components/Footer";
import CTA from "../components/cta";
import { Helmet } from "react-helmet";
import "../styles/services.css";
import "../styles/loading.css";
import * as Images from "../assets";

// TypeScript type for API response
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
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((json: ServicesData) => setData(json))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  if (!data)
    return (
      <div className="loading-wrapper" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true"></div>
        <p className="loading-text">Loading services...</p>
      </div>
    );

  // Map API services to display
  const servicesMap = [
    {
      name: "Safe & Simple Cooking",
      description: data.service1,
      key: "service1",
    },
    {
      name: "Saturday Social Circle",
      description: data.service2,
      key: "service2",
    },
    {
      name: "Online Social Circle",
      description: data.service3,
      key: "service3",
    },
    {
      name: "The Special Skills Lounge",
      description: data.service4,
      key: "service4",
    },
  ];

  // Example images for each service (replace with actual)
  const imageSets: Record<string, string[]> = {
    "Safe & Simple Cooking": [Images.meal, Images.meal],
    "Saturday Social Circle": [Images.image1, Images.image1],
    "Online Social Circle": [Images.image1, Images.image2],
    "The Special Skills Lounge": [Images.interior1, Images.interior2],
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{data.title}</title>
        <meta
          name="description"
          content="Explore the inclusive programs and services offered by RecLife to empower individuals with developmental needs."
        />
        <meta
          name="keywords"
          content="RecLife, Services, Programs, Community, Development"
        />
        <meta name="author" content="RecLife" />
      </Helmet>

      <div className="services-page">
        <h1 className="services-title">{data.title}</h1>

        <div className="services-grid">
          {servicesMap.map((service) => (
            <div className="service-card" key={service.key}>
              <ServiceCarousel
                images={imageSets[service.name] || ([] as string[])}
              />
              <h2 className="service-name">{service.name}</h2>
              <p className="service-text">{service.description}</p>
            </div>
          ))}
        </div>

        <CTA />
      </div>

      <Footer />
    </>
  );
}

export default Services;
