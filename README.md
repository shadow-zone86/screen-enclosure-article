# screen-enclosure-article

Демо-сайт к тестовому заданию контент-менеджера: SEO-статья **How Much Does a Screen Enclosure Cost in Florida?**
плюс посадочные страницы, форма бесплатного замера и служебная панель с проверкой SEO-полей.

Сайт — не статический макет: статья хранится как данные, а требования брифа (объём, вхождения ключа,
лимиты Title/description, запрещённые формулировки) проверяются тестами и считаются в UI.

**Стек:** Next.js 16.4 (App Router, Turbopack), React 19.3, TypeScript 5.9, SCSS Modules,
Zod-подобная ручная валидация формы, Storybook 10, Vitest 4, ESLint 9 + cspell, Stylelint, Knip, Husky.
**Архитектура:** Feature-Sliced Design; границы импортов между слоями и слайсами проверяет ESLint (`eslint.config.mjs`).
**Деплой:** Vercel (статический prerender всех страниц).

## Запуск

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production-сборка
npm start          # локальный просмотр сборки
```

Node.js ≥ 20.9. Переменные окружения не обязательны: без `NEXT_PUBLIC_SITE_URL` канонические
URL и sitemap собираются от `https://screen-enclosure-article.vercel.app` (`src/shared/config/constants.ts`).

```bash
cp .env.example .env.local
```

## Скрипты

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Next dev (Turbopack) |
| `npm run build` / `npm start` | production-сборка и её просмотр |
| `npm run type-check` | `tsc --noEmit` |
| `npm run lint` | ESLint: FSD-границы, `max-lines`, cspell в коде, русские названия тестов |
| `npm run lint:style` | Stylelint для SCSS |
| `npm run spell` | cspell по всему проекту (включая `*.md` и `.agents/`) |
| `npm run knip` | неиспользуемые зависимости, файлы, экспорты |
| `npm test` | Vitest (jsdom + Testing Library) |
| `npm run test:watch` / `test:coverage` | watch и покрытие |
| `npm run storybook` | Storybook на :6006 |
| `npm run build-storybook` | статическая сборка Storybook |
| `npm run pre-commit` | type-check → eslint → stylelint → knip → test → build (Husky) |

## Маршруты

| Путь | Что показывает |
|------|----------------|
| `/` | витрина: три карточки-ссылки на материалы и замер |
| `/blog/screen-enclosure-cost-florida` | основная статья задания + служебная панель SEO-полей |
| `/blog/pool-cage-cost` | вторая статья (внутренняя перелинковка) |
| `/free-estimate` | форма бесплатного замера с валидацией |
| `/sitemap.xml`, `/robots.txt` | генерируются из данных статей и `SITE.url` |

Route-файлы в `src/app` — тонкие: реэкспортируют компонент и `metadata` из public API страницы.
Title статей отдаётся как `{ absolute }`, чтобы шаблон `%s | Gulf Coast Screen` не растягивал 60-знаковый бюджет.

## Архитектура (FSD)

```
src/
  app/        # Next App Router: layout, route-файлы, sitemap, robots, icon, config
  views/      # страницы-слайсы (в FSD это pages)
  widgets/    # site-header, site-footer, article-view, editor-notes
  features/   # request-estimate — форма и валидация
  entities/   # article — типы, контент двух статей, текстовые хелперы
  shared/     # ui-кит, стили, конфиг сайта, общие типы, lib
```

Сегменты среза повторяют `unesi-ka`:

- `model/types.ts` — только типы и интерфейсы (в коде — `type`, этого требует ESLint);
- `lib/` — бизнес-логика: хуки, валидация, форматтеры, хелперы;
- `config/constants.ts` — весь хардкод: тексты, лейблы, числа, URL;
- `config/seo.ts` — объект `metadata` для Next;
- `ui/` — компоненты, приватные части — в `ui/components/`.

Текстовые константы типизируются через `model/types.ts`, а не через `as const`:
`FREE_ESTIMATE_TEXT: FreeEstimateText` — тип остаётся единственным источником формы объекта.

**Почему `src/views`, а не `src/pages`.** Next считает каталог `src/pages` Pages Router-ом и падает
на конфликте маршрутов с App Router. Слой страниц переименован в `views` (алиас `@views/*`),
остальные слои — как в FSD.

Алиасы (`tsconfig.json`, `vitest.config.ts`): `@/*`, `@app/*`, `@views/*`, `@widgets/*`, `@features/*`,
`@entities/*`, `@shared/*`. Импорт только по public API слайса (`index.ts`), глубокие импорты
(`@/widgets/x/ui/...`) и импорты «вверх» по слоям запрещены ESLint — правила и сообщения в `eslint.config.mjs`.
`src/app` не импортирует внутренности слайсов: `metadata` тоже выходит через `index.ts`.

Слои и ответственность:

