import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo-cropped.jpeg";
import "../styles/navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Testimonials", path: "/testimonials" },
];

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("darkMode", String(isDark));
  }, [isDark]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("mobile-menu-open", menuOpen);
  }, [menuOpen]);

  // Close menu on window resize
  useEffect(() => {
    const handleResize = () => window.innerWidth > 768 && setMenuOpen(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link
          to="/"
          className="logo-wrapper"
          onClick={() => setMenuOpen(false)}
        >
          <img src={logo} alt="RecLife logo" className="logo-img" />
          RecLife
        </Link>

        {/* Desktop links + toggle */}
        <div className="nav-right">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={isActive(link.path) ? "active" : ""}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className={`dark-toggle ${isDark ? "active" : ""}`}
            onClick={() => setIsDark((prev) => !prev)}
            aria-label="Toggle theme"
          >
            <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="mobile-nav" className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <ul className="mobile-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={isActive(link.path) ? "active" : ""}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              className={`dark-toggle ${isDark ? "active" : ""}`}
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle theme"
            >
              <i className={`fas ${isDark ? "fa-sun" : "fa-moon"}`}></i>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
