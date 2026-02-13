import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
import "../styles/testimonial.css";
import "../styles/loading.css";

interface Testimonial {
  name: string;
  message: string;
  date: string;
}

interface TestimonialsResponse {
  count: number;
  results: Testimonial[];
}

interface TestimonialPostResponse {
  testimonial: Testimonial;
  message?: string;
  warning?: string;
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [response, setResponse] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

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

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => setResponse(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/testimonials/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: TestimonialPostResponse = await res.json();

      if (res.ok) {
        setTestimonials([data.testimonial, ...testimonials]);
        setResponse({
          text: data.message || "Thank you! Your testimonial has been added.",
          type: "success",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setResponse({
          text: data.warning || "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setResponse({
        text: "Network error. Please check your connection.",
        type: "error",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Testimonials – RecLife | Real Stories from Our Community</title>
        <meta
          name="description"
          content="Hear directly from families and participants about their experiences with RecLife's inclusive programs and supportive community."
        />
      </Helmet>

      <main className="testimonials-page">
        <section className="hero-section">
          <h1 className="page-title">Stories from Our Community</h1>
          <p className="page-subtitle">
            Real experiences, real impact. Read what participants and families
            say about RecLife.
          </p>
        </section>

        {/* Form Section */}
        <section className="testimonial-form-section">
          <div className="form-container">
            <h2>Share Your Story</h2>
            <p className="form-intro">
              Your words help others see the difference RecLife makes. Thank you
              for sharing!
            </p>

            <form
              className="testimonial-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Submit your testimonial"
            >
              <div className="form-group floating">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  aria-required="true"
                />
                <label htmlFor="name">Your Name</label>
              </div>

              <div className="form-group floating">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  aria-required="true"
                />
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="form-group floating">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  rows={5}
                  required
                  aria-required="true"
                />
                <label htmlFor="message">Your Experience</label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-small" aria-hidden="true"></span>{" "}
                    Sending...
                  </>
                ) : (
                  "Submit Testimonial"
                )}
              </button>

              {response && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className={`form-response ${response.type}`}
                >
                  {response.text}
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="testimonial-list-section">
          <h2>What Our Community Says</h2>

          {loading ? (
            <div className="loading-wrapper" role="status" aria-live="polite">
              <div className="spinner" aria-hidden="true"></div>
              <p className="loading-text">Loading community stories...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <p className="empty-state">
              No testimonials yet — be the first to share your RecLife
              experience!
            </p>
          ) : (
            <div className="testimonial-grid">
              {testimonials.map((t, index) => (
                <article className="testimonial-card" key={index}>
                  <div className="quote-icon">“</div>
                  <p className="testimonial-message">{t.message}</p>
                  <div className="testimonial-footer">
                    <p className="testimonial-name">{t.name}</p>
                    <time className="testimonial-date">{t.date}</time>
                  </div>
                </article>
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
