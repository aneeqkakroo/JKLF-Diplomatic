import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import AudienceIcon from "../components/AudienceIcon";
import DocumentList from "../components/DocumentList";
import NewsletterSignup from "../components/NewsletterSignup";
import { NoStatements, StatementCard } from "../components/StatementList";
import WavingFlag from "../components/WavingFlag";
import { Button, Container, Section, SectionHeader } from "../components/ui";
import {
  audiences,
  bureau,
  documents,
  head,
  members,
  positionPoints,
} from "../data/bureau";
import useDocumentTitle from "../lib/useDocumentTitle";
import { allStatements } from "../lib/statements";

export default function Home() {
  useDocumentTitle();
  const latest = allStatements.slice(0, 3);

  return (
    <>
      <section className="hero">
        <Container className="hero__inner">
          <div className="hero__flags">
            <WavingFlag flag="ajk" className="hero__flag hero__flag--left" />
            <WavingFlag
              flag="jklf"
              className="hero__flag hero__flag--right"
              delay="-1.3s"
            />
          </div>
          <div className="hero__text">
            <span className="hero__eyebrow">
              Jammu Kashmir Liberation Front
            </span>
            <h1>Diplomatic Bureau</h1>
            <p className="hero__lead">
              Representing the Kashmiri nation to governments, international
              organisations, the media and the diaspora. We work for the
              reunification of the whole State of Jammu Kashmir as a free,
              sovereign and democratic country.
            </p>
            <div className="hero__actions">
              <Button to="/position" size="large" variant="white">
                Our position <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button to="/contact" size="large" variant="hero-outline">
                Contact the bureau
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <Container>
          <SectionHeader
            eyebrow="What we do"
            title="Working with the international community"
            description={bureau.description}
          />
          <div className="audience-grid">
            {audiences.map((item) => (
              <article key={item.id} className="audience-card">
                <AudienceIcon name={item.icon} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Link
                  className="text-link"
                  to={item.to || `/contact?as=${item.id}`}
                >
                  {item.action} <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="soft">
        <Container>
          <SectionHeader
            eyebrow="Our position"
            title="The Kashmir question, in brief"
          />
          <ol className="position-list position-list--compact">
            {positionPoints.slice(0, 3).map((point) => (
              <li key={point.number}>
                <span className="position-list__number">{point.number}</span>
                <div>
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <Button to="/position" variant="outline">
            Read our full position <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </Container>
      </Section>

      <Section variant="dark" className="home-bureau">
        <Container>
          <div className="home-bureau__grid">
            <figure className="home-bureau__photo">
              <img
                src="/images/bureau-meeting.jpg"
                alt="Members of the JKLF Diplomatic Bureau at a meeting, seated beneath a JKLF banner"
                width="1400"
                height="1050"
                loading="lazy"
              />
            </figure>
            <div className="home-bureau__text">
              <span className="ui-eyebrow">The Bureau</span>
              <h2>{bureau.name}</h2>
              <p>{bureau.description}</p>
              <ul className="home-bureau__people">
                {[head, ...members].map((person) => (
                  <li key={person.name}>
                    <img src={person.image} alt="" width="56" height="56" />
                    <span>
                      <strong>{person.name}</strong>
                      <span>
                        {person.role}
                        {person.location ? `, ${person.location}` : ""}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <Button to="/bureau" variant="white">
                Meet the bureau <ArrowRight size={17} aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="section-row">
            <SectionHeader
              eyebrow="Statements"
              title="Latest from the Bureau"
            />
            <Link className="text-link" to="/statements">
              All statements <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          {latest.length > 0 ? (
            <div className="statement-grid">
              {latest.map((item) => (
                <StatementCard key={item.slug} item={item} />
              ))}
            </div>
          ) : (
            <NoStatements />
          )}
        </Container>
      </Section>

      <Section variant="soft">
        <Container>
          <div className="section-row">
            <SectionHeader
              eyebrow="Documents"
              title="Documents & references"
              description="Founding documents and reference material for governments, researchers and journalists."
            />
            <Link className="text-link" to="/documents">
              All documents <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <DocumentList items={documents} className="document-list--grid" />
        </Container>
      </Section>

      <NewsletterSignup />
    </>
  );
}
