import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"], // 👉 build BOTH
  dts: true, // emit types
  target: "es2019",
  splitting: false, // React libs rarely need code-splitting
  external: ["react", "react-dom"], // never bundle React
  outDir: "dist",
  clean: true,
});
