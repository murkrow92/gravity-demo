import React, { useMemo } from 'react';
import { FlatList, Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Theme from '@theme';
import { useQuery } from '@tanstack/react-query';
import CurrencyModule from '@api/service/currency.ts';
import type { Currency } from '@api/service/type';

interface CurrencyListProps {
    data: Currency[];
}

function filterBySuffix(data: Currency[], suffix: string): Currency[] {
    return data.filter(item => item.symbol.endsWith(suffix));
}

const FirstRoute = (props: CurrencyListProps) => {
    const { data } = props;
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 16,
                    }}
                >
                    <Text style={{ color: Theme.TEXT_COLOR }}>{item.symbol}</Text>
                    <Text style={{ color: Theme.TEXT_COLOR }}>${item.price}</Text>
                </View>
            )}
            keyExtractor={item => item.symbol}
        />
    );
};

const SecondRoute = () => (
    <FlatList
        data={[
            { key: '1', title: 'Third Item' },
            { key: '2', title: 'Fourth Item' },
        ]}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        keyExtractor={item => item.key}
    />
);

const MyTabView = () => {
    const { data } = useQuery({
        queryKey: ['currencies'],
        queryFn: CurrencyModule.getCurrencies,
    });
    const layout = useWindowDimensions();
    const [index, setIndex] = React.useState(0);

    const usdtData = useMemo(() => {
        return data ? filterBySuffix(data, 'USDT') : [];
    }, [data]);

    return (
        <TabView
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
                all: () => <FirstRoute data={data || []} />,
                usdt: () => <FirstRoute data={usdtData} />,
                eth: SecondRoute,
                btc: SecondRoute,
                fdusd: SecondRoute,
                usdc: SecondRoute,
            })}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={props => (
                <TabBar
                    {...props}
                    indicatorStyle={styles.tabIndicator}
                    labelStyle={styles.tabLabel}
                    style={{ backgroundColor: 'white', shadowColor: '#fff' }}
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
