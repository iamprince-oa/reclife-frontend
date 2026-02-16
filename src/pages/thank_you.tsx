import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission;
  const type = location.state?.type; // can be "contact" or "testimonial"

  /*Missing state (direct visit)*/
  if (!submission) {
    return (
      <main className="thankyou-wrapper">
        <section className="thankyou-card error" role="alert">
          <h1>We couldn’t find your submission</h1>
          <p>
            It looks like this page was opened directly. Please send your
            message through the form.
          </p>

          <button
            type="button"
            className="primary-btn"
            onClick={() =>
              navigate(type === "testimonial" ? "/testimonials" : "/contact")
            }
          >
            Go to Form
          </button>
        </section>
      </main>
    );
  }

  /* Success state */
  return (
    <main className="thankyou-wrapper">
      <section className="thankyou-card success">
        <div className="check-icon" aria-hidden="true">
          ✓
        </div>

        {type === "testimonial" ? (
          <>
            <h1>Thank You for Your Testimonial!</h1>
            <p className="lead">
              Thanks <strong>{submission.name}</strong>, your story has been
              shared successfully.
            </p>
            <p className="detail">
              We appreciate your contribution to our community.
            </p>
          </>
        ) : (
          <>
            <h1>Message received</h1>
            <p className="lead">
              Thanks <strong>{submission.name}</strong>, your message has been
              sent successfully.
            </p>
            <p className="detail">
              We’ll get back to you shortly regarding{" "}
              <strong>{submission.subject}</strong>.
            </p>
            <p className="muted">Our team usually responds within 24 hours.</p>
          </>
        )}

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
