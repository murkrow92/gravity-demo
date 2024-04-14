import React, { useCallback, useState, useEffect } from 'react';
import { TextInput, StyleSheet, TextInputProps, Pressable, Text } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import Theme from '@theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Font } from '@theme/font';

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
        borderWidth.value = withTiming(isFocused || error ? 2 : 0.5, {
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

    const containerStyle = useAnimatedStyle(() => ({
        padding: 8,
        marginTop: 4,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderColor: borderColor.value,
        borderWidth: borderWidth.value,
        backgroundColor: 'transparent',
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
            <Text style={styles.label}>{label}</Text>
            <Animated.View style={[containerStyle]}>
                <TextInput
                    placeholderTextColor={Theme.SECONDARY_TEXT_COLOR}
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
    border: {
        borderColor: Theme.PRIMARY,
    },
    input: {
        height: 40,
        fontSize: 14,
        color: Theme.TEXT_COLOR,
        width: '100%',
        fontFamily: Font.IBM.medium,
    },
    label: {
        color: Theme.WHITE,
        fontSize: 10,
        fontFamily: Font.IBM.regular,
    },
    icon: {
        padding: 10,
        position: 'absolute',
        right: 0,
    },
});

export default FloatingLabelInput;
