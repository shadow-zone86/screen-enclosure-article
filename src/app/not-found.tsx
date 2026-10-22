import Link from "next/link";
import { Container } from "@shared/ui/Container";

export default function NotFound() {
  return (
    <Container>
      <main id="main">
        <h1>Page not found</h1>
        <p>
          The page you are looking for has moved. Start from the{" "}
          <Link href="/blog/screen-enclosure-cost-florida">screen enclosure cost guide</Link> or
          book a <Link href="/free-estimate">free on-site estimate</Link>.
        </p>
      </main>
    </Container>
  );
}
