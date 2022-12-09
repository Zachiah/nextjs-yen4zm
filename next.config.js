/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['monaco-editor']);

const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

/** @type {import("next").NextConfig} */
const nextConfig = withTM({
  webpack: (config) => {
    const rule = config.module.rules
      .find((rule) => rule.oneOf)
      .oneOf.find(
        (r) =>
          // Find the global CSS loader
          r.issuer && r.issuer.include && r.issuer.include.includes('_app')
      );
    if (rule) {
      rule.issuer.include = [
        rule.issuer.include,
        // Allow `monaco-editor` to import global CSS:
        /[\\/]node_modules[\\/]monaco-editor[\\/]/,
      ];
    }

    config.plugins.push(
      new MonacoWebpackPlugin({
        languages: [
          'json',
          'markdown',
          'css',
          'typescript',
          'javascript',
          'html',
          'graphql',
          'python',
          'scss',
          'yaml',
        ],
        filename: 'static/[name].worker.js',
      })
    );
    return config;
  },
});

module.exports = nextConfig;
