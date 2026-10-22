import { Container } from "@shared/ui/Container";
import { SITE } from "@shared/config/site";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <span>{SITE.serviceArea.join(" · ")}</span>
        <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a>
      </Container>
    </footer>
  );
}
