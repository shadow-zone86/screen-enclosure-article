import Link from "next/link";
import { screenEnclosureCostArticle } from "@entities/article";
import { ESTIMATE_HREF } from "@shared/config/constants";
import { Container } from "@shared/ui/Container";
import { NOT_FOUND_TEXT } from "./config/constants";

export default function NotFound() {
  return (
    <Container>
      <main id="main">
        <h1>{NOT_FOUND_TEXT.title}</h1>
        <p>
          {NOT_FOUND_TEXT.lead}{" "}
          <Link href={screenEnclosureCostArticle.slug}>{NOT_FOUND_TEXT.costGuideLink}</Link>{" "}
          {NOT_FOUND_TEXT.middle} <Link href={ESTIMATE_HREF}>{NOT_FOUND_TEXT.estimateLink}</Link>.
        </p>
      </main>
    </Container>
  );
}
