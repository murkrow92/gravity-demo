import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Spacing from '@components/Spacing.tsx';
import FloatingLabelInput from '@components/FloatingLabelInput';
import PrimaryButton from '@components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import Auth from '@api/service/auth.ts';
import { SafeAreaView } from 'react-native-safe-area-context';
import Theme from '@theme';

function LoginScreen() {
    const navigation = useNavigation();
    const { mutate } = useMutation({
        mutationFn: Auth.login,
        onSuccess: () => {
            navigation.navigate('CurrencyPrices');
        },
        onError: error => {
            console.log('error', error);
        },
    });
    const [username, setUsername] = useState(''); // kminchelle
    const [password, setPassword] = useState(''); // 0lelplR
    const [showPassword, setShowPassword] = useState(false);
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

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
        <SafeAreaView edges={['bottom']} style={styles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
                <ScrollView scrollEnabled={false}>
                    <Spacing size={32} direction="vertical" />
                    <Image
                        source={require('../assets/images/login_image.png')}
                        style={{ height: 160 }}
                    />
                    <Spacing size={32} direction="vertical" />
                    <View style={styles.form}>
                        <Text
                            style={{ color: Theme.TEXT_COLOR, fontSize: 22, textAlign: 'center' }}
                        >
                            Welcome, please sign in to access your account
                        </Text>
                    </View>
                    <Spacing size={32} direction="vertical" />
                    <View style={styles.form}>
                        <FloatingLabelInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            error={errorUserName}
                        />
                        <Spacing size={16} direction="vertical" />
                        <FloatingLabelInput
                            label="Password"
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={setPassword}
                            icon={showPassword ? 'eye-slash' : 'eye'}
                            onIconPress={() => setShowPassword(!showPassword)}
                            error={errorPassword}
                        />
                        <Spacing size={16} direction="vertical" />
                        <PrimaryButton
                            title="Login"
                            onPress={() => {
                                mutate({ username, password });
                            }}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    form: {
        paddingHorizontal: 16,
        width: '100%',
    },
});

export default LoginScreen;
