import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Spacing from '@components/Spacing.tsx';
import FloatingLabelInput from '@components/FloatingLabelInput';
import PrimaryButton from '@components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
    const navigation = useNavigation();
    return (
        <ScrollView scrollEnabled={false} contentContainerStyle={styles.container}>
            <View style={styles.form}>
                <FloatingLabelInput label="Email" />
                <Spacing size={32} direction="vertical" />
                <FloatingLabelInput label="Password" />
                <Spacing size={32} direction="vertical" />
                <PrimaryButton
                    title="Login"
                    onPress={() => {
                        navigation.navigate('CurrencyPrices');
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
