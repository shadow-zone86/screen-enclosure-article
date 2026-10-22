import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { screenEnclosureCostArticle as article } from "@entities/article";
import { ArticleView } from "./ArticleView";

describe("страница статьи", () => {
  it("рендерит один H1 из данных статьи", () => {
    render(<ArticleView article={article} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(article.h1);
  });

  it("выводит таблицу цен и ведёт ссылкой на статью про pool cage", () => {
    render(<ArticleView article={article} />);

    const table = screen.getByRole("table");

    expect(within(table).getByRole("link", { name: "Pool cage" })).toHaveAttribute(
      "href",
      "/blog/pool-cage-cost",
    );
  });

  it("закрывается CTA со ссылкой на бесплатный замер", () => {
    render(<ArticleView article={article} />);

    expect(screen.getByRole("link", { name: "Request a free estimate" })).toHaveAttribute(
      "href",
      "/free-estimate",
    );
  });

  it("отдаёт Article JSON-LD с тем же заголовком", () => {
    const { container } = render(<ArticleView article={article} />);
    const script = container.querySelector('script[type="application/ld+json"]');

    expect(script).not.toBeNull();
    expect(JSON.parse(script?.textContent ?? "{}").headline).toBe(article.h1);
  });
});
