module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                alias: {
                    '@navigation': ['./src/navigation'],
                    '@screens': ['./src/screens'],
                    '@typing': ['./src/typing'],
                },
            },
        ],
    ],
};
