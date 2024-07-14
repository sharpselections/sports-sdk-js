/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@sports-sdk/eslint-config/library.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  env: {
    jest: true,
  },
};