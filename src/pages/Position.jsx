import { ArrowUpRight } from "lucide-react";

import PageHeader from "../components/PageHeader";
import { Button, Container, Section } from "../components/ui";
import { MAIN_SITE, positionPoints } from "../data/bureau";
import useDocumentTitle from "../lib/useDocumentTitle";

export default function Position() {
  useDocumentTitle("Our Position");

  return (
    <>
      <PageHeader
        eyebrow="Our position"
        title="One nation, forcibly divided since 1947"
        lead="JKLF's objective is national independence: to reunite the whole State of Jammu Kashmir, on both sides of the dividing line, as a free, sovereign and democratic country, with a dignified place among the nations of the world."
      />

      <Section>
        <Container narrow>
          <ol className="position-list">
            {positionPoints.map((point) => (
              <li key={point.number}>
                <span className="position-list__number">{point.number}</span>
                <div>
                  <h2>{point.title}</h2>
                  <p>{point.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="callout">
            <h2>The full position</h2>
            <p>
              JKLF's complete position, its political framework and the
              principles of a future government are set out on the main
              JKLF website and in the Constitution.
            </p>
            <div className="callout__actions">
              <Button href={`${MAIN_SITE}/position`} variant="primary">
                Our Position on jklf.org <ArrowUpRight size={17} aria-hidden="true" />
              </Button>
              <Button to="/documents" variant="secondary">
                Documents
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
