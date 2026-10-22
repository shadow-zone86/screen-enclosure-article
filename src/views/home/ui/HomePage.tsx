import Link from "next/link";
import { Container } from "@shared/ui/Container";
import { SITE } from "@shared/config/constants";
import { HOME_CARDS, HOME_PAGE_TEXT } from "../config/constants";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <Container>
      <main id="main" className={styles.landing}>
        <span className={styles.eyebrow}>{SITE.shortName}</span>
        <h1 className={styles.title}>{HOME_PAGE_TEXT.title}</h1>
        <p className={styles.lead}>
          {HOME_PAGE_TEXT.leadPrefix} {SITE.serviceArea.join(", ")}. {HOME_PAGE_TEXT.leadSuffix}
        </p>

        <ul className={styles.cards}>
          {HOME_CARDS.map((card) => (
            <li key={card.href}>
              <Link className={styles.card} href={card.href}>
                <span className={styles.cardLabel}>{card.label}</span>
                <span className={styles.cardTitle}>{card.title}</span>
                <span className={styles.cardText}>{card.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </Container>
  );
}
