import React from 'react';
import { Text, Pressable, StyleSheet, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Theme from '@theme';

interface PrimaryButtonProps extends PressableProps {
    title: string;
    buttonStyle?: StyleProp<ViewStyle>;
    pressedStyle?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ title, pressedStyle, buttonStyle, ...props }: PrimaryButtonProps) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, buttonStyle, pressed && pressedStyle]}
            {...props}
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 5,
        backgroundColor: Theme.PRIMARY,
    },
    text: {
        color: Theme.TEXT_COLOR,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default PrimaryButton;
