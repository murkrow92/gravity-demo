import React, { useMemo, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ScrollView } from 'react-native';
import Theme from '@theme';
import { Font } from '@theme/font.ts';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { availableBalances } from '../mocks/balance.ts';
import { RootStackParamList } from '@typing/navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { detachSymbol } from '../utils/symbolUtils.ts';
import PrimaryButton from '@components/PrimaryButton';
import SuffixInput from '@components/SuffixInput';
import { formatDecimalNumber } from '../utils/numberUtils.ts';
import ConfirmTradeModal from '@components/ConfirmTradeModal';

type Props = NativeStackScreenProps<RootStackParamList, 'Trade'>;

const TradeScreen: React.FC = () => {
    const { params } = useRoute<Props['route']>();
    const navigation = useNavigation();
    const { symbol, suffix, price: paramPrice = '' } = params;
    const [mainToken, tokenToCompare] = useMemo(() => {
        return suffix ? detachSymbol(symbol, suffix) : ['', ''];
    }, [symbol, suffix]);
    const [isBuyMode, setIsBuyMode] = useState(true);
    const [orderType, setOrderType] = useState<'LIMIT' | 'MARKET'>('LIMIT');
    const [price, setPrice] = useState(paramPrice);
    const [amount, setAmount] = useState('');
    const [total, setTotal] = useState('');
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);

    const tokenToTrade = isBuyMode ? tokenToCompare : mainToken;
    const tokenToTradeFor = isBuyMode ? mainToken : tokenToCompare;
    const availableBalance = availableBalances[tokenToTrade]?.tokenBalance || 0;

    const calculateTotal = (newPrice: string, newAmount: string) => {
        const numericPrice = parseFloat(newPrice);
        const numericAmount = parseFloat(newAmount);
        if (!Number.isNaN(numericPrice) && !Number.isNaN(numericAmount)) {
            setTotal((numericPrice * numericAmount).toString());
        }
    };

    const calculateAmount = (newTotal: string) => {
        const numericPrice = parseFloat(price);
        const numericTotal = parseFloat(newTotal);
        if (!Number.isNaN(numericTotal) && !Number.isNaN(numericPrice) && numericPrice > 0) {
            setAmount((numericTotal / numericPrice).toString());
        }
    };

    const handlePercentagePress = (percentage: number) => {
        const numericTotal = formatDecimalNumber(availableBalance * percentage);
        setTotal(numericTotal);
        calculateAmount(numericTotal);
    };

    const handleOrderConfirmation = () => {
        setConfirmModalVisible(true);
    };

    const validateNumericInputs = (text: string) => {
        const numericText = parseFloat(text);
        if (Number.isNaN(numericText)) {
            throw new Error('Input must be numeric');
        } else if (numericText < 0.01) {
            throw new Error('Value cannot be less than 0.01');
        }
    };

    const resetInputs = () => {
        setAmount('');
        setTotal('');
    };

    const renderLimit = () => {
        return (
            orderType === 'LIMIT' && (
                <>
                    <SuffixInput
                        title="Price"
                        placeholder="0"
                        placeholderTextColor={Theme.TEXT_COLOR_LIGHT}
                        suffix={tokenToTrade}
                        value={price}
                        onChangeText={newPrice => {
                            setPrice(newPrice);
                            calculateTotal(newPrice, amount);
                        }}
                        keyboardType="numeric"
                        validator={validateNumericInputs}
                    />
                    <SuffixInput
                        title="Amount"
                        placeholder="0"
                        placeholderTextColor={Theme.TEXT_COLOR_LIGHT}
                        suffix={tokenToTradeFor}
                        value={amount}
                        onChangeText={newAmount => {
                            setAmount(newAmount);
                            calculateTotal(price, newAmount);
                        }}
                        keyboardType="numeric"
                        validator={validateNumericInputs}
                    />
                </>
            )
        );
    };

    const renderMarket = () => {
        return (
            orderType === 'MARKET' && (
                <SuffixInput title="Price" suffix={tokenToTrade} value="Market" editable={false} />
            )
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity
                        style={[styles.headerButton, isBuyMode && styles.buyButton]}
                        onPress={() => {
                            resetInputs();
                            setIsBuyMode(true);
                        }}
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
                        onPress={() => {
                            resetInputs();
                            setIsBuyMode(false);
                        }}
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
                <View style={styles.subHeaderButtonContainer}>
                    <TouchableOpacity
                        style={styles.subHeaderButton}
                        onPress={() => setOrderType('LIMIT')}
                        hitSlop={{
                            left: 12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                    >
                        <Text
                            style={[
                                styles.subHeaderButtonText,
                                orderType === 'LIMIT' && styles.subHeaderButtonTextActive,
                            ]}
                        >
                            Limit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={{
                            left: 12,
                            right: 12,
                            top: 12,
                            bottom: 12,
                        }}
                        style={styles.subHeaderButton}
                        onPress={() => {
                            setOrderType('MARKET');
                            setPrice(paramPrice);
                        }}
                    >
                        <Text
                            style={[
                                styles.subHeaderButtonText,
                                orderType === 'MARKET' && styles.subHeaderButtonTextActive,
                            ]}
                        >
                            Market
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.balanceText}>
                    Available balance {formatDecimalNumber(availableBalance)} {tokenToTrade}
                </Text>
                {renderLimit()}
                {renderMarket()}
                <View style={styles.percentagesRow}>
                    {['25%', '50%', '75%', '100%'].map(percentage => (
                        <TouchableOpacity
                            key={percentage}
                            style={styles.percentageButton}
                            onPress={() => handlePercentagePress(parseFloat(percentage) / 100)}
                        >
                            <Text style={styles.percentageButtonText}>{percentage}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <SuffixInput
                    style={{ marginTop: 20 }}
                    placeholder="0"
                    placeholderTextColor={Theme.TEXT_COLOR_LIGHT}
                    value={total}
                    onChangeText={newTotal => {
                        setTotal(newTotal);
                        if (orderType === 'LIMIT') {
                            calculateAmount(newTotal);
                        }
                    }}
                    title="Total"
                    suffix={tokenToTrade}
                    keyboardType="numeric"
                    validator={text => {
                        const numericText = parseFloat(text);
                        if (Number.isNaN(numericText)) {
                            throw new Error('Input must be numeric');
                        } else if (numericText > availableBalance) {
                            throw new Error('Your balance is insufficient');
                        }
                    }}
                />
            </ScrollView>
            <PrimaryButton
                buttonStyle={{ backgroundColor: isBuyMode ? Theme.PRIMARY : Theme.WARNING }}
                title={`${isBuyMode ? 'Buy' : 'Sell'} ${mainToken}`}
                onPress={handleOrderConfirmation}
            />
            <ConfirmTradeModal
                isVisible={confirmModalVisible}
                onConfirm={() => {
                    navigation.dispatch(StackActions.replace('CurrencyPrices'));
                }}
                onCancel={() => {
                    setConfirmModalVisible(false);
                }}
            />
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
        fontWeight: 'bold',
        color: Theme.TEXT_COLOR_LIGHT,
    },
    headerButtonTextActive: {
        color: Theme.TEXT_COLOR_DARK,
    },
    balanceText: {
        color: Theme.TEXT_COLOR_LIGHT,
        marginTop: 20,
        marginBottom: 12,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    percentagesRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    confirmButton: {
        backgroundColor: '#00ff00',
        paddingVertical: 10,
        marginTop: 20,
    },
    subHeaderButtonContainer: {
        flexDirection: 'row',
    },
    subHeaderButton: {
        marginRight: 12,
    },
    subHeaderButtonText: {
        fontFamily: Font.IBM.medium,
        fontSize: 14,
        color: Theme.TEXT_COLOR_LIGHT,
    },
    subHeaderButtonTextActive: {
        color: Theme.PRIMARY,
    },
    percentageButton: {
        width: '23%',
        backgroundColor: '#3E4E64',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 4,
    },
    percentageButtonText: {
        fontFamily: Font.IBM.regular,
        fontSize: 14,
        color: Theme.TEXT_COLOR_LIGHT,
    },
});

export default TradeScreen;
