import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Modal from 'react-native-modal';

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
        <Modal isVisible={isVisible} onBackdropPress={onCancel} onBackButtonPress={onCancel}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Confirm Order</Text>
                <Text style={styles.modalMessage}>Are you sure you want to place this trade?</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    confirmButton: {
        backgroundColor: 'green',
        padding: 10,
        margin: 5,
        borderRadius: 4,
    },
    cancelButton: {
        backgroundColor: 'red',
        padding: 10,
        margin: 5,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default ConfirmTradeModal;
