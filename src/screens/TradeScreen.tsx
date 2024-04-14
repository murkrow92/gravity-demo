import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert, TextInput, TouchableOpacity } from 'react-native';
import Theme from '@theme';
import { Font } from '@theme/font.ts';

const TradeScreen: React.FC = () => {
    const availableBalance = 1000000;
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [orderType, setOrderType] = useState('LIMIT');
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState('');

    const calculateTotal = (newPrice: string, newAmount: string) => {
        const numericPrice = parseFloat(newPrice);
        const numericAmount = parseFloat(newAmount);
        if (!isNaN(numericPrice) && !isNaN(numericAmount)) {
            setTotal((numericPrice * numericAmount).toString());
        }
    };

    const calculateAmount = (newTotal: string) => {
        const numericPrice = parseFloat(price);
        const numericTotal = parseFloat(newTotal);
        if (!isNaN(numericPrice) && numericPrice > 0) {
            setAmount((numericTotal / numericPrice).toString());
        }
    };

    const handlePercentagePress = (percentage: number) => {
        const numericTotal = (availableBalance * percentage).toFixed(2);
        setTotal(numericTotal);
        calculateAmount(numericTotal);
    };

    const handleOrderConfirmation = () => {
        // Here you should have the logic to send the order to your API
        // For now, we'll just show an alert
        Alert.alert(
            isBuyMode ? 'Confirm Buy Order' : 'Confirm Sell Order',
            `Are you sure you want to ${isBuyMode ? 'buy' : 'sell'}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        // Here you would call your API to execute the order
                        Alert.alert('Order placed successfully!');
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={[styles.headerButton, isBuyMode && styles.buyButton]}
                    onPress={() => setIsBuyMode(true)}
                >
                    <Text
                        style={[
                            styles.headerButtonText,
                            isBuyMode && styles.headerButtonTextActive,
                        ]}
                    >
                        BUY
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.headerButton, !isBuyMode && styles.sellButton]}
                    onPress={() => setIsBuyMode(false)}
                >
                    <Text
                        style={[
                            styles.headerButtonText,
                            !isBuyMode && styles.headerButtonTextActive,
                        ]}
                    >
                        SELL
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
                <TouchableOpacity
                    style={orderType === 'LIMIT' ? styles.buyButton : styles.sellButton}
                    onPress={() => setOrderType('LIMIT')}
                >
                    <Text>Limit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={orderType === 'MARKET' ? styles.buyButton : styles.sellButton}
                    onPress={() => setOrderType('MARKET')}
                >
                    <Text>Market</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.balanceText}>
                Available balance {availableBalance.toFixed(2)} USDT
            </Text>
            {orderType === 'LIMIT' && (
                <>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={newPrice => {
                            setPrice(newPrice);
                            calculateTotal(newPrice, amount);
                        }}
                        placeholder="Price"
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={newAmount => {
                            setAmount(newAmount);
                            calculateTotal(price, newAmount);
                        }}
                        placeholder="Amount"
                        keyboardType="numeric"
                    />
                </>
            )}
            <View style={styles.percentagesRow}>
                {['25%', '50%', '75%', '100%'].map(percentage => (
                    <TouchableOpacity
                        key={percentage}
                        onPress={() => handlePercentagePress(parseFloat(percentage) / 100)}
                    >
                        <Text>{percentage}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput
                style={styles.input}
                value={total}
                onChangeText={newTotal => {
                    setTotal(newTotal);
                    if (orderType === 'LIMIT') {
                        calculateAmount(newTotal);
                    }
                }}
                placeholder="Total"
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleOrderConfirmation}>
                <Text>{`${isBuyMode ? 'Buy' : 'Sell'} DOGE`}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
        height: 36,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.BORDER,
    },
    headerButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buyButton: {
        backgroundColor: Theme.PRIMARY,
    },
    sellButton: {
        backgroundColor: Theme.WARNING,
    },
    headerButtonText: {
        fontSize: 14,
        fontFamily: Font.IBM.bold,
        color: Theme.TEXT_COLOR_LIGHT,
    },
    headerButtonTextActive: {
        color: Theme.TEXT_COLOR_DARK,
    },
    balanceText: {
        color: 'white',
        alignSelf: 'center',
        marginVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    percentagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    confirmButton: {
        backgroundColor: '#00ff00',
        paddingVertical: 10,
        marginTop: 20,
    },
});

export default TradeScreen;
