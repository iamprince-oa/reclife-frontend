import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "../styles/contact.css";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  submission: {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    site_name: string;
  };
  message?: string;
  warning?: string;
  redirect?: string;
}

function Contact() {
  const header = useScrollReveal(0.1);
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [response, setResponse] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch(
        //"http://127.0.0.1:8000/api/contact/",
        "https://w5v0z3d3-8000.uks1.devtunnels.ms/api/contact/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      const data: ContactResponse = await res.json();

      if (res.ok) {
        navigate("/thank-you", { state: { submission: data.submission } });
      } else {
        setResponse({
          text:
            data.message ||
            data.warning ||
            "Something went wrong. Please try again.",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setResponse({
        text: "Network error. Please check your connection and try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact RecLife – We're Here to Help</title>
        <meta
          name="description"
          content="Get in touch with RecLife for support, inquiries about programs, or to discuss how we can assist you or your loved one."
        />
        <meta
          name="keywords"
          content="RecLife, contact, support, consultation, community programs"
        />
      </Helmet>

      <main className="contact-page">
        <div className="contact-container">
          <div className={`contact-header ${header.visible ? "reveal-in-view" : ""}`} ref={header.ref}>
            <h1>Get in Touch</h1>
            <p className="contact-subtitle">
              We're here to listen and help. Reach out with any questions about
              our programs, to request support, or just to say hello.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="contact-form"
            noValidate
            aria-label="Contact form"
          >
            {(["name", "email", "subject"] as const).map((field) => (
              <div className="form-group floating-label" key={field}>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  placeholder=" "
                  aria-required="true"
                />
                <label htmlFor={field}>
                  {field === "email"
                    ? "Email Address"
                    : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            <div className="form-group floating-label">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={loading}
                rows={6}
                placeholder=" "
                aria-required="true"
              />
              <label htmlFor="message">Your Message</label>
            </div>

            <button
              type="submit"
              className={`submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
              aria-busy={loading ? "true" : "false"}
            >
              <span aria-live="polite">
                {loading ? (
                  <>
                    <span className="spinner-small" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </span>
            </button>
          </form>

          {response && (
            <div
              role="alert"
              aria-live="assertive"
              className={`form-response ${response.type}`}
            >
              {response.text}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
