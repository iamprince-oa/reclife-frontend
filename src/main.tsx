import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/variables.css";
import "./index.css";
import "./styles/reveal.css";
import "./styles/navbar.css";
import "./styles/home.css";
import "./styles/about.css";
import "./styles/services.css";
import "./styles/contact.css";
import "./styles/thankyou.css";
import "./styles/footer.css";
import "./styles/cta.css";
import "./styles/variables.css";
import "./styles/testimonial.css";
import "./components/ServicesCarousel.tsx";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
