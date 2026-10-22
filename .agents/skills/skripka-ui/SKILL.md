---
name: skripka-ui
description: >-
  Applies the project's React UI rules: SCSS Modules in *.module.scss, tokens from
  src/shared/styles (_palette, _variables), mixins (flex, spacing, media, a11y,
  interactive, elevation, field-control), explicit @use, shared/ui kit, ESLint
  max-lines 100, accessibility. Use when writing screens, components, styles,
  layout, a11y, or when the user mentions SCSS, модуль, токены, миксины, палитра,
  spacing, shared/ui, компонент, доступность.
---

# UI и стили

## Стили

- Только CSS Modules + SCSS: `Component.module.scss` рядом с `Component.tsx`.
  Не Tailwind, не CSS-in-JS, не инлайн-стили.
- Один головной компонент — один модуль. Приватные части используют модуль родителя
  (например, `TextField` → `../EstimateForm.module.scss`).
- В модулях не пишем `@use`: `_prelude.scss` глобально подключает `variables` и все миксины
  через `sassOptions.additionalData` (Next) и `additionalData` в Storybook. Токены и миксины
  доступны сразу: `$spacing-md`, `@include flex-between`.
- `_prelude.scss` — единственное место, где перечислены глобальные миксины: новый миксин
  добавляется туда. Резолв — через `loadPaths` (`src/shared/styles`), без относительных путей.
- Глобальный вход один: `@shared/styles/main.scss` в `src/app/layout.tsx`.

## Токены

- `_palette.scss` — единственный источник цветов и `rgba(...)`.
  Alpha-шкала: `$color-primary-035`; семантические оттенки: `$color-accent-tint`.
- `_variables.scss` — `$spacing-*`, `$breakpoint-*`, `$font-size-*` (включая fluid-шкалу),
  радиусы, `$duration-*`, `$ease-standard`, `$z-index-*`.
- Spacing — через миксины `margin` / `padding` / `padding-x` / `gap`.
  Stylelint запрещает сырой `px` в `margin`/`padding`/`gap` и `font-size`.
- Заголовки — fluid-токены (`$font-size-fluid-hero/heading/lead`), не сырой `clamp()`.

## Миксины

`flex` (`flex-between`, `flex-col`, `inline-flex`…), `spacing`, `media`
(`media-max-md`…), `transition`, `elevation` (`shadow(card)`), `a11y`
(`focus-ring`, `touch-target`, `visually-hidden`, `motion-reduce`),
`interactive` (`interactive-hover`, `hover-only`), `surface-card`, `field-control`.

- Hover — только `interactive-hover` / `hover-only` (не голый `:hover`).
- Фокус — `focus-ring`, тач-зоны — `touch-target(44px)`.
- Анимации уважают `prefers-reduced-motion`.

## Компоненты

- Кит — `src/shared/ui/<Name>/` с `index.ts`. Shared не знает о домене:
  типы вроде `PriceRow` лежат в `src/shared/model/types.ts`, не в entities.
- Пропсы — `type`, не `interface`; массивы — `T[]` (`consistent-type-definitions`,
  `array-type` в ESLint).
- `max-lines: 100` для `src/**/*.tsx` (кроме тестов и сторис): выносите данные и тексты
  в `config/constants.ts`, части — в `ui/components/`.
- Ссылки — `next/link`, кнопка-ссылка — `Button` с пропом `href`, без `<a>` вручную.
- Заголовки по порядку: один `<h1>` на страницу (в `ArticleView`), секции — `<h2>`.
