import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Spacing from '@components/Spacing.tsx';
import FloatingLabelInput from '@components/FloatingLabelInput';
import PrimaryButton from '@components/PrimaryButton';
import { useMutation } from '@tanstack/react-query';
import Auth from '@api/service/auth.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '@theme';
import { AuthContext } from '@navigation/RootNavigation.tsx';
import LoadingModal from '@components/Modal/LoadingModal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Font } from '@theme/font';

function WelcomeText() {
    return (
        <View style={styles.form}>
            <Text style={styles.welcome}>Please sign in to access your account</Text>
        </View>
    );
}

const TestAccount = {
    username: 'kminchelle',
    password: '0lelplR',
};

function LoginScreen() {
    const authContext = useContext(AuthContext);
    const { mutate } = useMutation({
        mutationFn: Auth.login,
        onSuccess: data => {
            setLoading(false);
            authContext.signIn(data.token);
        },
        onError: () => {
            setLoading(false);
            setErrorMessage('Invalid username or password');
        },
        onMutate: () => {
            setLoading(true);
        },
    });
    const [username, setUsername] = useState(TestAccount.username);
    const [password, setPassword] = useState(TestAccount.password);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const mounted = useRef(false);
    const opacity = useSharedValue(0);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        opacity.value = errorMessage ? 1 : 0;
    }, [errorMessage]);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            transform: [{ scale: withSpring(opacity.value) }],
        };
    });

    const errorUserName = useMemo(() => {
        if (username === '' && mounted.current) {
            return 'Username is required';
        }
        return '';
    }, [username]);

    const errorPassword = useMemo(() => {
        if (password === '' && mounted.current) {
            return 'Password is required';
        }
        return '';
    }, [password]);

    return (
        <SafeAreaView edges={['bottom', 'top']} style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <ScrollView scrollEnabled={false}>
                    <Spacing size={32} direction="vertical" />
                    <Image
                        source={require('../assets/images/logo-light.png')}
                        style={styles.logo}
                    />
                    <Spacing size={32} direction="vertical" />
                    <WelcomeText />
                    <Spacing size={32} direction="vertical" />
                    <View style={styles.form}>
                        <FloatingLabelInput
                            placeholder={TestAccount.username}
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            error={errorUserName}
                        />
                        <Spacing size={16} direction="vertical" />
                        <FloatingLabelInput
                            placeholder={TestAccount.password}
                            label="Password"
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                            icon={showPassword ? 'eye-slash' : 'eye'}
                            onIconPress={() => setShowPassword(!showPassword)}
                            error={errorPassword}
                        />
                        <Spacing size={4} direction="vertical" />
                        <Animated.View style={[animatedStyles, styles.errorContainer]}>
                            <FontAwesome name="close" size={24} color="#D32F2F" />
                            <Text
                                style={[styles.errorText, errorMessage ? null : styles.invisible]}
                            >
                                {errorMessage}
                            </Text>
                        </Animated.View>
                        <Spacing size={8} direction="vertical" />
                        <PrimaryButton
                            title="Login"
                            onPress={() => {
                                mutate({ username, password });
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <LoadingModal title="Login in..." color={Theme.PRIMARY} modalVisible={loading} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    logo: {
        height: 50,
        aspectRatio: 4.3,
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#2C3849',
    },
    form: {
        paddingHorizontal: 16,
        width: '100%',
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFCDD2',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        marginLeft: 10,
        color: '#D32F2F',
        fontSize: 12,
        fontFamily: Font.IBM.medium,
    },
    invisible: {
        color: 'transparent',
    },
    welcome: {
        color: Theme.WHITE,
        fontSize: 14,
        fontFamily: Font.IBM.regular,
        textAlign: 'center',
    },
});

export default LoginScreen;
