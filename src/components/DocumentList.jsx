import { ArrowUpRight, FileText, Globe } from "lucide-react";

// Documents and reference links, used on the Documents page and the home page.
export default function DocumentList({ items, className = "" }) {
  return (
    <ul className={`document-list ${className}`}>
      {items.map((doc) => {
        const isPdf = doc.type === "PDF";
        const Icon = isPdf ? FileText : Globe;

        return (
          <li key={doc.title}>
            <a
              href={doc.href}
              {...(isPdf ? { target: "_blank", rel: "noopener" } : {})}
            >
              <Icon size={26} aria-hidden="true" />
              <span className="document-list__text">
                <strong>{doc.title}</strong>
                <span>{doc.description}</span>
              </span>
              <span className="document-list__type">
                {doc.type} <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
