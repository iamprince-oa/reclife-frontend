import "../styles/cta.css";

function CTA() {
  return (
    <>
      {/* CTA Section */}
      <section className="info-card cta-card">
        <h2>Ready to Get Started?</h2>
        <p>
          "Contact us today to learn how we can support you or your loved one.
        </p>
        <a href="/contact" className="cta-btn">
          Contact Us
        </a>

        {/* Social Buttons */}
        <div className="social-buttons">
          <a
            href="https://wa.me/233208973177"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn whatsapp"
            title="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          <a
            href="tel:+233208660381"
            className="social-btn phone"
            title="Call Us"
          >
            <i className="fas fa-phone"></i>
          </a>
          <a
            href="mailto:reclifegma@gmail.com"
            className="social-btn email"
            title="Email"
          >
            <i className="fas fa-envelope"></i>
          </a>
          <a
            href="https://instagram.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn instagram"
            title="Instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a
            href="https://facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn facebook"
            title="Facebook"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
        </div>
      </section>
    </>
  );
}

export default CTA;
