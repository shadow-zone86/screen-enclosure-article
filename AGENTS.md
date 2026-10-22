# AGENTS.md

Инструкции для ИИ-агентов (opencode, Cursor, Codex и др.) в репозитории
**screen-enclosure-article** — демо-сайт контент-менеджера: Next.js 16 (App Router),
React 19, TypeScript, SCSS Modules, Feature-Sliced Design, Vitest, Storybook.

## Скиллы проекта

Скиллы лежат в `.agents/skills/` (открытый стандарт Agent Skills: папка kebab-case +
`SKILL.md` с frontmatter `name` + `description`). Перед задачей по теме — открой
соответствующий `SKILL.md` и следуй ему:

| Скилл | Применять, когда |
|-------|------------------|
| `.agents/skills/skripka-fsd/SKILL.md` | слои FSD, граф импортов, public API, `src/views` вместо `src/pages`, route-контракты |
| `.agents/skills/skripka-slice/SKILL.md` | добавление/правка среза: структура папок, `index.ts`, `ui/components` |
| `.agents/skills/skripka-ui/SKILL.md` | компоненты, `*.module.scss`, токены `src/shared/styles`, `shared/ui`, лимит 100 строк, a11y |
| `.agents/skills/skripka-tests/SKILL.md` | Vitest + happy-dom/jsdom, колокированные тесты, русские `it`, стабы `next/link` |
| `.agents/skills/skripka-content-seo/SKILL.md` | тексты статей, бриф (объём, ключ, Title/description, запрещённые заявления), `EditorNotes`, JSON-LD |

## Правила

- Скиллы и инструкции для агентов — только в `.agents/`.
- `description` скилла обязана содержать триггеры применения, иначе скилл не найдут.
- Новый скилл — папка kebab-case + `SKILL.md` с `name` и `description`.
- Скилл не дублирует README: README — факты о проекте, скилл — рабочие правила.
  При расхождении побеждают код и ESLint (`eslint.config.mjs`).
- Перед коммитом проходит `npm run pre-commit` (type-check → lint → lint:style →
  knip → test → build; хук Husky). Отдельно `npm run spell` (cspell) — для `*.md`,
  `.agents/`, конфигов.
- Контент статьи живёт в `src/entities/article/model/*.ts`, а не в TSX: страница
  только раскладывает блоки по компонентам.
- Лимит ESLint `max-lines: 100` действует на `src/**/*.tsx`, кроме тестов и сторис:
  данные — в `model/`, приватные части — в `ui/components/`.
- Next считает `src/pages` Pages Router-ом, поэтому слой страниц — `src/views`
  (алиас `@views/*`). Не переименовывать обратно.
