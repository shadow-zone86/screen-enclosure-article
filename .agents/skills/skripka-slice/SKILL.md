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
  model/                # типы, данные, хелперы, валидация, seo.ts
```

Слайс может не иметь `ui/` (например, `entities/article`) или не иметь `model/`
(`shared/ui/Button`). Лишние сегменты не создавать.

## Правила

- Имя папки — kebab-case (`request-estimate`), имя компонента — PascalCase (`EstimateForm`).
- `index.ts` — единственная точка входа снаружи. Экспортировать только то, что реально
  используется: Knip валит неиспользуемые экспорты.
- Приватная часть головного компонента — `ui/components/*`, из `index.ts` не экспортируется.
- Данные и константы — в `model/`, а не в TSX: это и требование `max-lines: 100`, и путь к CMS.
- `model/seo.ts` — объект `metadata` для Next; наружу выходит через `index.ts`.
- Тесты — рядом с кодом (`model/text.test.ts`, `ui/EstimateForm.test.tsx`).
- Сторис — рядом с компонентом (`shared/ui/Button/Button.stories.tsx`).

## Чек-лист нового среза

1. Папка в нужном слое, kebab-case.
2. `ui/` + `model/`, если есть и разметка, и данные.
3. `index.ts` с минимальным публичным API.
4. Импорт только из public API соседних слайсов.
5. `npm run lint && npm run knip && npm test && npm run build`.
