import React, { memo, useMemo } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from 'react-native';
import { TabBar, TabView } from 'react-native-tab-view';
import Theme from '@theme';
import { useQuery } from '@tanstack/react-query';
import CurrencyModule from '@api/service/currency.ts';
import type { Currency } from '@api/service/type';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spacing from '@components/Spacing.tsx';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { detachSymbol, filterBySuffix } from '@utils/symbolUtils.ts';
import { Font } from '@theme/font';

interface CurrencyListProps {
    data: Currency[];
    filter?: string;
}

const ListItem = memo(
    ({ item, filter }: { item: Currency; filter: string }) => {
        const navigation = useNavigation();
        const { symbol, price } = item;
        const [firstPart, suffix] = detachSymbol(item.symbol, filter || '');
        return (
            <TouchableOpacity
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: 16,
                }}
                activeOpacity={1}
                onPress={() => {
                    navigation.navigate('Trade', {
                        headerBackTitle: '',
                        symbol,
                        suffix,
                        price,
                    });
                }}
            >
                <Text
                    style={{
                        color: Theme.TEXT_COLOR,
                        fontSize: 16,
                        fontFamily: Font.IBM.medium,
                    }}
                >
                    {firstPart}
                    {suffix ? '/' : ''}
                    <Text
                        style={{
                            color: Theme.TEXT_COLOR,
                            fontSize: 16,
                            fontFamily: Font.IBM.medium,
                        }}
                    >
                        {suffix}
                    </Text>
                </Text>
                <Text
                    style={{ color: Theme.TEXT_COLOR, fontFamily: Font.IBM.medium, fontSize: 14 }}
                >
                    {price}
                </Text>
            </TouchableOpacity>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.item.price === nextProps.item.price;
    }
);

const CurrencyList = memo((props: CurrencyListProps) => {
    const { data, filter } = props;

    const filterData = useMemo(() => {
        if (data) {
            return filter ? filterBySuffix(data, filter) : data;
        }
        return [];
    }, [data]);

    return (
        <FlashList
            data={filterData}
            renderItem={({ item }) => <ListItem item={item} filter={filter || ''} />}
            keyExtractor={item => item.symbol}
            estimatedItemSize={40}
        />
    );
});

const MyTabView = () => {
    const { data } = useQuery({
        queryKey: ['currencies'],
        queryFn: CurrencyModule.getCurrencies,
        refetchInterval: 3000,
    });
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);
    const [sortAsc, setSortAsc] = React.useState(true);

    const sortDataByPrice = useMemo(() => {
        if (!data) return [];
        const sortedData = [...data];
        sortedData.sort((a, b) => {
            return sortAsc
                ? parseFloat(a.price) - parseFloat(b.price)
                : parseFloat(b.price) - parseFloat(a.price);
        });
        return sortedData;
    }, [data, sortAsc]);

    const renderScene = ({ route }: { route: { key: string } }) => {
        switch (route.key) {
            case 'usdt':
                return <CurrencyList data={sortDataByPrice} filter="USDT" />;
            case 'eth':
                return <CurrencyList data={sortDataByPrice} filter="ETH" />;
            case 'btc':
                return <CurrencyList data={sortDataByPrice} filter="BTC" />;
            case 'fdusd':
                return <CurrencyList data={sortDataByPrice} filter="FDUSD" />;
            case 'usdc':
                return <CurrencyList data={sortDataByPrice} filter="USDC" />;
            default:
                return null;
        }
    };

    return (
        <TabView
            style={{ backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR }}
            navigationState={{
                index,
                routes: [
                    // { key: 'all', title: 'All' },
                    { key: 'usdt', title: 'USDT' },
                    { key: 'eth', title: 'ETH' },
                    { key: 'btc', title: 'BTC' },
                    { key: 'fdusd', title: 'FDUSD' },
                    { key: 'usdc', title: 'USDC' },
                ],
            }}
            renderScene={renderScene}
            lazy
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <View>
                    <TabBar
                        {...props}
                        indicatorStyle={styles.tabIndicator}
                        labelStyle={styles.tabLabel}
                        style={{
                            backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR,
                            shadowColor: '#fff',
                        }}
                        scrollEnabled
                        tabStyle={{ width: 80 }}
                        renderLabel={({ route, focused }) => (
                            <View style={[styles.tabItem, focused ? styles.tabItemFocused : null]}>
                                <Text
                                    style={{
                                        textAlign: 'center',
                                        fontFamily: Font.IBM.bold,
                                        fontSize: 14,
                                        color: focused ? Theme.PRIMARY : Theme.WHITE,
                                    }}
                                >
                                    {route.title}
                                </Text>
                            </View>
                        )}
                    />
                    <View
                        style={{
                            paddingVertical: 8,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                        }}
                    >
                        <Text
                            style={{
                                color: Theme.PLACE_HOLDER_TEXT_COLOR,
                                fontFamily: Font.IBM.bold,
                            }}
                        >
                            Name
                        </Text>
                        <Pressable
                            onPress={() => {
                                setSortAsc(!sortAsc);
                            }}
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    color: Theme.PLACE_HOLDER_TEXT_COLOR,
                                    fontFamily: Font.IBM.bold,
                                }}
                            >
                                Price
                            </Text>
                            <Spacing size={4} direction="horizontal" />
                            <FontAwesome
                                name={sortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
                                size={16}
                                color={Theme.TEXT_COLOR}
                            />
                        </Pressable>
                    </View>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    item: {
        padding: 20,
        fontSize: 18,
    },
    tabLabel: {
        fontSize: 14,
        color: 'black',
    },
    tabIndicator: {
        backgroundColor: undefined,
    },
    tabItem: {
        paddingVertical: 2,
        width: 60,
        alignItems: 'center',
    },
    tabItemFocused: {
        backgroundColor: Theme.PLACE_HOLDER_TEXT_COLOR,
        borderRadius: 8,
    },
});

export default MyTabView;
