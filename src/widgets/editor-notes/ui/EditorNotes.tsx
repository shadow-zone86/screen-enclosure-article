import {
  countArticleWords,
  countHeadings,
  countKeywordOccurrences,
  findBannedClaims,
  findInternalLinks,
  type Article,
} from "@entities/article";
import { ESTIMATE_HREF } from "@shared/config/constants";
import { EDITOR_NOTES_TARGET, EDITOR_NOTES_TEXT } from "../config/constants";
import { useRangeStatus } from "../lib/hooks/useRangeStatus";
import styles from "./EditorNotes.module.scss";

export function EditorNotes({ article }: { article: Article }) {
  const words = countArticleWords(article);
  const keyword = countKeywordOccurrences(article);
  const h2 = countHeadings(article);
  const banned = findBannedClaims(article);
  const links = [
    ...findInternalLinks(article),
    { anchor: EDITOR_NOTES_TEXT.ctaAnchor, href: ESTIMATE_HREF },
  ];

  const titleStatus = useRangeStatus(article.title.length, 1, EDITOR_NOTES_TARGET.titleLimit);
  const descriptionStatus = useRangeStatus(
    article.description.length,
    1,
    EDITOR_NOTES_TARGET.descriptionLimit,
  );
  const keywordStatus = useRangeStatus(
    keyword,
    EDITOR_NOTES_TARGET.minKeyword,
    EDITOR_NOTES_TARGET.maxKeyword,
  );
  const wordsStatus = useRangeStatus(
    words,
    EDITOR_NOTES_TARGET.minWords,
    EDITOR_NOTES_TARGET.maxWords,
  );

  return (
    <details className={styles.panel}>
      <summary className={styles.summary}>{EDITOR_NOTES_TEXT.summary}</summary>
      <dl className={styles.list}>
        <dt>{EDITOR_NOTES_TEXT.title}</dt>
        <dd>
          {article.title} <span className={styles[titleStatus]}>({article.title.length})</span>
        </dd>
        <dt>{EDITOR_NOTES_TEXT.description}</dt>
        <dd>
          {article.description}{" "}
          <span className={styles[descriptionStatus]}>({article.description.length})</span>
        </dd>
        <dt>{EDITOR_NOTES_TEXT.slug}</dt>
        <dd>
          <code>{article.slug}</code>
        </dd>
        <dt>{EDITOR_NOTES_TEXT.keyword}</dt>
        <dd>
          «{article.primaryKeyword}» — <span className={styles[keywordStatus]}>{keyword}</span>{" "}
          {EDITOR_NOTES_TEXT.keywordSuffix}
        </dd>
        <dt>{EDITOR_NOTES_TEXT.volume}</dt>
        <dd>
          <span className={styles[wordsStatus]}>{words}</span> {EDITOR_NOTES_TEXT.volumeSuffix} {h2}
        </dd>
        <dt>{EDITOR_NOTES_TEXT.internalLinks}</dt>
        <dd>
          {links.map((link) => (
            <span className={styles.link} key={link.href}>
              «{link.anchor}» → <code>{link.href}</code>
            </span>
          ))}
        </dd>
        <dt>{EDITOR_NOTES_TEXT.bannedClaims}</dt>
        <dd>
          {banned.length === 0 ? (
            <span className={styles.ok}>{EDITOR_NOTES_TEXT.bannedNone}</span>
          ) : (
            <span className={styles.warn}>{banned.join(", ")}</span>
          )}
        </dd>
      </dl>
    </details>
  );
}
