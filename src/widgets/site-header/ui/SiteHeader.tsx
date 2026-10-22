import Link from "next/link";
import { Button } from "@shared/ui/Button";
import { Container } from "@shared/ui/Container";
import { ESTIMATE_HREF, NAV_LINKS, SITE } from "@shared/config/constants";
import { SITE_HEADER_TEXT } from "../config/constants";
import styles from "./SiteHeader.module.scss";

export function SiteHeader() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link className={styles.brand} href="/">
          <span className={styles.mark} aria-hidden="true">
            {SITE_HEADER_TEXT.mark}
          </span>
          {SITE.name}
        </Link>
        <nav className={styles.nav} aria-label="Main">
          {NAV_LINKS.map((link) => (
            <Link className={styles.link} key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Button href={ESTIMATE_HREF} variant="ghost">
            {SITE_HEADER_TEXT.estimateLabel}
          </Button>
        </nav>
      </Container>
    </header>
  );
}
