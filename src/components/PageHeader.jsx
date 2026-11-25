import { Container } from "./ui";

// Dark green band at the top of inner pages, with a red band at the foot.
export default function PageHeader({ eyebrow, title, lead }) {
  return (
    <section className="page-header">
      <Container>
        {eyebrow && <span className="page-header__eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {lead && <p className="page-header__lead">{lead}</p>}
      </Container>
    </section>
  );
}
