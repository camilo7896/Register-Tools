import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default {
    ignores: ['dist', 'functions/**/*.ts'], // si quieres ignorar carpetas específicas
    env: {
        browser: true,
        es2020: true,
    },
    extends: [
        ...js.configs.recommended,
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
        ...reactHooks.configs.recommended.rules,
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
    },
    overrides: [
        {
            files: ['functions/**/*.ts'],
            rules: {
                // reglas específicas para funciones, si es necesario
            },
        },
    ],
}