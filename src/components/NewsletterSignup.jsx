import { useState } from "react";
import { CheckCircle2, Mail } from "lucide-react";

import { subscribeToNewsletter } from "../lib/newsletter.js";
import { Container } from "./ui";

const emptyForm = { name: "", email: "", consent: false, website: "" };

export default function NewsletterSignup() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [error, setError] = useState("");

  function update(event) {
    const { name, type, checked, value } = event.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    // Only bots fill in the hidden field; act as if it worked.
    if (form.website) {
      setStatus("done");
      return;
    }

    setStatus("sending");
    setError("");
    const result = await subscribeToNewsletter(form, { env: import.meta.env });

    if (result.ok) {
      setStatus("done");
      setForm(emptyForm);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  return (
    <section className="newsletter" aria-labelledby="newsletter-title">
      <Container>
        <div className="newsletter__inner">
          <div className="newsletter__intro">
            <Mail size={32} aria-hidden="true" />
            <h2 id="newsletter-title">Join our newsletter</h2>
            <p>
              Statements, briefings and news of the Diplomatic Bureau&apos;s
              work, sent to your inbox. No more than a few emails a month.
            </p>
          </div>

          {status === "done" ? (
            <div className="newsletter__done" role="status">
              <CheckCircle2 size={28} aria-hidden="true" />
              <p>
                <strong>Thank you for signing up.</strong> You will receive the
                Bureau&apos;s next newsletter.
              </p>
            </div>
          ) : (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <div className="newsletter__fields">
                <label>
                  <span>
                    Name <span className="optional">(optional)</span>
                  </span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={update}
                    autoComplete="name"
                    maxLength={120}
                  />
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={update}
                    autoComplete="email"
                    maxLength={254}
                    required
                  />
                </label>
              </div>

              <label className="newsletter__honeypot" aria-hidden="true">
                Website
                <input
                  name="website"
                  value={form.website}
                  onChange={update}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <label className="newsletter__consent">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={update}
                  required
                />
                <span>
                  I agree to receive emails from the JKLF Diplomatic Bureau. I
                  can unsubscribe at any time.
                </span>
              </label>

              {status === "error" && (
                <p className="notice notice--error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Signing up…" : "Sign up"}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
