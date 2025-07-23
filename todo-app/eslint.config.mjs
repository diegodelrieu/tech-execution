import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.plugins("unicorn"),
  {
    rules: {
      "unicorn/filename-case": ["error", { "case": "kebabCase" }],
      "unicorn/prevent-abbreviations": "error",
      "unicorn/prefer-module": "error",
      "unicorn/no-array-reduce": "error",
      "unicorn/no-for-loop": "error",
      "unicorn/prefer-spread": "error",
      "unicorn/prefer-ternary": "error",
    }
  }
];

export default eslintConfig;
