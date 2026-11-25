import { useState } from "react";

import PageHeader from "../components/PageHeader";
import { NoStatements, StatementCard } from "../components/StatementList";
import { Container, Section } from "../components/ui";
import useDocumentTitle from "../lib/useDocumentTitle";
import { allStatements as news } from "../lib/statements";

const ALL = "All";

export default function Statements() {
  useDocumentTitle("Statements");
  const [category, setCategory] = useState(ALL);

  const categories = [ALL, ...new Set(news.map((item) => item.category))];
  const shown =
    category === ALL ? news : news.filter((item) => item.category === category);

  return (
    <>
      <PageHeader
        eyebrow="Statements"
        title="Statements & press releases"
        lead="Official statements of the JKLF Diplomatic Bureau."
      />

      <Section>
        <Container>
          {categories.length > 2 && (
            <div className="filters" role="group" aria-label="Filter by type">
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`filter ${name === category ? "filter--active" : ""}`}
                  aria-pressed={name === category}
                  onClick={() => setCategory(name)}
                >
                  {name}
                </button>
              ))}
            </div>
          )}

          {shown.length === 0 && <NoStatements />}

          {shown.length > 0 && (
            <div className="statement-grid">
              {shown.map((item) => (
                <StatementCard key={item.slug} item={item} />
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
