module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 10,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'vue', 'prettier', 'simple-import-sort', 'import'],
  rules: {
    'no-undef': 'off',
    'no-unused-vars': 'warn',
    // import
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
    'import/first': 'warn',
    'import/newline-after-import': 'warn',
    'import/no-duplicates': 'warn'
  },
  overrides: [
    {
      files: ['*.js', '*.ts', '*.tsx', '*.vue'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              // Node.js builtins. You could also generate this regex if you use a `.js` config.
              // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
              [
                '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)'
              ],
              // Packages. `react` related packages come first.
              ['^react', '^vue', '^@?\\w'],
              // Internal packages.
              ['^(@base|@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)'],
              ['^@assets(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put `..` last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and `.` last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports.
              ['^.+\\.s?css$', '^.+\\.less$']
            ]
          }
        ]
      }
    },
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:vue/vue3-essential',
        'plugin:@typescript-eslint/recommended'
      ],
      plugins: ['@typescript-eslint', 'vue', 'prettier', 'simple-import-sort', 'import']
    }
  ]
}