- **app** — только маршрутизация, глобальный layout, метаданные сайта, SEO-файлы.
- **views** — композиция: собрать виджеты/фичу в страницу, отдать `metadata`. Своих данных не держит, кроме `config/seo.ts` и `config/constants.ts`.
- **widgets** — самостоятельные блоки интерфейса. Виджет не импортирует виджет: `article-view` принимает `aside` слотом, а `editor-notes` передаёт страница.
- **features** — действие пользователя (`request-estimate`): типы в `model/types.ts`, валидация в `lib/validation.ts`, тексты и поля в `config/constants.ts`, UI + приватный `ui/components/TextField`.
- **entities** — предметная область (`article`): типы в `model/types.ts`, контент статей и `BANNED_CLAIMS` в `config/constants.ts`, хелперы подсчёта в `lib/text.ts`. Сущности не зависят друг от друга.
- **shared** — дизайн-кит без знания о домене: `Container`, `Button`, `PriceTable`, `CtaBanner`, `ArticleJsonLd`.
  Тип `PriceRow` лежит в `shared/model/types.ts`, а `SITE` и `NAV_LINKS` — в `shared/config/constants.ts`,
  чтобы shared не импортировал entities.

## Контент как данные

Текст статьи — не JSX, а типизированные блоки (`src/entities/article/model/types.ts`):

```ts
type ArticleBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: { lead: string; text: string }[] }
  | { type: "table"; caption: string; rows: PriceRow[] }
  | { type: "cta"; title: string; text: string };
```

Сами статьи — `src/entities/article/config/constants.ts` (объекты `Article`).
`ArticleView` раскладывает блоки по компонентам, поэтому текст можно отдать из CMS, не трогая вёрстку.
Хелперы (`lib/text.ts`) считают по одному источнику правды: слова, вхождения ключа, H2,
внутренние ссылки, запрещённые формулировки.

Служебная панель `editor-notes` (виджет, живёт только на статье про стоимость) показывает эти же цифры
редактору: Title 50/60, description 140/155, 441 слово, ключ 2 раза, H2 5 (4 секции + CTA), запрещённых заявлений нет.
Тест `src/entities/article/lib/text.test.ts` фиксирует те же правила брифа: 400–500 слов,
ключ во вводном абзаце и 2–4 раза всего, Title ≤ 60, description ≤ 155, 4–5 H2, без «best/cheapest/number one».

## Стили

SCSS Modules (`*.module.scss` рядом с TSX), глобальный вход — `src/shared/styles/main.scss` в `src/app/layout.tsx`.
Токены: `_palette.scss` (цвета и alpha-шкала), `_variables.scss` (spacing, типографика, радиусы, motion, z-index).
Миксины: `flex`, `spacing` (`margin`/`padding`/`gap`), `media`, `transition`, `elevation`, `a11y`, `interactive`,
`surface-card`, `field-control`.

Как в `unesi-ka`, токены и миксины инжектируются глобально: `_prelude.scss` (`@forward` variables и всех
миксинов) подключается через `sassOptions.additionalData` в `next.config.ts`, а в Storybook — через тот же
`additionalData` в `viteFinal`. Компонентные модули не пишут `@use`: `$spacing-md` и `@include flex-between`
доступны сразу, `loadPaths` (`src/shared/styles`) отвечает за резолв.

Stylelint запрещает `px` в `margin`/`padding`/`gap` и `font-size` (только токены и `rem`),
ограничивает специфичность селектора и требует единый стиль shorthand-свойств.

Доступность: контраст текста — WCAG AA (≥ 4.5:1). Акцентный мелкий текст на светлом фоне
и фон основной кнопки используют `$color-accent-ink` / `$color-accent-ink-hover`, а `$color-accent`
остаётся для декоративных элементов (полоски, маркеры). Для ссылок контента в статье
используется селектор `.body a:not([class])`, чтобы по специфичности не перебивать цвета
кнопок-ссылок из кита.

## Storybook

`.storybook/main.ts` на `@storybook/nextjs-vite` + `addon-docs` и `addon-a11y`.
Сторис: `shared/ui/Button`, `shared/ui/CtaBanner`. Визуальная проверка состояний без запуска приложения.

## CI и деплой

Vercel собирает проект сам (`next build`), переменная `NEXT_PUBLIC_SITE_URL` задаётся в проекте.
`.gitlab-ci.yml` повторяет pre-commit в CI и умеет деплоить вручную job-ом `deploy:vercel`
(нужны `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`).

Локально:

```bash
npx vercel link --project screen-enclosure-article
npx vercel deploy --prod
```

## Что перенесено из `unesi-ka` и что изменено

| Практика | Как здесь |
|----------|-----------|
| FSD, public API, границы импортов | перенесено; слой `pages` → `views` из-за App Router |
| Сегменты `model` / `lib` / `config` | как в `unesi-ka`: типы — `model/types.ts`, логика — `lib/`, константы — `config/constants.ts`, SEO — `config/seo.ts` |
| ESLint flat config: FSD, `max-lines` 100, cspell в коде, русские названия тестов | перенесено, добавлены `array-type` / `consistent-type-definitions` под стиль проекта |
| Stylelint + SCSS-токены и миксины | перенесено; палитра под бренд, глобальный prelude как в `unesi-ka` (`_prelude.scss` + `additionalData`) |
| cspell, `knip.jsonc`, Husky pre-commit | перенесено |
| Vitest + Testing Library (jsdom) | перенесено; тесты контент-брифа — новое |
| Storybook 10 | перенесено (`@storybook/nextjs-vite` вместо `react-vite`) |
| Docker + nginx + GitLab deploy-шаблоны | не нужно: Vercel; CI оставлен self-contained |
| Zustand / HTTP-клиент / DI | не нужны: у сайта нет API и клиентского стора |
