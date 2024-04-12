import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                onPress={() => {
                    navigation.navigate('CurrencyPrices');
                }}
                style={{ color: 'red' }}
            >
                Login
            </Text>
        </View>
    );
}

export default LoginScreen;
