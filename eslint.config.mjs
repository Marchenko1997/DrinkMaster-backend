import globals from 'globals'; // Для работы с глобальными переменными (Node.js)
import pluginJs from '@eslint/js'; // Рекомендованный плагин от ESLint

export default [
  pluginJs.configs.recommended, // Подключаем базовые рекомендованные правила
  {
    files: ['src/**/*.js'], // Указываем, что линтер работает с файлами в папке `src`
    languageOptions: {
      ecmaVersion: 2021, // Поддержка синтаксиса ES2021
      sourceType: 'module', // Используем ES Modules
      globals: globals.node, // Добавляем глобальные переменные Node.js
    },
    rules: {
      semi: 'error', // Требовать точку с запятой
      'no-unused-vars': ['error', { args: 'none' }], // Ловить неиспользуемые переменные
      'no-undef': 'error', // Ошибки при использовании неопределённых переменных
    },
  },
];
