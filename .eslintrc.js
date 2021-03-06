module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    /* Next.js does not require us to import React in all components */
    'react/react-in-jsx-scope': 'off',
    /* Not worried about prop types for now, as possibly moving to TS */
    'react/prop-types': 'off',
    /* Allow JSX in files with .jsx OR .js */
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    /* Allow prop spreading */
    'react/jsx-props-no-spreading': 'off',
    /* Ignore linebreak type */
    'linebreak-style': 0,
  },
  globals: {
    /* Next.js assumes React is global */
    React: 'writable',
  },
};
