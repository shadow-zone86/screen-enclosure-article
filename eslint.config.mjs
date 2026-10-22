import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import cspellPluginCSpell from "@cspell/eslint-plugin";
import { fileURLToPath } from "node:url";

// Абсолютный путь: configFile плагина резолвится от CWD запуска eslint,
// и при запуске не из корня (IDE-сервер, подпапка) словарь бы не подхватился.
const cspellConfigPath = fileURLToPath(new URL("./cspell.json", import.meta.url));

const fsdTestIgnores = ["**/*.test.ts", "**/*.test.tsx"];

const fsdSliceDeepImports = [
  "@/views/*/*",
  "@/widgets/*/*",
  "@/features/*/*",
  "@/entities/*/*",
];

const fsdEntitySegmentImports = [
  "@/entities/*/model/**",
  "@/entities/*/api/**",
  "@/entities/*/lib/**",
  "@/entities/*/config/**",
  "@/entities/*/ui/**",
];

const testTitleRussianMessage =
  "Название теста — по-русски: `it`/`test` описывает поведение. Латиница допустима только внутри русской фразы.";

const testTitleRussianSelectors = [
  {
    selector:
      'CallExpression[callee.name=/^(it|test)$/] > Literal[raw=/^["\']/][value=/^[^А-Яа-яЁё]*[A-Za-z][^А-Яа-яЁё]*$/]',
    message: testTitleRussianMessage,
  },
  {
    selector:
      'CallExpression[callee.type="CallExpression"][callee.callee.property.name="each"][callee.callee.object.name=/^(it|test)$/] > Literal[raw=/^["\']/][value=/^[^А-Яа-яЁё]*[A-Za-z][^А-Яа-яЁё]*$/]',
    message: testTitleRussianMessage,
  },
];

const fsdCssModulePublicApiSyntax = [
  {
    selector: "ImportDeclaration[source.value=/\\.module\\.scss$/]",
    message:
      "Не re-export CSS-модулей из public API — стили остаются внутри ui-компонента слоя.",
  },
  {
    selector: "ExportNamedDeclaration[source.value=/\\.module\\.scss$/]",
    message:
      "Не re-export CSS-модулей из public API — стили остаются внутри ui-компонента слоя.",
  },
  {
    selector: "ExportAllDeclaration[source.value=/\\.module\\.scss$/]",
    message:
      "Не re-export CSS-модулей из public API — стили остаются внутри ui-компонента слоя.",
  },
  {
    selector: "ExportNamedDeclaration[source.value=/\\/ui\\/components\\//]",
    message: "ui/components — приватные части головного TSX. Не экспортировать из public API.",
  },
  {
    selector: "ExportAllDeclaration[source.value=/\\/ui\\/components\\//]",
    message: "ui/components — приватные части головного TSX. Не экспортировать из public API.",
  },
];

const fsdSharedPatterns = [
  "@/app/**",
  "@/views/**",
  "@/widgets/**",
  "@/features/**",
  "@/entities/**",
];

const fsdEntitiesPatterns = ["@/app/**", "@/views/**", "@/widgets/**", "@/features/**"];

const fsdEntitySlices = ["article"];

const fsdCrossEntityImportMessage =
  "Entities не зависят друг от друга. Композиция — в widgets или pages.";

const fsdEntitySelfImportMessage =
  "Внутри среза импорт относительный. Алиас @/entities/<self> — deep import своего сегмента.";

function fsdEntitySliceImportConfig(slice) {
  return {
    files: [`src/entities/${slice}/**/*.{ts,tsx}`],
    ignores: fsdTestIgnores,
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: fsdEntitiesPatterns },
            ...(fsdEntitySlices.some((other) => other !== slice)
              ? [
                  {
                    group: fsdEntitySlices
                      .filter((other) => other !== slice)
                      .flatMap((other) => [`@/entities/${other}`, `@/entities/${other}/**`]),
                    message: fsdCrossEntityImportMessage,
                  },
                ]
              : []),
            {
              group: [`@/entities/${slice}`, `@/entities/${slice}/**`],
              message: fsdEntitySelfImportMessage,
            },
          ],
        },
      ],
    },
  };
}

