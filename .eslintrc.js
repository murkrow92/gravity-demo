module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    ignorePatterns: ['node_modules/', 'metro.config.js'],
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': [
            2,
            { extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.d.ts'] },
        ],
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
