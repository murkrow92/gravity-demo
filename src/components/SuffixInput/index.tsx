import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from 'react-native';
import Theme from '@theme';
import { Font } from '@theme/font.ts';

interface SuffixInput extends TextInputProps {
    title: string;
    suffix: string;
    validator?: (textToValidate: string) => void;
    style?: StyleProp<ViewStyle>;
}

const SuffixInput: React.FC<SuffixInput> = ({
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
                <Text style={styles.label}>{title}</Text>
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
    label: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    inputContainer: {
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
    },
    suffix: {
        color: '#AAAAAA',
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
