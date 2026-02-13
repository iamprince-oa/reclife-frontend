import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission;

  /* ---------- Missing state (direct visit) ---------- */
  if (!submission) {
    return (
      <main className="thankyou-wrapper">
        <section className="thankyou-card error" role="alert">
          <h1>We couldn’t find your submission</h1>
          <p>
            It looks like this page was opened directly. Please send your
            message through the contact form.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/contact")}
          >
            Go to Contact Form
          </button>
        </section>
      </main>
    );
  }

  /* ---------- Success state ---------- */
  return (
    <main className="thankyou-wrapper">
      <section className="thankyou-card success">
        <div className="check-icon" aria-hidden="true">
          ✓
        </div>

        <h1>Message received</h1>

        <p className="lead">
          Thanks <strong>{submission.name}</strong>, your message has been sent
          successfully.
        </p>

        <p className="detail">
          We’ll get back to you shortly regarding{" "}
          <strong>{submission.subject}</strong>.
        </p>

        <p className="muted">Our team usually responds within 24 hours.</p>

        <div className="thankyou-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/")}
          >
            Return Home
          </button>

          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/services")}
          >
            View Our Services
          </button>
        </div>
      </section>
    </main>
  );
}

export default ThankYou;
