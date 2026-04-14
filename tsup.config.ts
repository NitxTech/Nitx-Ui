import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  target: "es2020",
  splitting: false,
  clean: true,
  outDir: "dist",
  outExtension: () => ({ js: ".mjs" }),
  external: [
    /^react/, // react, react-dom, react/jsx-runtime
    /^next/, // next & next/* helpers
    /^@radix-ui\//, // radix ui primitives
    "i18next",       // shared singleton — must come from the consumer
    "react-i18next", // shared singleton — must come from the consumer
    "lucide-react",
    "class-variance-authority",
    "tailwind-merge",
  ],
});
