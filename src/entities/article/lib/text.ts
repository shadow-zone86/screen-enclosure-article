import { BANNED_CLAIMS } from "../config/constants";
import type { Article, ArticleBlock } from "../model/types";

function blockText(block: ArticleBlock): string {
  switch (block.type) {
    case "heading":
    case "paragraph":
      return block.text;
    case "list":
      return block.items.map((item) => `${item.lead} ${item.text}`).join(" ");
    case "table":
      return [block.caption, ...block.rows.map((row) => `${row.name} ${row.qualifier ?? ""} ${row.value}`)]
        .join(" ")
        .trim();
    case "cta":
      return `${block.title} ${block.text}`;
    default:
      return "";
  }
}

function articleText(article: Article): string {
  return [article.h1, article.lead, ...article.blocks.map(blockText)].join(" ");
}

export function countArticleWords(article: Article): number {
  return articleText(article)
    .split(/\s+/)
    .filter(Boolean).length;
}

export function countKeywordOccurrences(article: Article, keyword = article.primaryKeyword): number {
  const haystack = articleText(article).toLowerCase();
  const needle = keyword.toLowerCase();
  let count = 0;
  let index = haystack.indexOf(needle);

  while (index !== -1) {
    count += 1;
    index = haystack.indexOf(needle, index + needle.length);
  }

  return count;
}

export function countHeadings(article: Article, level: "h2" | "h3" = "h2"): number {
  if (level === "h3") return 0;
  // CTA тоже рендерится как H2 (`CtaBanner`), поэтому считаем его вместе с секциями,
  // чтобы цифра в панели редактора совпадала с разметкой страницы.
  return article.blocks.filter((block) => block.type === "heading" || block.type === "cta").length;
}

export function findBannedClaims(article: Article): string[] {
  const haystack = articleText(article).toLowerCase();
  return BANNED_CLAIMS.filter((claim) => haystack.includes(claim));
}

export function findInternalLinks(article: Article): { anchor: string; href: string }[] {
  return article.blocks.flatMap((block) => {
    if (block.type !== "table") return [];
    return block.rows.flatMap((row) =>
      row.href ? [{ anchor: row.name, href: row.href }] : [],
    );
  });
}
