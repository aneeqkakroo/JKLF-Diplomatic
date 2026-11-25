import { Link } from "react-router-dom";
import { Clock, Mail, MapPin, Newspaper } from "lucide-react";

import ContactForm from "../components/ContactForm";
import { Container } from "../components/ui";
import { head } from "../data/bureau";
import useDocumentTitle from "../lib/useDocumentTitle";

export default function Contact() {
  useDocumentTitle("Contact");

  return (
    <section className="contact-page">
      <Container className="contact-page__inner">
        <div className="contact-page__intro">
          <span className="ui-eyebrow">Contact</span>
          <h1>Contact the bureau</h1>
          <p className="contact-page__lead">
            For meeting requests, briefings, submissions, interviews or
            diaspora matters, write to the Diplomatic Bureau.
          </p>
        </div>

        <div className="contact-page__form">
          <ContactForm />
        </div>

        <ul className="contact-page__details contact-facts">
          <li>
            <MapPin size={20} aria-hidden="true" />
            <span>
              {head.name}, {head.role}
              <br />
              {head.location}
            </span>
          </li>
          <li>
            <Mail size={20} aria-hidden="true" />
            <span>Messages go to JKLF's office and are passed to the bureau.</span>
          </li>
          <li>
            <Newspaper size={20} aria-hidden="true" />
            <span>
              Journalists: see our latest <Link to="/statements">statements</Link>.
            </span>
          </li>
          <li>
            <Clock size={20} aria-hidden="true" />
            <span>Replies can take a few days.</span>
          </li>
        </ul>
      </Container>
    </section>
  );
}
