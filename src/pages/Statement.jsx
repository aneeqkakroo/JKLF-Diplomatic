import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { marked } from "marked";

import { Badge, Container, Section } from "../components/ui";
import { findStatement } from "../lib/statements";
import useDocumentTitle from "../lib/useDocumentTitle";

// Statements are plain text. Escape any HTML, then let Markdown handle
// paragraphs, line breaks, links, bold text and lists.
function renderBody(text) {
  const escaped = String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return marked.parse(escaped, { breaks: true });
}

export default function Statement() {
  const { slug } = useParams();
  const item = findStatement(slug);

  useDocumentTitle(item ? item.title : "Statements");

  return (
    <Section>
      <Container narrow>
        <Link className="text-link back-link" to="/statements">
          <ArrowLeft size={16} aria-hidden="true" /> All statements
        </Link>

        {!item && (
          <p className="notice">
            This statement could not be found. It may have been removed.
          </p>
        )}

        {item && (
          <article className="article">
            <div className="statement-card__meta">
              <Badge
                variant={
                  item.category === "Press Release" ? "accent" : "primary"
                }
              >
                {item.category}
              </Badge>
              <time dateTime={item.isoDate}>{item.date}</time>
            </div>
            <h1>{item.title}</h1>
            {item.image && (
              <img
                className="article__image"
                src={item.image}
                alt={item.imageAlt}
              />
            )}
            <div
              className="article__body"
              dangerouslySetInnerHTML={{ __html: renderBody(item.body) }}
            />
          </article>
        )}
      </Container>
    </Section>
  );
}
