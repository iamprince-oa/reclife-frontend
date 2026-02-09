import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import "../styles/testimonial.css";
import "../styles/loading.css";

// Type for a single testimonial
interface Testimonial {
  name: string;
  message: string;
  date: string;
}

// API GET response
interface TestimonialsResponse {
  count: number;
  results: Testimonial[];
}

// API POST response
interface TestimonialPostResponse {
  testimonial: Testimonial;
  message?: string;
  warning?: string;
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [responseMsg, setResponseMsg] = useState<string>("");

  // Fetch testimonials on mount
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/testimonials/")
      .then((res) => {
        if (!res.ok) throw new Error("Network error");
        return res.json();
      })
      .then((data: TestimonialsResponse) => setTestimonials(data.results))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  }, []);

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (responseMsg) {
      const timer = setTimeout(() => setResponseMsg(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [responseMsg]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponseMsg("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/testimonials/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: TestimonialPostResponse = await res.json();

      if (res.ok) {
        setTestimonials([data.testimonial, ...testimonials]); // prepend new testimonial
        setResponseMsg(data.message || "Thank you for your feedback!");
        setFormData({ name: "", email: "", message: "" }); // clear form
      } else {
        setResponseMsg(data.warning || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setResponseMsg("Network error. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Testimonials – RecLife</title>
        <meta
          name="description"
          content="Read what our clients have to say about RecLife's services and community programs."
        />
        <meta
          name="keywords"
          content="RecLife, Testimonials, Reviews, Feedback"
        />
        <meta name="author" content="RecLife" />
      </Helmet>

      <main className="testimonials-page">
        <h1 className="page-title">Testimonials</h1>

        {/* Submission Form */}
        <section className="testimonial-form-section">
          <h2>Share Your Experience</h2>
          <form className="testimonial-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Testimonial
            </button>

            {responseMsg && (
              <p
                className={`response-msg ${responseMsg.includes("Thank") ? "success" : "error"}`}
              >
                {responseMsg}
              </p>
            )}
          </form>
        </section>

        {/* Testimonials List */}
        <section className="testimonial-list-section">
          <h2>What People Are Saying</h2>

          {loading ? (
            <div className="loading-wrapper">
              <div className="spinner"></div>
              <p className="loading-text">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <p>No testimonials yet. Be the first to share your experience!</p>
          ) : (
            <div className="testimonial-grid">
              {testimonials.map((t, index) => (
                <div className="testimonial-card" key={index}>
                  <p className="testimonial-message">"{t.message}"</p>
                  <p className="testimonial-name">- {t.name}</p>
                  <p className="testimonial-date">{t.date}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Testimonials;
