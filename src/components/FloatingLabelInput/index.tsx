import React, { useCallback, useState, useEffect } from 'react';
import { TextInput, StyleSheet, TextInputProps, Pressable } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import Theme from '@theme';
import Icon from 'react-native-vector-icons/FontAwesome';

interface FloatingLabelInputProps extends TextInputProps {
    label: string;
    icon?: string;
    error?: string;
    onIconPress?: () => void;
}

const FloatingLabelInput = (props: FloatingLabelInputProps) => {
    const { label, value, icon, onIconPress, error } = props;
    const [isFocused, setIsFocused] = useState(false);
    const labelPosition = useSharedValue(0);
    const borderWidth = useSharedValue(0);
    const borderColor = useSharedValue(Theme.PRIMARY);
    const errorShake = useSharedValue(0);

    useEffect(() => {
        labelPosition.value = withTiming(value !== '' || isFocused ? 1 : 0, {
            duration: isFocused ? 500 : 200,
            easing: Easing.out(Easing.ease),
        });
        borderWidth.value = withTiming(isFocused || error ? 2 : 0, {
            duration: 300,
        });
        borderColor.value = withTiming(error ? Theme.TEXT_INPUT_ERROR_COLOR : Theme.PRIMARY, {
            duration: 300,
        });
        errorShake.value = withRepeat(
            withTiming(error ? 1 : 0, {
                duration: 100,
                easing: Easing.out(Easing.ease),
            }),
            5,
            true
        );
    }, [value, isFocused, error]);

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
        borderColor: borderColor.value,
        borderWidth: borderWidth.value,
        borderRadius: 8,
    }));

    const errorStyle = useAnimatedStyle(() => ({
        color: Theme.TEXT_INPUT_ERROR_COLOR,
        transform: [
            {
                translateX: errorShake.value * 10,
            },
        ],
    }));

    return (
        <>
            <Animated.View style={containerStyle}>
                <Animated.Text style={labelStyle}>{label}</Animated.Text>
                <TextInput
                    value={value}
                    {...props}
                    style={styles.input}
                    onFocus={() => handleFocusChange(true)}
                    onBlur={() => handleFocusChange(false)}
                />
                {icon && (
                    <Pressable onPress={onIconPress} style={styles.icon}>
                        <Icon name={icon} size={16} color={Theme.TEXT_COLOR} />
                    </Pressable>
                )}
            </Animated.View>
            <Animated.Text style={errorStyle}>{error}</Animated.Text>
        </>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        fontSize: 16,
        color: '#000',
        width: '100%',
    },
    icon: {
        padding: 10,
        position: 'absolute',
        right: 0,
    },
});

export default FloatingLabelInput;
