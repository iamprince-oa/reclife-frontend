import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";
import "../styles/contact.css";

// Define the shape of the form
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define the API response
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
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  // Auto-clear response after 5 seconds
  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => setResponse(""), 5000);
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
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8000/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data: ContactResponse = await res.json();

      if (res.ok) {
        // Redirect to Thank You page with submission data
        navigate("/thank-you", { state: { submission: data.submission } });
      } else {
        setResponse(data.message || data.warning || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setResponse("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Contact Us – RecLife</title>
        <meta
          name="description"
          content="Reach out to RecLife for support, consultations, or inquiries about our services."
        />
        <meta
          name="keywords"
          content="RecLife, Contact, Support, Consultation"
        />
        <meta name="author" content="RecLife" />
      </Helmet>

      <main className="contact-page">
        <div className="contact-container">
          <h1 className="contact-title">Get in Touch</h1>
          <p className="contact-subtitle">
            Have a project in mind or want to reach out for a consultation? We'd
            love to hear from you.
          </p>

          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            {(["name", "email", "subject"] as const).map((field) => (
              <div className="form-group" key={field}>
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  id={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={
                    field === "email" ? "john@example.com" : `Enter ${field}`
                  }
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                required
                disabled={loading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {response && (
            <p
              className={`response-msg ${response.includes("Thanks") ? "success" : "error"}`}
            >
              {response}
            </p>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Contact;
