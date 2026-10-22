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
  // Next прокидывает loadPaths через sassOptions, а Vite-сборка Storybook — нет.
  viteFinal(viteConfig) {
    viteConfig.css = {
      ...viteConfig.css,
      preprocessorOptions: {
        ...viteConfig.css?.preprocessorOptions,
        scss: { loadPaths: [sharedStyles] },
      },
    };

    return viteConfig;
  },
};

export default config;
