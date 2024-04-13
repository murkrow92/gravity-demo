import React, { useCallback, useState } from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
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

const Index = ({ label, ...props }: FloatingLabelInputProps) => {
    const [value, setValue] = useState('');
    const labelPosition = useSharedValue(props.value ? 1 : 0);

    React.useEffect(() => {
        labelPosition.value = withTiming(value !== '' ? 1 : 0, {
            duration: 200,
            easing: Easing.out(Easing.ease),
        });
    }, [value]);

    const changeLabelPosition = useCallback(
        (v: number) => {
            const alwaysOnTop = value !== '' ? 1 : 0;
            labelPosition.value = withTiming(v || alwaysOnTop, {
                duration: 200,
                easing: Easing.out(Easing.ease),
            });
        },
        [value]
    );

    const labelStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: 12,
        top: labelPosition.value === 0 ? 14 : -22,
        fontSize: labelPosition.value === 0 ? 16 : 14,
        color: labelPosition.value === 0 ? '#aaa' : '#000',
    }));

    return (
        <View style={styles.container}>
            <Animated.Text style={labelStyle}>{label}</Animated.Text>
            <TextInput
                {...props}
                style={styles.input}
                onFocus={() => changeLabelPosition(1)}
                onBlur={() => changeLabelPosition(0)}
                onChangeText={text => setValue(text)}
                value={value}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 8,
        marginVertical: 4,
        width: '100%',
        backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
        borderRadius: 8,
    },
    input: {
        height: 40,
        fontSize: 16,
        color: '#000',
    },
});

export default Index;
