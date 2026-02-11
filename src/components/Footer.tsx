import "../styles/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Section */}
        <div className="footer-section contact">
          <h3>Get In Touch</h3>
          <p>6033 Shawson Drive, Mississauga, ON L5T 1H8</p>
          <p>
            <a href="mailto:reclifegma@gmail.com">reclifegma@gmail.com</a>
          </p>
          <p>
            <a href="tel:+16476770275">647-677-0275</a>
          </p>
        </div>

        {/* Social Section */}
        <div className="footer-section social">
          <h3>Follow Us On</h3>
          <p>
            <a
              href="https://instagram.com/reclifegma"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="footer-bottom">
        <p>
          &copy; {year} <strong>reclifegma</strong>. All Rights Reserved.
        </p>
        <p>
          Deployed by{" "}
          <a href="https://startlinkvisuals.com">Startlink Visuals</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
