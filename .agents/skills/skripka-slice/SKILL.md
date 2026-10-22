---
name: skripka-slice
description: >-
  Applies the project's slice structure rules: folder layout (index.ts, ui/,
  model/, lib/, config/), public API, private ui/components, where copy and SEO
  live, naming. Use when adding a new page/widget/feature/entity, moving files
  between segments, or when the user mentions срез, слайс, структура папок,
  public API, index.ts, ui/components, новый виджет, новая страница.
---

# Структура среза

## Минимум

```
src/<layer>/<slice-kebab-case>/
  index.ts              # public API, только нужное наружу
  ui/
    <SliceName>.tsx     # головной компонент
    <SliceName>.module.scss
    components/         # приватные части, наружу не выходят
  model/
    types.ts            # только типы и интерфейсы
  lib/                  # бизнес-логика: хуки, функции, валидация, форматтеры
  config/
    constants.ts        # константы и весь хардкод: тексты, лейблы, числа, URL
    seo.ts              # metadata для Next
```

Слайс может не иметь `ui/` (например, `entities/article`) или не иметь `model/`
(`shared/ui/Button`). Лишние сегменты не создавать.

## Правила

- Имя папки — kebab-case (`request-estimate`), имя компонента — PascalCase (`EstimateForm`).
- `index.ts` — единственная точка входа снаружи. Экспортировать только то, что реально
  используется: Knip валит неиспользуемые экспорты.
- `model/types.ts` — только типы и интерфейсы (`type`, не `interface`: `consistent-type-definitions`).
- `lib/` — бизнес-логика: хуки, валидация, форматтеры, хелперы. Растущий `lib/`
  раскладывается по назначению (`lib/formatter/`, `lib/hooks/`). Тесты — рядом
  (`lib/validation.test.ts`, `lib/formatter/format-date.test.ts`).
- `config/constants.ts` — весь хардкод: тексты, лейблы, числа, URL. Текстовые объекты
  типизируются через `model/types.ts` (`FREE_ESTIMATE_TEXT: FreeEstimateText`), а не через `as const`.
- `config/seo.ts` — объект `metadata` для Next; наружу выходит через `index.ts`.
- Приватная часть головного компонента — `ui/components/*`, из `index.ts` не экспортируется.
- Тесты — рядом с кодом (`lib/validation.test.ts`, `ui/EstimateForm.test.tsx`).
- Сторис — рядом с компонентом (`shared/ui/Button/Button.stories.tsx`).

## Чек-лист нового среза

1. Папка в нужном слое, kebab-case.
2. `ui/`, `model/types.ts`, `lib/`, `config/constants.ts` — если есть и разметка, и данные.
3. `index.ts` с минимальным публичным API.
4. Импорт только из public API соседних слайсов.
5. `npm run lint && npm run knip && npm test && npm run build`.
