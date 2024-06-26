module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                extensions: [
                    '.ios.ts',
                    '.android.ts',
                    '.ts',
                    '.ios.tsx',
                    '.android.tsx',
                    '.tsx',
                    '.jsx',
                    '.js',
                    '.json',
                ],
                alias: {
                    '@navigation': ['./src/navigation'],
                    '@screens': ['./src/screens'],
                    '@typing': ['./src/typing'],
                    '@components': ['./src/components'],
                    '@theme': ['./src/theme'],
                    '@hooks': ['./src/hooks'],
                    '@api': ['./src/api'],
                    '@utils': ['./src/utils'],
                    '@provider': ['./src/provider'],
                    '@mocks': ['./src/mocks'],
                },
            },
        ],
        'react-native-reanimated/plugin',
    ],
};
