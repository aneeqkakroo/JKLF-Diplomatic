import { Button, Container, Section } from "../components/ui";
import useDocumentTitle from "../lib/useDocumentTitle";

export default function NotFound() {
  useDocumentTitle("Page not found");

  return (
    <Section>
      <Container narrow>
        <h1>Page not found</h1>
        <p>The page you were looking for does not exist.</p>
        <Button to="/">Go to the home page</Button>
      </Container>
    </Section>
  );
}
