import {
  countArticleWords,
  countHeadings,
  countKeywordOccurrences,
  findBannedClaims,
  findInternalLinks,
  type Article,
} from "@entities/article";
import { ESTIMATE_HREF } from "@shared/config/site";
import styles from "./EditorNotes.module.scss";

const TARGET = {
  minWords: 400,
  maxWords: 500,
  minKeyword: 2,
  maxKeyword: 4,
  titleLimit: 60,
  descriptionLimit: 155,
} as const;

function within(value: number, min: number, max: number) {
  return value >= min && value <= max ? styles.ok : styles.warn;
}

/** Служебная панель для сдачи задания: цифры считаются из самого контента. */
export function EditorNotes({ article }: { article: Article }) {
  const words = countArticleWords(article);
  const keyword = countKeywordOccurrences(article);
  const h2 = countHeadings(article);
  const banned = findBannedClaims(article);
  const links = [...findInternalLinks(article), { anchor: "Request a free estimate", href: ESTIMATE_HREF }];

  return (
    <details className={styles.panel}>
      <summary className={styles.summary}>
        SEO-поля и заметки для редактора (служебная панель)
      </summary>
      <dl className={styles.list}>
        <dt>Title</dt>
        <dd>
          {article.title}{" "}
          <span className={within(article.title.length, 1, TARGET.titleLimit)}>
            ({article.title.length})
          </span>
        </dd>
        <dt>Meta description</dt>
        <dd>
          {article.description}{" "}
          <span className={within(article.description.length, 1, TARGET.descriptionLimit)}>
            ({article.description.length})
          </span>
        </dd>
        <dt>URL slug</dt>
        <dd>
          <code>{article.slug}</code>
        </dd>
        <dt>Основной ключ</dt>
        <dd>
          «{article.primaryKeyword}» —{" "}
          <span className={within(keyword, TARGET.minKeyword, TARGET.maxKeyword)}>{keyword}</span>{" "}
          вхождения
        </dd>
        <dt>Объём</dt>
        <dd>
          <span className={within(words, TARGET.minWords, TARGET.maxWords)}>{words}</span> слов · H1
          — 1 · H2 — {h2}
        </dd>
        <dt>Внутренние ссылки</dt>
        <dd>
          {links.map((link) => (
            <span className={styles.link} key={link.href}>
              «{link.anchor}» → <code>{link.href}</code>
            </span>
          ))}
        </dd>
        <dt>Запрещённые заявления</dt>
        <dd>
          {banned.length === 0 ? (
            <span className={styles.ok}>не найдены</span>
          ) : (
            <span className={styles.warn}>{banned.join(", ")}</span>
          )}
        </dd>
      </dl>
    </details>
  );
}
