module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-trailing-spaces": "error",
    "eol-last": ["error", "always"],
    "semi": [2, "always"],
    "object-curly-spacing": ["error", "always"],
    "max-len": ["error", { "code": 80,  "tabWidth": 2, "ignoreStrings": true, "ignoreRegExpLiterals": true, "ignoreComments": true }],
  },
}
