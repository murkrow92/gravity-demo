import React, { useCallback, useState, useEffect } from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Theme from '@theme';

interface FloatingLabelInputProps extends TextInputProps {
    label: string;
}

const FloatingLabelInput = ({ label, value, ...props }: FloatingLabelInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(0);
    const borderWith = useSharedValue(0);

    useEffect(() => {
        labelPosition.value = withTiming(value !== '' || isFocused ? 1 : 0, {
            duration: isFocused ? 500 : 200,
            easing: Easing.out(Easing.ease),
        });
        borderWith.value = withTiming(isFocused ? 2 : 0, {
            duration: 300,
        });
    }, [value, isFocused]);

    const handleFocusChange = useCallback((focusState: boolean) => {
        setIsFocused(focusState);
    }, []);

    const labelStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: 12,
        top: labelPosition.value === 0 ? 14 : -22,
        fontSize: labelPosition.value === 0 ? 16 : 14,
        color: labelPosition.value === 0 ? '#aaa' : '#000',
    }));

    const containerStyle = useAnimatedStyle(() => ({
        padding: 8,
        marginVertical: 4,
        width: '100%',
        backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
        borderColor: Theme.PRIMARY,
        borderWidth: borderWith.value,
        borderRadius: 8,
    }));

    return (
        <Animated.View style={containerStyle}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                value={value}
                {...props}
                style={styles.input}
                onFocus={() => handleFocusChange(true)}
                onBlur={() => handleFocusChange(false)}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        fontSize: 16,
        color: '#000',
    },
});

export default FloatingLabelInput;
