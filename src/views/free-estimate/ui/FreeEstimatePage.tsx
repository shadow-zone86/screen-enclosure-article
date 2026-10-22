import { Container } from "@shared/ui/Container";
import { EstimateForm } from "@features/request-estimate";
import { SITE } from "@shared/config/constants";
import { FREE_ESTIMATE_TEXT } from "../config/constants";
import styles from "./FreeEstimatePage.module.scss";

export function FreeEstimatePage() {
  return (
    <Container>
      <main id="main" className={styles.page}>
        <span className={styles.eyebrow}>{FREE_ESTIMATE_TEXT.eyebrow}</span>
        <h1 className={styles.title}>{FREE_ESTIMATE_TEXT.title}</h1>
        <p className={styles.lead}>{FREE_ESTIMATE_TEXT.lead}</p>

        <EstimateForm />

        <p className={styles.note}>
          {FREE_ESTIMATE_TEXT.notePrefix} {SITE.serviceArea.join(", ")} · {SITE.phone}
        </p>
      </main>
    </Container>
  );
}
