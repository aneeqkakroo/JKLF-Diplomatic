import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, Send } from "lucide-react";

import { CONTACT_SUBJECTS, sendContactMessage } from "../lib/contactMessage.js";

const emptyForm = {
  name: "",
  organisation: "",
  email: "",
  country: "",
  subject: "",
  message: "",
  website: "", // hidden from people; only bots fill it in
};

// Links such as /contact?as=media preselect the enquiry type.
const SUBJECT_FOR = {
  governments: "international",
  organisations: "research",
  media: "media",
  diaspora: "general",
};

// The Edge Function has no organisation field, so the organisation and the
// site the message came from go at the top of the message.
function composeMessage(form) {
  const lines = ["[Sent from the Diplomatic Bureau site, diplomatic.jklf.org]"];

  if (form.organisation.trim()) {
    lines.push(`Organisation: ${form.organisation.trim()}`);
  }

  return `${lines.join("\n")}\n\n${form.message}`;
}

export default function ContactForm() {
  const [params] = useSearchParams();
  const [form, setForm] = useState(() => ({
    ...emptyForm,
    subject: SUBJECT_FOR[params.get("as")] || "",
  }));
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");
  // When the form was opened; forms sent within seconds are from bots
  const [openedAt, setOpenedAt] = useState(() => Date.now());

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const { organisation, ...fields } = form;
    const result = await sendContactMessage(
      {
        ...fields,
        message: composeMessage({ ...form, organisation }),
        elapsed_ms: Date.now() - openedAt,
      },
      { env: import.meta.env }
    );

    if (result.ok) {
      setStatus("sent");
      setForm(emptyForm);
    } else {
      setStatus("error");
      setError(result.error);
    }
  }

  if (status === "sent") {
    return (
      <div className="contact-form contact-form--sent" role="status">
        <CheckCircle2 size={40} aria-hidden="true" />
        <h2>Thank you. Your message has been sent.</h2>
        <p>The bureau will reply to the email address you gave. Replies can take a few days.</p>
        <button
          type="button"
          onClick={() => {
            setOpenedAt(Date.now());
            setStatus("idle");
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          Name
          <input type="text" name="name" autoComplete="name" maxLength={120} required value={form.name} onChange={update} />
        </label>
        <label>
          <span>Organisation <span className="optional">(optional)</span></span>
          <input type="text" name="organisation" autoComplete="organization" maxLength={160} value={form.organisation} onChange={update} />
        </label>
      </div>

      <div className="contact-form__row">
        <label>
          Email
          <input type="email" name="email" autoComplete="email" maxLength={320} required value={form.email} onChange={update} />
        </label>
        <label>
          <span>Country <span className="optional">(optional)</span></span>
          <input type="text" name="country" autoComplete="country-name" maxLength={80} value={form.country} onChange={update} />
        </label>
      </div>

      <label>
        I am contacting you as
        <select name="subject" required value={form.subject} onChange={update}>
          <option value="" disabled>Select one</option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Message
        <textarea name="message" rows="8" minLength={10} maxLength={4800} required value={form.message} onChange={update} />
      </label>

      {/* Hidden from people and screen readers; bots fill it in */}
      <label className="contact-form__trap" aria-hidden="true">
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
      </label>

      {status === "error" && (
        <p className="contact-form__error" role="alert">{error}</p>
      )}

      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
        <Send size={17} aria-hidden="true" />
      </button>
    </form>
  );
}
