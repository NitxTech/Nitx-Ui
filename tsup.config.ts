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
  // Every component in this bundle is a client component; tsup strips
  // module-level directives when bundling, so re-assert it on the output.
  banner: { js: '"use client";' },
  noExternal: ["uuid"],
  external: [
    /^react/, // react, react-dom, react/jsx-runtime
    /^next/, // next & next/* helpers
    /^@radix-ui\//, // radix ui primitives
    /^@uppy\//, // peer - must resolve to the consumer's copy
    /\.css$/, // pass css imports through for the consumer bundler to load
    "@tanstack/react-query", // shared QueryClient - must come from the consumer
    "i18next",       // shared singleton - must come from the consumer
    "react-i18next", // shared singleton - must come from the consumer
    "lucide-react",
    "class-variance-authority",
    "tailwind-merge",
    "sonner",
    // Loaded on demand by the document preview. Left external so the dynamic
    // import survives into dist and the host's bundler splits pdf.js out of
    // the main chunk.
    "react-pdf",
    /^pdfjs-dist/,
  ],
});
