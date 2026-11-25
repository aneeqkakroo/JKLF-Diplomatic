import { useEffect } from "react";

const SITE_NAME = "JKLF Diplomatic Bureau";

// Sets the browser tab title, e.g. "Statements | JKLF Diplomatic Bureau".
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  }, [title]);
}
