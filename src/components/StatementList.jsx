import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Badge } from "./ui";

export function StatementCard({ item }) {
  return (
    <article className="statement-card">
      <div className="statement-card__meta">
        <Badge variant={item.category === "Press Release" ? "accent" : "primary"}>
          {item.category}
        </Badge>
        <time dateTime={item.isoDate}>{item.date}</time>
      </div>
      <h3>
        <Link to={`/statements/${item.slug}`}>{item.title}</Link>
      </h3>
      {item.excerpt && <p>{item.excerpt}</p>}
      <Link className="text-link" to={`/statements/${item.slug}`}>
        Read statement <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </article>
  );
}

export function NoStatements() {
  return <p className="notice">The Diplomatic Bureau has not published any statements yet.</p>;
}
