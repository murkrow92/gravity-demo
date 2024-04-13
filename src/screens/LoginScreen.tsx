import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Spacing from '@components/Spacing.tsx';
import FloatingLabelInput from '@components/FloatingLabelInput';
import PrimaryButton from '@components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import Auth from '@api/service/auth.ts';

function LoginScreen() {
    const navigation = useNavigation();
    const { mutate, data, status } = useMutation({
        mutationFn: Auth.login,
        onSuccess: () => {
            navigation.navigate('CurrencyPrices');
        },
        onError: error => {
            console.log('error', error);
        },
    });
    const [username, setUsername] = useState('kminchelle');
    const [password, setPassword] = useState('0lelplR');

    useEffect(() => {
        console.log('data', data, status);
    }, [data, status]);

    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <FloatingLabelInput label="Email" value={username} onChangeText={setUsername} />
                <Spacing size={32} direction="vertical" />
                <FloatingLabelInput label="Password" value={password} onChangeText={setPassword} />
                <Spacing size={32} direction="vertical" />
                <PrimaryButton
                    title="Login"
                    onPress={() => {
                        mutate({ username, password });
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        paddingHorizontal: 16,
        width: '100%',
    },
});

export default LoginScreen;
