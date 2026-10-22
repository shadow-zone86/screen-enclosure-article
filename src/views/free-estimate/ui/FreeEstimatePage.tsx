import { Container } from "@shared/ui/Container";
import { EstimateForm } from "@features/request-estimate";
import { SITE } from "@shared/config/site";
import styles from "./FreeEstimatePage.module.scss";

export function FreeEstimatePage() {
  return (
    <Container>
      <main id="main" className={styles.page}>
        <span className={styles.eyebrow}>Free estimate</span>
        <h1 className={styles.title}>Book a free on-site measurement</h1>
        <p className={styles.lead}>
          We measure the opening, review your roof and HOA rules, and show a 3D visualization of
          the finished enclosure. Most visits take about 40 minutes, and there is no obligation.
        </p>

        <EstimateForm />

        <p className={styles.note}>
          Serving {SITE.serviceArea.join(", ")} · {SITE.phone}
        </p>
      </main>
    </Container>
  );
}
