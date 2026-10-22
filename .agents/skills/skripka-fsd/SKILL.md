---
name: skripka-fsd
description: >-
  Applies the project's Feature-Sliced Design rules for Next.js App Router:
  layers app/views/widgets/features/entities/shared, import graph, public API via
  index.ts, views instead of pages, metadata re-export from a view, entity↛entity
  and widget↛widget/feature↛feature bans. Use when adding slices, wiring views,
  reviewing imports, or when the user mentions FSD, слои, срезы, public API,
  границы импортов, deep-import, views, маршрут, metadata, Next App Router.
---

# FSD в этом репозитории

## Слои

```
src/app       → маршруты Next, layout, sitemap, robots, icon
src/views     → страницы-слайсы (в FSD это pages)
src/widgets   → самостоятельные блоки UI
src/features  → действия пользователя
src/entities  → предметная область (article)
src/shared    → дизайн-кит, стили, конфиг, lib
```

Импорт разрешён только «вниз»: `app → views → widgets → features → entities → shared`.
Слайсы одного слоя не импортируют друг друга напрямую.

## Почему views

Next трактует `src/pages` как Pages Router и падает на конфликте маршрутов с App Router.
Слой страниц называется `src/views`, алиас — `@views/*`. Это осознанное отклонение от FSD,
зафиксировано в README и AGENTS.md.

## Public API

- Каждый слайс отдаёт наружу только `index.ts`; внутренние сегменты (`ui/`, `model/`, `lib/`, `config/`) — приватные.
- Глубокие импорты (`@/widgets/site-header/ui/...`) запрещены ESLint (`no-restricted-imports`).
- `ui/components/*` — приватные части головного TSX, из `index.ts` не экспортируются
  (это же правило проверяет `no-restricted-syntax`).
- `metadata` и компонент страницы реэкспортируются из `index.ts` слайса:
  route-файл в `src/app` импортирует `@views/<slice>` и делает
  `export const metadata: Metadata = pageMetadata`.
- CSS-модули не реэкспортируются из public API.

## Route-файл

```tsx
import type { Metadata } from "next";
import { ScreenEnclosureCostPage, metadata as pageMetadata } from "@views/screen-enclosure-cost";

export const metadata: Metadata = pageMetadata;

export default function Page() {
  return <ScreenEnclosureCostPage />;
}
```

Route-файл ничего не верстает и не считает: только реэкспорт и рендер.

## Что где лежит

- `src/app/layout.tsx` — `<html lang="en">`, skip-link, `SiteHeader`/`SiteFooter`, импорт `@shared/styles/main.scss`.
- `src/app/sitemap.ts` / `robots.ts` — URL берут из `SITE` и slug-ов статей, не из литералов;
  маршруты и правила — в `src/app/config/constants.ts`.
- `src/app/_*` не создавать: приватные компоненты живут в слоях, а не рядом с маршрутами.
- Сегменты слайса: `model/types.ts` — типы, `lib/` — логика и хуки, `config/constants.ts` —
  константы и тексты, `config/seo.ts` — metadata. Детали — в скилле `skripka-slice`.
