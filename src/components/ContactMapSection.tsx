// src/components/ContactMapSection.tsx
import React from "react";

const ContactMapSection: React.FC = () => {
  const address = "6033 Shawson Dr, Mississauga, ON L5T 1H8, Canada";
  const email = "reclifegma@gmail.com";
  const phone = "647-677-0275";

  // Basic embed iframe — you can generate a more precise one from Google Maps
  // Go to https://www.google.com/maps → search the address → Share → Embed a map → Copy
  // For now, using a clean q= query version:
  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.5!2d-79.701!3d43.646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDM4JzQ1LjIiTiA3OcKwNDInMDMuNiJX!5e0!3m2!1sen!2sca!4vYOUR_TIMESTAMP_HERE!5m2!1sen!2sca`;

  // Alternative simple version (works without pb param):
  // const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  return (
    <section className="contact-map-section" id="contact">
      <div className="contact-container">
        {/* Left: Contact Info + CTA-style text */}
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>Feel Free To Reach Out</p>

          <div className="contact-details">
            <div className="detail-item">
              <span className="icon">📍</span>
              <div>
                <strong>Our Office</strong>
                <p>{address}</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="icon">✉️</span>
              <div>
                <strong>Email</strong>
                <a href={`mailto:${email}`}>{email}</a>
              </div>
            </div>

            <div className="detail-item">
              <span className="icon">📞</span>
              <div>
                <strong>Phone</strong>
                <a href={`tel:${phone.replace(/-/g, "")}`}>{phone}</a>
              </div>
            </div>
          </div>

          {/* You can keep or move your <CTA /> content here if desired */}
        </div>

        {/* Right: Map */}
        <div className="map-wrapper">
          <iframe
            title="Our Location - RecLife Office"
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="contact-map-iframe"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactMapSection;
