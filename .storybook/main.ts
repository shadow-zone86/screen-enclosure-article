import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/nextjs-vite";

const sharedStyles = fileURLToPath(new URL("../src/shared/styles", import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  // Тот же prelude, что и в next.config.ts: компоненты не пишут @use.
  viteFinal(viteConfig) {
    viteConfig.css = {
      ...viteConfig.css,
      preprocessorOptions: {
        ...viteConfig.css?.preprocessorOptions,
        scss: {
          loadPaths: [sharedStyles],
          additionalData: '@use "prelude" as *;\n',
        },
      },
    };

    return viteConfig;
  },
};

export default config;
