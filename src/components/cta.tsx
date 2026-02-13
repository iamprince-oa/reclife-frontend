import "../styles/cta.css";

function CTA() {
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2886.47!2d-79.6576289!3d43.64923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b6d6b0b0b0b0b%3A0x0!2s6033+Shawson+Dr%2C+Mississauga%2C+ON+L5T+1H8!5e0!3m2!1sen!2sca!4v1734000000000!5m2!1sen!2sca";

  return (
    <section className="cta-section" aria-labelledby="cta-title">
      {/* Blue top bar like screenshot */}
      <div className="cta-top-bar">
        <h2 className="cta-main-title">Feel Free To Contact Us</h2>
      </div>

      <div className="cta-container">
        <div className="cta-split-wrapper">
          {/* Left column – contact info + social */}
          <div className="cta-left-content">
            <div className="contact-info-list">
              {/* Office */}
              <div className="contact-row">
                <div className="contact-icon location">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-details">
                  <h3 className="contact-label">Our Office</h3>
                  <p className="contact-detail">
                    6033 Shawson drive,
                    <br />
                    Mississauga, ON L5T 1H8, Canada
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="contact-row">
                <div className="contact-icon email">
                  <i className="fas fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <h3 className="contact-label">Click to Email Us</h3>
                  <a
                    href="mailto:reclifegma@gmail.com"
                    className="contact-link"
                  >
                    reclifegma@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="contact-row">
                <div className="contact-icon phone">
                  <i className="fas fa-phone-alt"></i>
                </div>
                <div className="contact-details">
                  <h3 className="contact-label">Call Us</h3>
                  <a href="tel:+16476770275" className="contact-link">
                    647-677-0275
                  </a>
                </div>
              </div>
            </div>

            {/* Social section – keep or adjust spacing */}
            <div className="social-section">
              <h4 className="social-heading">Connect With Us</h4>
              <div className="social-buttons">
                <a
                  href="https://wa.me/+16476770275"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn whatsapp"
                  aria-label="WhatsApp"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
                <a
                  href="tel:+16476770275"
                  className="social-btn phone"
                  aria-label="Call"
                >
                  <i className="fas fa-phone"></i>
                </a>
                <a
                  href="mailto:reclifegma@gmail.com"
                  className="social-btn email"
                  aria-label="Email"
                >
                  <i className="fas fa-envelope"></i>
                </a>
                <a
                  href="https://instagram.com/reclifegma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn instagram"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="https://facebook.com/reclifegma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn facebook"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="cta-map-wrapper">
            <iframe
              title="RecLife Office Location - 6033 Shawson Drive, Mississauga"
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="cta-map-iframe"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTA;
