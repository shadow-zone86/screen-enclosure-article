---
name: skripka-content-seo
description: >-
  Applies the content and SEO rules of this project: article copy lives in
  entities/article/model as typed blocks, brief constraints (400–500 words,
  keyword once in the lead and 2–4 total, Title ≤ 60, description ≤ 155, 4–5 H2,
  no best/cheapest/number one, internal links, CTA with free on-site measurement),
  EditorNotes panel, Article JSON-LD, metadata and canonical. Use when editing
  article text, SEO fields, slug, title, meta description, JSON-LD, or when the
  user mentions статья, контент, бриф, ключ, Title, description, slug, CTA,
  EditorNotes, разметка, перелинковка.
---

# Контент и SEO

## Где текст

`src/entities/article/model/<slug>.ts` — объект `Article`: `h1`, `title`, `description`,
`primaryKeyword`, `slug`, даты, `lead`, `blocks`. Никакого текста в JSX.

Типы блоков (`model/types.ts`):

- `heading` — H2 с `id` для анкоров;
- `paragraph` — обычный абзац;
- `list` — пункты `{ lead, text }` (жирный лид + пояснение);
- `table` — `caption` + `rows: PriceRow[]`; `href` в строке делает её внутренней ссылкой;
- `cta` — финальный блок с кнопкой на `/free-estimate`.

`lead` — вводный абзац 50–80 слов, в нём ключ обязан встретиться.

## Бриф (проверяется тестом `model/content.test.ts`)

| Требование | Как проверяется |
|-----------|-----------------|
| 400–500 слов | `countArticleWords(article)` |
| ключ в лиде и 2–4 раза всего | `article.lead.includes(keyword)`, `countKeywordOccurrences` |
| Title ≤ 60, description ≤ 155 | `.length` |
| 4–5 H2 | `countHeadings(article)` |
| без «best», «cheapest», «number one» | `findBannedClaims(article)` |
| 2 внутренние ссылки | строка таблицы с `href` + CTA-кнопка `/free-estimate` |
| slug латиницей через дефис | `/^(\/[a-z0-9-]+)+$/` |

Требования меняются только вместе с тестом и `EditorNotes` — это один источник правды.

## Метаданные

- `src/views/<slice>/model/seo.ts` — `Metadata`: `title: { absolute }` (чтобы шаблон
  `%s | Gulf Coast Screen` не ломал лимит 60), `description`, `keywords`,
  `alternates.canonical`, `openGraph` (`type: "article"`, даты), при необходимости `twitter`.
- `ArticleJsonLd` (`shared/ui/JsonLd`) получает примитивы, а не entity, и берёт домен из `SITE`.
- `sitemap.ts` и `robots.ts` строятся из `SITE.url` и slug-ов статей.

## Тон

- Английский, факты из брифа (цены, сроки, 130+ mph, гарантии 10/5/365).
- Без превосходных степеней и обещаний «лучший/самый дешёвый».
- CTA в конце: бесплатный замер с выездом и 3D-визуализацией.

## Служебная панель

`widgets/editor-notes` — `<details>` с живыми цифрами: длины Title/description,
слов, вхождений ключа, H2, ссылки, запрещённые заявления. Монтируется только на
странице статьи про стоимость, передаётся в `ArticleView` пропом `aside`.
