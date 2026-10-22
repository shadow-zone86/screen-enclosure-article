import type { PriceRow } from "@shared/model/types";

export type ArticleBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { lead: string; text: string }[] }
  | { type: "table"; caption: string; rows: PriceRow[] }
  | { type: "cta"; title: string; text: string };

/**
 * Статья как данные: страница только раскладывает блоки по компонентам,
 * поэтому текст можно отдать из CMS, не трогая вёрстку.
 */
export type Article = {
  slug: `/${string}`;
  h1: string;
  title: string;
  description: string;
  primaryKeyword: string;
  publishedAt: string;
  modifiedAt: string;
  readingTime: string;
  lead: string;
  blocks: ArticleBlock[];
};
