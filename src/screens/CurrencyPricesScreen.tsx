import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from '@navigation/RootNavigation.tsx';
import Theme from '@theme';

function CurrencyPriceScreen() {
    const authContext = useContext(AuthContext);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text
                style={{ color: Theme.TEXT_COLOR }}
                onPress={() => {
                    authContext.signOut();
                }}
            >
                Sign out
            </Text>
        </View>
    );
}

export default CurrencyPriceScreen;
