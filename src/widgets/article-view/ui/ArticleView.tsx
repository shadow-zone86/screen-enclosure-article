import type { ReactNode } from "react";
import type { Article } from "@entities/article";
import { Container } from "@shared/ui/Container";
import { ArticleJsonLd } from "@shared/ui/JsonLd";
import { SITE } from "@shared/config/site";
import { formatMonthYear } from "@shared/lib/format-date";
import { ArticleBlockView } from "./components/ArticleBlocks";
import styles from "./ArticleView.module.scss";

type ArticleViewProps = {
  article: Article;
  aside?: ReactNode;
};

export function ArticleView({ article, aside }: ArticleViewProps) {
  return (
    <Container>
      <ArticleJsonLd
        headline={article.h1}
        description={article.description}
        slug={article.slug}
        datePublished={article.publishedAt}
        dateModified={article.modifiedAt}
      />

      <header className={styles.hero}>
        <span className={styles.eyebrow}>Cost guide</span>
        <h1 className={styles.title}>{article.h1}</h1>
        <div className={styles.byline}>
          <span>Updated {formatMonthYear(article.modifiedAt)}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>{article.readingTime}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>Serving {SITE.serviceArea.join(", ")}</span>
        </div>
      </header>

      <main id="main" className={styles.body}>
        <p className={styles.lead}>{article.lead}</p>
        {article.blocks.map((block, index) => (
          <ArticleBlockView key={index} block={block} />
        ))}
        {aside}
      </main>
    </Container>
  );
}
