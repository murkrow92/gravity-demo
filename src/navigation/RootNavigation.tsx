import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/LoginScreen.tsx';
import CurrencyPriceScreen from '@screens/CurrencyPricesScreen.tsx';
import TradeScreen from '@screens/TradeScreen.tsx';
import type { RootStackParamList } from '@typing/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Theme from '@theme';
import { Font } from '@theme/font.ts';

const RootStack = createNativeStackNavigator<RootStackParamList>();
export const AuthContext = React.createContext({
    // eslint-disable-next-line no-unused-vars
    signIn: (_token: string) => {},
    signOut: () => {},
});

type State = {
    isLoading: boolean;
    isSignout: boolean;
    userToken: string | null;
};

type Action =
    | { type: 'RESTORE_TOKEN'; token: string | null }
    | { type: 'SIGN_IN'; token: string }
    | { type: 'SIGN_OUT' };

const initialState: State = {
    isLoading: true,
    isSignout: false,
    userToken: null,
};

const reducer = (prevState: State, action: Action): State => {
    switch (action.type) {
        case 'RESTORE_TOKEN':
            return {
                ...prevState,
                userToken: action.token,
                isLoading: false,
            };
        case 'SIGN_IN':
            return {
                ...prevState,
                isSignout: false,
                userToken: action.token,
            };
        case 'SIGN_OUT':
            return {
                ...prevState,
                isSignout: true,
                userToken: null,
            };
        default:
            return prevState;
    }
};

function RootNavigation() {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        const bootstrapAsync = async () => {
            try {
                const userToken = await AsyncStorage.getItem('userToken');
                dispatch({ type: 'RESTORE_TOKEN', token: userToken });
            } catch (e) {
                console.log('e', e);
            }
        };
        bootstrapAsync();
    }, []);

    const authContext = React.useMemo(
        () => ({
            signIn: (token: string) => {
                AsyncStorage.setItem('userToken', token);
                dispatch({ type: 'SIGN_IN', token });
            },
            signOut: () => {
                AsyncStorage.setItem('userToken', '');
                dispatch({ type: 'SIGN_OUT' });
            },
        }),
        []
    );

    if (state.isLoading) {
        return null;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <RootStack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
                    },
                    headerTintColor: Theme.TEXT_COLOR_LIGHT,
                    headerTitleStyle: {
                        fontFamily: Font.IBM.regular,
                    },
                }}
            >
                {state.userToken == null ? (
                    <RootStack.Screen
                        name="Login"
                        options={{ headerShown: false }}
                        component={LoginScreen}
                    />
                ) : (
                    <>
                        <RootStack.Screen
                            name="CurrencyPrices"
                            options={{
                                // eslint-disable-next-line react/no-unstable-nested-components
                                headerRight: () => {
                                    return (
                                        <Pressable
                                            onPress={() => {
                                                dispatch({ type: 'SIGN_OUT' });
                                            }}
                                        >
                                            <FontAwesome
                                                name="sign-out"
                                                size={16}
                                                color={Theme.TEXT_COLOR}
                                            />
                                        </Pressable>
                                    );
                                },
                            }}
                            component={CurrencyPriceScreen}
                        />
                        <RootStack.Screen
                            name="Trade"
                            options={{
                                headerBackTitleVisible: false,
                            }}
                            component={TradeScreen}
                        />
                    </>
                )}
            </RootStack.Navigator>
        </AuthContext.Provider>
    );
}

export default RootNavigation;
