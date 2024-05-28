import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginJsxRuntimeConfig from 'eslint-plugin-react/configs/jsx-runtime.js';
import baseConfig from '../eslint.config.js';

export default [
  ...baseConfig,
  {
    files: ['**/*.js', '**/*.jsx'],
    settings: {
      react: { version: 'detect' }
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    }
  },
  pluginReactConfig,
  pluginJsxRuntimeConfig
];
