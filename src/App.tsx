//import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index.jsx";
import About from "./pages/about.jsx";
import Services from "./pages/services.jsx";
import Contact from "./pages/contact.jsx";
import Navbar from "./components/Navbar.jsx";
import ThankYou from "./pages/thank_you.jsx";
//import "@fortawesome/fontawesome-free/css/all.min.css";
import Testimonials from "./pages/testimonial.js";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
