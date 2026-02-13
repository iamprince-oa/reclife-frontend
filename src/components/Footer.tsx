import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Section */}
        <div className="footer-section footer-contact">
          <h4>Get In Touch</h4>
          <p>
            <i className="bi bi-geo-alt-fill"></i> 6033 Shawson Drive,
            Mississauga, ON L5T 1H8
          </p>
          <p>
            <i className="bi bi-envelope-fill"></i>{" "}
            <a href="mailto:reclifegma@gmail.com">reclifegma@gmail.com</a>
          </p>
          <p>
            <i className="bi bi-telephone-fill"></i>{" "}
            <a href="tel:+16476770275">647-677-0275</a>
          </p>
        </div>

        {/* Social Section */}
        <div className="footer-section footer-social">
          <h4>Follow Us</h4>
          <ul>
            <li>
              <a
                href="https://instagram.com/reclifegma"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-instagram"></i> Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom credits */}
      <div className="footer-bottom">
        <p>
          &copy; {year} <strong>reclifegma</strong>. All Rights Reserved.
        </p>
        <p>
          Deployed by{" "}
          <a
            href="https://startlinkvisuals.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            ExceedLabs
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
