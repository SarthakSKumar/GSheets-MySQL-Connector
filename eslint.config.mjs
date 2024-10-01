import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      'no-undef': [
        'error',
        {
          typeof: true,
          ignore: ['process.env.*'],
        },
      ],
    },
  },
];
