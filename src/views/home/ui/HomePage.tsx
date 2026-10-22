import Link from "next/link";
import { Container } from "@shared/ui/Container";
import { SITE } from "@shared/config/site";
import { HOME_CARDS } from "../model/cards";
import styles from "./HomePage.module.scss";

export function HomePage() {
  return (
    <Container>
      <main id="main" className={styles.landing}>
        <span className={styles.eyebrow}>{SITE.shortName}</span>
        <h1 className={styles.title}>Screened pools and patios, built for Florida weather</h1>
        <p className={styles.lead}>
          We design, engineer, permit, and install aluminum screen enclosures across{" "}
          {SITE.serviceArea.join(", ")}. Start with the cost guide, then book a free on-site
          measurement.
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
