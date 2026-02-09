import "../styles/footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; {year} <strong>RecLifeGMA</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
