import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import prettierConfig from "./prettier.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("eslint:recommended"),
  ...compat.extends("plugin:react/recommended"),
  ...compat.extends("plugin:react-hooks/recommended"),
  ...compat.extends("plugin:jsx-a11y/recommended"),
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  ...compat.extends("plugin:import/recommended"),
  ...compat.extends("plugin:import/typescript"),
  ...compat.extends("plugin:prettier/recommended"),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",

      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react/display-name": "off",

      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "prettier/prettier": ["warn", prettierConfig],
    },
  },
  {
    files: ["pages/**/*.{ts,tsx}", "app/**/*.{ts,tsx}"],
    rules: {
      "import/no-default-export": "off",
    },
  },
  {
    ignores: [
      "node_modules/",
      ".next/",
      "out/",
      "public/",
      "next.config.js",
      "*.config.js",
      "*.setup.js",
    ],
  },
];

export default eslintConfig;