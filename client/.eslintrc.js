import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin-js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

/** @type {import("eslint").Linter.Config} */
export default {
    languageOptions: {
        parser: tsparser,
        parserOptions: {
            ecmaFeatures: { jsx: true },
            ecmaVersion: "latest",
            sourceType: "module",
        },
    },
    plugins: {
        "@typescript-eslint": tseslint,
        "@stylistic/js": stylistic,
        react,
        "react-hooks": reactHooks,
    },
    extends: [
        js.configs.recommended,
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
    ],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "react/react-in-jsx-scope": "off", // v React 17+ už není potřeba importovat React
    },
};