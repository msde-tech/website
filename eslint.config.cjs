/** @type {import('eslint').Linter.Config[]} */
module.exports = [
    {
        ignores: [
            'dist/',
            'coverage/',
            'node_modules/',
            '.angular/',
            '*.config.js',
            '*.config.ts',
        ],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: require('@typescript-eslint/parser'),
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2023,
            },
        },
        plugins: {
            '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
            '@angular-eslint': require('@angular-eslint/eslint-plugin'),
        },
        rules: {
            '@angular-eslint/directive-selector': [
                'error',
                {
                    type: 'attribute',
                    prefix: ['app', 'hlm'],
                    style: 'camelCase',
                },
            ],
            '@angular-eslint/component-selector': [
                'error',
                {
                    type: 'element',
                    prefix: ['app', 'hlm'],
                    style: 'kebab-case',
                },
            ],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/consistent-type-imports': 'error',
            '@typescript-eslint/no-explicit-any': 'warn',
        },
    },
    {
        files: ['**/*.html'],
        languageOptions: {
            parser: require('@angular-eslint/template-parser'),
        },
        plugins: {
            '@angular-eslint/template': require('@angular-eslint/eslint-plugin-template'),
        },
        rules: {
            '@angular-eslint/template/banana-in-box': 'error',
            '@angular-eslint/template/no-negated-async': 'error',
        },
    },
];
