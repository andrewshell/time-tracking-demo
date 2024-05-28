import globals from 'globals';
import baseConfig from '../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  }
];
