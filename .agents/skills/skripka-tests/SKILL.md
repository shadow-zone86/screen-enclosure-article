---
name: skripka-tests
description: >-
  Writes Vitest tests for this Next.js project: colocated *.test.ts(x), jsdom,
  Testing Library, setup file, Russian it/test titles (ESLint
  tests/require-russian-title via no-restricted-syntax), next/link and metadata
  stubs, content-brief assertions. Use when adding or editing tests, mocks,
  fixtures, or when the user mentions Vitest, тесты, it, describe, Testing Library,
  jsdom, mock, покрытие, coverage.
---

# Тесты

## Каркас

- `vitest.config.ts`: `environment: "jsdom"`, `globals: true`,
  `setupFiles: ./src/shared/lib/test/index.ts`, алиасы `@/*`, `@views/*` и остальные слои.
- Сетап: `@testing-library/jest-dom/vitest` + `cleanup()` в `afterEach`.
- Тест лежит рядом с кодом: `lib/validation.test.ts`, `ui/EstimateForm.test.tsx`.
- Названия `describe`/`it` — по-русски, описывают поведение. Латиница допустима
  внутри фразы («рендерит один H1 из данных статьи»). Это проверяет ESLint.

## Правила

- Тест не поднимается в `src/app`: вызывайте компонент/функцию своего слоя напрямую.
- Тесты вправе импортировать внутренние сегменты своего среза, но не других слайсов в обход public API.
- `next/link` в jsdom рендерится как `<a>`; мок нужен, только если тест проверяет навигацию.
  `metadata` не рендерится — проверяйте объект из `config/seo.ts` напрямую, если нужно.
- Хуки — `renderHook` из `@testing-library/react` (пример: `lib/hooks/useRangeStatus.test.ts`).
- Формы: `fireEvent` из Testing Library достаточно; `user-event` в проекте нет.
- Контент-бриф проверяется тестом, а не глазами: см. `skripka-content-seo`.

## Эталон

```ts
import { describe, expect, it } from "vitest";
import { validateEstimate } from "./validation";

describe("валидация заявки на замер", () => {
  it("не пропускает короткий телефон", () => {
    expect(validateEstimate({ ...VALID, phone: "(239) 555" }).phone).toBeDefined();
  });
});
```

## Проверка

```bash
npm test              # один прогон
npm run test:watch
npm run test:coverage
```
