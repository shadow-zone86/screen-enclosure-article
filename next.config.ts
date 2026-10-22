import path from "node:path";
import type { NextConfig } from "next";

const sharedStyles = path.resolve(process.cwd(), "src/shared/styles");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    // Стили встраиваются в HTML: исчезает render-blocking цепочка CSS
    // и сдвиг макета, если стили приходят позже разметки.
    inlineCss: true,
  },
  // Проект живёт внутри большего каталога — фиксируем корень Turbopack
  // на папке проекта, иначе он поднимается до чужого lock-файла.
  turbopack: {
    root: process.cwd(),
    // Baseline-дефолт Next 16 — Chrome 111+/Safari 16.4+, поэтому полифилы
    // next/polyfill-module (Array.at, Object.hasOwn и др.) в бандле лишние.
    // Внутри пакета next модуль подключается относительным путём.
    resolveAlias: {
      "../build/polyfills/polyfill-module": false,
    },
  },
  // Каждый *.module.scss делает `@use "variables" as *` без относительных путей:
  // loadPaths добавляет src/shared/styles в корень разрешения Sass.
  sassOptions: {
    loadPaths: [sharedStyles],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
