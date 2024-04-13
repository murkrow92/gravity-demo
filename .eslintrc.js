module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:prettier/recommended',
        'plugin:typescript-enum/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: ['node_modules/', 'metro.config.js'],
    plugins: ['react', '@typescript-eslint', 'typescript-enum'],
    rules: {
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'] },
        ],
        'no-use-before-define': [
            'error',
            {
                functions: true,
                classes: true,
                variables: false,
                allowNamedExports: false,
            },
        ],
        'react/jsx-props-no-spreading': ['off'],
        'react/function-component-definition': ['off'],
        'react/require-default-props': ['off'],
    },
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {},
        },
    },
    overrides: [
        {
            files: ['src/**/*.d.ts'],
            rules: {
                'no-unused-vars': ['off'],
            },
        },
    ],
};
