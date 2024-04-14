import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';
import Theme from '@theme';
import { Font } from '@theme/font.ts';

interface ConfirmationModalProps {
    isVisible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmTradeModal: React.FC<ConfirmationModalProps> = ({
    isVisible,
    onConfirm,
    onCancel,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                Alert.alert('Success', `Your trade was successfully placed!`);
                onConfirm();
            }, 2000);
        } catch (e) {
            setIsLoading(false);
            setError('Failed to process your order. Please try again.');
            Alert.alert('Error', error);
        }
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={isLoading ? undefined : onCancel}
            onBackButtonPress={isLoading ? undefined : onCancel}
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Confirm Trade</Text>
                <Text style={styles.modalMessage}>Are you sure you want to place this trade?</Text>
                {isLoading ? (
                    <View style={styles.footer}>
                        <ActivityIndicator size="large" color={Theme.PRIMARY} />
                    </View>
                ) : (
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.buttonTextConfirm}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.buttonTextCancel}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: Theme.POPUP_BACKGROUND_COLOR,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
        fontFamily: Font.IBM.bold,
        color: Theme.TEXT_COLOR_LIGHT,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: Font.IBM.regular,
        color: Theme.TEXT_COLOR_LIGHT,
    },
    confirmButton: {
        width: '100%',
        backgroundColor: Theme.PRIMARY,
        borderRadius: 8,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        width: '100%',
        marginTop: 8,
        borderRadius: 8,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextConfirm: {
        color: Theme.TEXT_COLOR_DARK,
        fontFamily: Font.IBM.bold,
        fontSize: 16,
    },
    buttonTextCancel: {
        color: Theme.TEXT_COLOR_LIGHT,
        fontFamily: Font.IBM.bold,
        fontSize: 16,
    },
    footer: {
        width: '100%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ConfirmTradeModal;
