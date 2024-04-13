import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen.tsx';
import CurrencyPriceScreen from '@screens/CurrencyPricesScreen.tsx';
import type { RootStackParamList } from '@typing/navigation';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function RootNavigation() {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
            />
            <RootStack.Screen name="CurrencyPrices" component={CurrencyPriceScreen} />
        </RootStack.Navigator>
    );
}

export default RootNavigation;
