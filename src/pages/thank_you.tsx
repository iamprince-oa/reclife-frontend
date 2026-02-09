import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const location = useLocation();
  const navigate = useNavigate();
  const submission = location.state?.submission; // get submission from router state

  // If no submission found (e.g., direct URL access), redirect back
  if (!submission) {
    return (
      <div className="thankyou-container error">
        <h2>Oops! Something went wrong.</h2>
        <p className="error-message">No recent submission found.</p>
        <button className="back-link" onClick={() => navigate("/contact")}>
          Back to Contact Form
        </button>
      </div>
    );
  }

  return (
    <div className="thankyou-container success">
      <div className="check-icon">✔</div>
      <h2>Thank you for contacting us!</h2>
      <p>
        Thank you, <strong>{submission.name}</strong>!<br />
        <span className="detail">
          We received your message about <strong>{submission.subject}</strong>.
        </span>
      </p>
      <p className="detail">
        <b>Message : </b> {submission.message}
      </p>
      <button className="back-link" onClick={() => navigate("/")}>
        Return Home
      </button>
    </div>
  );
}

export default ThankYou;
