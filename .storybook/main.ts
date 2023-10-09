import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ['public'],
  babel: async options => ({
    ...options,
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-private-methods',
      '@babel/plugin-proposal-private-property-in-object',
    ],
  }),
  webpackFinal: async (config) => {
    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json')
      }),
    ];
    return config
  }
};
export default config;
