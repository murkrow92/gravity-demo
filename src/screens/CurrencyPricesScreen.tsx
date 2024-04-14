import React, { useCallback, useMemo } from 'react';
import {
    FlatList,
    Text,
    StyleSheet,
    useWindowDimensions,
    View,
    Pressable,
    TouchableOpacity,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Theme from '@theme';
import { useQuery } from '@tanstack/react-query';
import CurrencyModule from '@api/service/currency.ts';
import type { Currency } from '@api/service/type';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Spacing from '@components/Spacing.tsx';
import { useNavigation } from '@react-navigation/native';
import { detachSymbol, filterBySuffix } from '../utils/symbolUtils.ts';

interface CurrencyListProps {
    data: Currency[];
    filter?: string;
}

const CurrencyList = (props: CurrencyListProps) => {
    const { data, filter } = props;
    const navigation = useNavigation();

    const filterData = useMemo(() => {
        if (data) {
            return filter ? filterBySuffix(data, filter) : data;
        }
        return [];
    }, [data]);

    // eslint-disable-next-line react/no-unused-prop-types
    const itemRender = useCallback(({ item }: { item: Currency }) => {
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
                        symbol,
                        suffix,
                        price,
                    });
                }}
            >
                <Text style={{ color: Theme.TEXT_COLOR }}>
                    {firstPart}
                    {suffix ? '/' : ''}
                    <Text style={{ color: Theme.TEXT_COLOR }}>{suffix}</Text>
                </Text>
                <Text style={{ color: Theme.TEXT_COLOR }}>{price}</Text>
            </TouchableOpacity>
        );
    }, []);

    return (
        <FlatList data={filterData} renderItem={itemRender} keyExtractor={item => item.symbol} />
    );
};

const MyTabView = () => {
    const { data } = useQuery({
        queryKey: ['currencies'],
        queryFn: CurrencyModule.getCurrencies,
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

    return (
        <TabView
            style={{ backgroundColor: Theme.PRIMARY_BACKGROUND_COLOR }}
            navigationState={{
                index,
                routes: [
                    { key: 'all', title: 'All' },
                    { key: 'usdt', title: 'USDT' },
                    { key: 'eth', title: 'ETH' },
                    { key: 'btc', title: 'BTC' },
                    { key: 'fdusd', title: 'FDUSD' },
                    { key: 'usdc', title: 'USDC' },
                ],
            }}
            renderScene={SceneMap({
                all: () => <CurrencyList data={sortDataByPrice} />,
                usdt: () => <CurrencyList data={sortDataByPrice} filter="USDT" />,
                eth: () => <CurrencyList data={sortDataByPrice} filter="ETH" />,
                btc: () => <CurrencyList data={sortDataByPrice} filter="BTC" />,
                fdusd: () => <CurrencyList data={sortDataByPrice} filter="FDUSD" />,
                usdc: () => <CurrencyList data={sortDataByPrice} filter="USDC" />,
            })}
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
                                <Text style={{ color: focused ? Theme.WHITE : Theme.TEXT_COLOR }}>
                                    {route.title}
                                </Text>
                            </View>
                        )}
                    />
                    <View
                        style={{
                            paddingTop: 8,
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            paddingHorizontal: 16,
                        }}
                    >
                        <Text style={{ color: Theme.TEXT_COLOR }}>Name</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: Theme.TEXT_COLOR }}>Price</Text>
                            <Spacing size={4} direction="horizontal" />
                            <Pressable
                                onPress={() => {
                                    setSortAsc(!sortAsc);
                                }}
                            >
                                <FontAwesome
                                    name={sortAsc ? 'sort-amount-asc' : 'sort-amount-desc'}
                                    size={16}
                                    color={Theme.TEXT_COLOR}
                                />
                            </Pressable>
                        </View>
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
        fontSize: 12,
        color: 'black',
    },
    tabIndicator: {
        backgroundColor: undefined,
    },
    tabItem: {
        paddingVertical: 2,
        width: 50,
        alignItems: 'center',
    },
    tabItemFocused: {
        backgroundColor: Theme.TEXT_INPUT_DEFAULT_COLOR,
        borderRadius: 8,
    },
});

export default MyTabView;
