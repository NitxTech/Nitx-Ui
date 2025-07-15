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
  /**
   *  List **all** packages that import React so tsup
   *  leaves them as plain `import … from 'pkg'`
   */
  external: [
    /^react/, // react, react-dom, react/jsx-runtime
    /^next/, // next & next/* helpers
    /^@radix-ui\//, // radix ui primitives
    "lucide-react",
    "class-variance-authority",
    "tailwind-merge",
  ],
});
