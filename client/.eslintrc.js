/* eslint-env node */
export default {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  globals: {
    module: "readonly",
    require: "readonly",
    __dirname: "readonly",
  },
  rules: {
    // Add any custom rules here
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
