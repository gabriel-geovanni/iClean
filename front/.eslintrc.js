module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-anonymous-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent': 'off',
    'react/jsx-tag-spacing': 'off',
    'comma-dangle': 'off',
    'no-trailing-spaces': 'off',
    'jsx-quotes': 'off',
    'import/prefer-default-export': 'off',
    'no-multiple-empty-lines': 'off',
    'eol-last': 'off',
    'keyword-spacing': 'off',
    semi: 'off',
    'react/prop-types': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    radix: 'off',
    'no-nested-ternary': 'off',
    camelcase: 'off'

  },
};
