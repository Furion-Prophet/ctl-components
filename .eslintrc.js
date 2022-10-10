const [OFF, WARN, ERROR] = [0, 1, 2];

const eslintConfig = {
  root: true,

  parser: 'babel-eslint',

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },

  extends: ['eslint-config-airbnb', 'eslint-config-prettier', 'eslint-config-prettier/react', 'plugin:prettier/recommended'],
  plugins: ['eslint-plugin-react-hooks', 'eslint-plugin-prettier'],

  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },

  settings: {
    'import/extensions': ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
    'import/resolver': {
      alias: {
        map: [['@', './packages']],
        extensions: ['.ts', '.tsx', '.d.ts', '.js', '.jsx'],
      },
    },
    react: {
      version: 'detect',
    },
  },

  rules: {
    'no-console': [ERROR, { allow: ['error', 'warn', 'info'] }],
    'react/destructuring-assignment': OFF,
    'no-underscore-dangle': OFF,
    'class-methods-use-this': OFF,
    'import/prefer-default-export': OFF,
    'global-require': WARN,

    'jsx-a11y/anchor-is-valid': [
      ERROR,
      {
        components: ['Link'],
        specialLink: ['to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],

    'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.tsx'] }],

    'react/prop-types': OFF,

    // taro
    'react/react-in-jsx-scope': OFF,
    'react/static-property-placement': OFF,

    // with some error here
    'import/extensions': [
      OFF,
      'always',
      {
        ignorePackages: true,
        pattern: { ts: 'never', tsx: 'never', 'd.ts': 'never' },
      },
    ],

    'prettier/prettier': OFF,
    'import/no-unresolved': WARN,

    'no-unused-vars': WARN,

    // 性能原因
    'import/named': OFF,
    'import/namespace': OFF,
    'import/default': OFF,
    'import/no-named-as-default-member': OFF,
    'import/no-named-as-default': OFF,
    'import/no-cycle': OFF,
    'import/no-unused-modules': OFF,
    'import/no-deprecated': OFF,

    'import/no-extraneous-dependencies': WARN,
    'import/no-extraneous-dependencies': OFF,
    'react/no-find-dom-node': WARN,
  },

  overrides: [
    {
      files: ['**/rn/**/*.ts', '**/rn/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        project: 'tsconfig.json',

        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        '@react-native-community',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
        'eslint-config-prettier/@typescript-eslint',
      ],
      plugins: [
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-import/config/typescript',
        'eslint-plugin-prettier',
      ],

      globals: {
        storiesOf: 'readonly',
      },

      rules: {
        'default-case': OFF,
        'react/prefer-stateless-function': OFF,
        'no-dupe-class-members': OFF,
        '@typescript-eslint/explicit-function-return-type': OFF,
        'no-array-constructor': OFF,
        '@typescript-eslint/no-array-constructor': WARN,
        '@typescript-eslint/no-namespace': ERROR,
        '@typescript-eslint/no-empty-interface': OFF,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-unused-vars': [
          WARN,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': OFF,
        '@typescript-eslint/no-useless-constructor': WARN,
        'react/sort-comp': OFF,
        'react/jsx-props-no-spreading': OFF,
        'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.tsx'] }],

        'import/extensions': [
          OFF,
          'always',
          {
            ignorePackages: true,
            // pattern: { ts: 'never', tsx: 'never', 'd.ts': 'never' },
          },
        ],

        '@typescript-eslint/indent': OFF,
        'react-native/no-inline-styles': OFF,
        'prettier/prettier': ['error', {
          jsxSingleQuote: true,
          singleQuote: true,
        }],
      },
    },
    {
      files: ['**/taro/**/*.ts', '**/taro/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },

        project: 'tsconfig.json',

        warnOnUnsupportedTypeScriptVersion: true,
      },
      extends: [
        'eslint-config-taro',
        'plugin:@typescript-eslint/recommended',
        'eslint-config-prettier',
        'eslint-config-prettier/@typescript-eslint',
      ],
      plugins: [
        'eslint-plugin-taro',
        'eslint-plugin-react-hooks',
        '@typescript-eslint/eslint-plugin',
        'eslint-plugin-import/config/typescript',
        'eslint-plugin-prettier',
      ],

      rules: {
        'default-case': OFF,
        'no-dupe-class-members': OFF,
        'no-array-constructor': OFF,
        '@typescript-eslint/no-array-constructor': WARN,
        '@typescript-eslint/no-namespace': ERROR,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-unused-vars': [
          WARN,
          {
            args: 'none',
            ignoreRestSiblings: true,
          },
        ],
        'no-useless-constructor': OFF,
        '@typescript-eslint/no-useless-constructor': WARN,
        'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.tsx'] }],
        'react/no-find-dom-node': WARN,
        'react/react-in-jsx-scope': OFF,
        'taro/render-props': OFF,
        'prefer-rest-params': OFF,

        'import/extensions': [
          OFF,
          'always',
          {
            ignorePackages: true,
          },
        ],

        '@typescript-eslint/indent': OFF,
        'prettier/prettier': ['error', {
          jsxSingleQuote: true,
          singleQuote: true,
        }],
      },
    },
    {
      files: ['**/*.d.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        // type reference
        'spaced-comment': OFF,
        'no-unused-vars': OFF,
        '@typescript-eslint/no-empty-interface': OFF,
        '@typescript-eslint/indent': OFF,
      },
    },
  ],
};

module.exports = eslintConfig;
