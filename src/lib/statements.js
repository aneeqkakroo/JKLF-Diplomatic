// Diplomatic Bureau statements from src/data/statements.js, ready to display.

import { statements } from "../data/statements.js";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);

  return `${day} ${MONTHS[month - 1]} ${year}`;
}

const plainText = (text) =>
  String(text)
    .replace(/[#>*_`[\]]/g, "")
    .replace(/\([^)]*\)/g, (match) => (match.startsWith("(http") ? "" : match))
    .replace(/\s+/g, " ")
    .trim();

// Short summary from the first real paragraph of the statement.
function summarise(body, limit = 200) {
  const paragraphs = String(body).split(/\n\s*\n/).map(plainText).filter(Boolean);
  const plain = paragraphs.find((text) => text.length >= 80) || paragraphs[0] || "";

  if (plain.length <= limit) {
    return plain;
  }

  const cut = plain.slice(0, limit);
  const space = cut.lastIndexOf(" ");

  return `${cut.slice(0, space > 120 ? space : limit)}…`;
}

export const allStatements = statements
  .map((item) => ({
    ...item,
    category: item.category || "Statement",
    isoDate: item.date,
    date: formatDate(item.date),
    excerpt: item.summary || summarise(item.body),
    imageAlt: item.imageAlt || "",
  }))
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export function findStatement(slug) {
  return allStatements.find((item) => item.slug === slug) || null;
}
