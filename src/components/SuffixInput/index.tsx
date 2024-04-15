import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    StyleProp,
    ViewStyle,
    Platform,
} from 'react-native';
import Theme from '@theme';
import { Font } from '@theme/font.ts';

interface SuffixInputProps extends TextInputProps {
    title: string;
    suffix: string;
    // eslint-disable-next-line no-unused-vars
    validator?: (textToValidate: string) => void;
    style?: StyleProp<ViewStyle>;
}

const SuffixInput: React.FC<SuffixInputProps> = ({
    title,
    suffix,
    validator = () => null,
    onChangeText,
    style,
    ...rest
}) => {
    const [error, setError] = useState('');
    return (
        <View style={[styles.container, style]}>
            <View style={styles.inputContainer}>
                <Text style={styles.title}>{title}</Text>
                <TextInput
                    style={[styles.input]}
                    {...rest}
                    onChangeText={text => {
                        try {
                            onChangeText?.(text);
                            validator(text);
                            setError('');
                        } catch (e) {
                            setError((e as Error)?.message || '');
                        }
                    }}
                />
                <Text style={styles.suffix}>{suffix}</Text>
            </View>
            <Text style={styles.error}>{error}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 4,
    },
    title: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 14,
        fontWeight: 'bold',
    },
    inputContainer: {
        paddingVertical: Platform.OS === 'ios' ? 8 : 0,
        flexDirection: 'row',
        borderColor: Theme.BORDER,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    input: {
        flex: 1,
        color: '#FFFFFF',
        textAlign: 'right',
        paddingRight: 8,
    },
    suffix: {
        color: Theme.TEXT_COLOR_LIGHT,
        fontSize: 14,
    },
    error: {
        marginTop: 4,
        fontSize: 12,
        fontFamily: Font.IBM.medium,
        color: Theme.WARNING,
        height: 20,
    },
});

export default SuffixInput;
