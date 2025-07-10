// .storybook/main.ts

import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import webpack from "webpack";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-actions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  docs: {},

  webpackFinal: async (config) => {
    dotenv.config({ path: path.resolve(__dirname, "../.env") });

    const nextPublicVariables = Object.keys(process.env).reduce((acc, key) => {
      if (key.startsWith("NEXT_PUBLIC_")) {
        acc[`process.env.${key}`] = JSON.stringify(process.env[key]);
      }
      return acc;
    }, {});

    config.plugins?.push(new webpack.DefinePlugin(nextPublicVariables));

    return config;
  },
};
export default config;
