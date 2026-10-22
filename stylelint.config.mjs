export default {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: ["**/node_modules/**", ".next/**", "storybook-static/**", "coverage/**"],
  rules: {
    "selector-class-pattern": null,
    "scss/dollar-variable-pattern": null,
    "custom-property-pattern": null,
    "selector-max-id": null,
    "selector-max-specificity": ["0,4,3"],
    // Отступы и типографика — только в rem, рамки и контролы — px осознанно.
    "declaration-property-unit-allowed-list": {
      "/^(margin|padding|gap|row-gap|column-gap)(-(top|right|bottom|left|x|y))?$/": ["rem"],
      "/^font-size$/": ["rem", "vw"],
      "/^(border|border-(top|right|bottom|left|width|radius))$/": ["px", "rem", "%"],
    },
    "no-descending-specificity": null,
    "keyframes-name-pattern": null,
    "declaration-block-single-line-max-declarations": null,
    "property-no-vendor-prefix": null,
    "scss/at-if-no-null": null,
    "scss/no-global-function-names": null,
    "scss/at-rule-no-unknown": null,
    "at-rule-no-unknown": null,
  },
};
