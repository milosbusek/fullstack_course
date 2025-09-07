import js from "@eslint/js";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin-js";

export default [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["**/*.ts"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module"
            }
        },
        plugins: {
            "@stylistic/js": stylistic
        },
        rules: {
            "@stylistic/js/semi": ["error", "always"],
            "@stylistic/js/quotes": ["error", "double", { avoidEscape: true }]
        }
    },
    {
        ignores: ["dist/**"]
    }
];