const fsdFeaturesPatterns = [
  {
    group: [
      "@/app/**",
      "@/views/**",
      "@/widgets/**",
      ...fsdEntitySegmentImports,
      "@/entities/*/*",
    ],
  },
  {
    group: ["@/features/**"],
    message: "Features не импортируют другие features — композируйте в widgets или pages.",
  },
];

const fsdWidgetsPatterns = [
  {
    group: [
      "@/app/**",
      "@/views/**",
      ...fsdEntitySegmentImports,
      ...fsdSliceDeepImports.filter((pattern) => pattern !== "@/widgets/*/*"),
    ],
  },
  {
    group: ["@/widgets/**"],
    message: "Widgets не импортируют другие widgets — композируйте в pages.",
  },
];

const fsdViewsPatterns = [
  {
    group: ["@/app/**", ...fsdSliceDeepImports.filter((pattern) => pattern !== "@/views/*/*")],
  },
  {
    group: ["@/views/**"],
    message: "Views не импортируют другие views — композируйте в app (route-файл).",
  },
];

const fsdAppPatterns = fsdSliceDeepImports;

const fsdLayerPatterns = [
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: { "no-restricted-imports": ["error", { patterns: [{ group: fsdSharedPatterns }] }] },
  },
  ...fsdEntitySlices.map(fsdEntitySliceImportConfig),
  {
    files: ["src/features/**/*.{ts,tsx}"],
    ignores: fsdTestIgnores,
    rules: { "no-restricted-imports": ["error", { patterns: fsdFeaturesPatterns }] },
  },
  {
    files: ["src/widgets/**/*.{ts,tsx}"],
    ignores: fsdTestIgnores,
    rules: { "no-restricted-imports": ["error", { patterns: fsdWidgetsPatterns }] },
  },
  {
    files: ["src/views/**/*.{ts,tsx}"],
    ignores: fsdTestIgnores,
    rules: { "no-restricted-imports": ["error", { patterns: fsdViewsPatterns }] },
  },
  {
    files: ["src/app/**/*.{ts,tsx}"],
    ignores: fsdTestIgnores,
    rules: { "no-restricted-imports": ["error", { patterns: [{ group: fsdAppPatterns }] }] },
  },
];

export default tseslint.config(
  {
    ignores: [
      ".next",
      "node_modules",
      "storybook-static",
      "coverage",
      "public/**",
      "legacy/**",
      "next-env.d.ts",
      ".storybook/**",
    ],
  },
  // Орфография в коде: единый конфиг cspell.json (словари и слова — там).
  // Для md/yaml/Dockerfile и прочих не-JS файлов — `npm run spell`.
  {
    files: ["**/*.{ts,tsx,js,mjs,cjs}"],
    plugins: { "@cspell": cspellPluginCSpell },
    rules: {
      "@cspell/spellchecker": [
        "error",
        { configFile: cspellConfigPath, generateSuggestions: false },
      ],
    },
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, ...tseslint.configs.stylistic],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { "react-hooks": reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/array-type": ["error", { default: "array" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],
    },
  },
  // Лимит размера компонента: контент и данные — в model/, а не в TSX.
  {
    files: ["src/**/*.tsx"],
    ignores: ["**/*.test.tsx", "**/*.stories.tsx"],
    rules: {
      "max-lines": ["error", { max: 100, skipBlankLines: false, skipComments: false }],
    },
  },
  ...fsdLayerPatterns,
  {
    files: [
      "src/entities/*/index.ts",
      "src/features/*/index.ts",
      "src/widgets/*/index.ts",
      "src/views/*/index.ts",
    ],
    rules: {
      "no-restricted-syntax": ["error", ...fsdCssModulePublicApiSyntax],
    },
  },
  // Тесты: названия it/test — по-русски (латиница допустима внутри фразы).
  {
    files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    rules: {
      "no-restricted-syntax": ["error", ...testTitleRussianSelectors],
    },
  },
  // Тесты не поднимаются в app: гоняют свои функции/компоненты напрямую.
  {
    files: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@/app", "@/app/**"],
              message: "Тест не поднимается в app: вызывайте код своего слоя напрямую.",
            },
          ],
        },
      ],
    },
  },
);
