import DocumentList from "../components/DocumentList";
import PageHeader from "../components/PageHeader";
import { Container, Section } from "../components/ui";
import { documents } from "../data/bureau";
import useDocumentTitle from "../lib/useDocumentTitle";

export default function Documents() {
  useDocumentTitle("Documents");

  return (
    <>
      <PageHeader
        eyebrow="Documents"
        title="Documents & references"
        lead="Founding documents and reference material for governments, researchers and journalists."
      />

      <Section>
        <Container narrow>
          <DocumentList items={documents} />
        </Container>
      </Section>
    </>
  );
}
