import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  target: "es2020",
  splitting: false, // UI libs rarely need code-splitting
  clean: true,
  outDir: "dist",
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".js" };
  },
  /**
   * 🚨  Anything your components *import* that
   *     should come from the host app goes here.
   */
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "next",
    "next/*", // keeps next/image, next/link, etc. external
  ],
});
