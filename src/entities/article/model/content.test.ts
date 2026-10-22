import { describe, expect, it } from "vitest";
import {
  countArticleWords,
  countHeadings,
  countKeywordOccurrences,
  findBannedClaims,
  findInternalLinks,
  poolCageCostArticle,
  screenEnclosureCostArticle,
} from "../index";

const article = screenEnclosureCostArticle;

describe("бриф статьи про стоимость", () => {
  it("держит объём в пределах 400–500 слов", () => {
    const words = countArticleWords(article);

    expect(words).toBeGreaterThanOrEqual(400);
    expect(words).toBeLessThanOrEqual(500);
  });

  it("использует ключ в первом абзаце и ещё 1–3 раза", () => {
    expect(article.lead.toLowerCase()).toContain(article.primaryKeyword.toLowerCase());

    const occurrences = countKeywordOccurrences(article);

    expect(occurrences).toBeGreaterThanOrEqual(2);
    expect(occurrences).toBeLessThanOrEqual(4);
  });

  it("укладывает Title и description в лимиты выдачи", () => {
    expect(article.title.length).toBeLessThanOrEqual(60);
    expect(article.description.length).toBeLessThanOrEqual(155);
  });

  it("держит один H1 и 4–5 H2", () => {
    expect(article.h1).toHaveLength(article.h1.length);

    const h2 = countHeadings(article);

    expect(h2).toBeGreaterThanOrEqual(4);
    expect(h2).toBeLessThanOrEqual(5);
  });

  it("не содержит запрещённых заявлений", () => {
    expect(findBannedClaims(article)).toEqual([]);
  });

  it("размечает внутренние ссылки и slug", () => {
    expect(findInternalLinks(article).length).toBeGreaterThanOrEqual(1);
    expect(findInternalLinks(article)[0]?.href).toMatch(/^\//);
    expect(article.slug).toMatch(/^(\/[a-z0-9-]+)+$/);
  });
});

describe("вторая статья", () => {
  it("тоже укладывается в лимиты Title и description", () => {
    expect(poolCageCostArticle.title.length).toBeLessThanOrEqual(60);
    expect(poolCageCostArticle.description.length).toBeLessThanOrEqual(155);
    expect(findBannedClaims(poolCageCostArticle)).toEqual([]);
  });
});
