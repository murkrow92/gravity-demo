export type RootStackParamList = {
    Login: undefined;
    CurrencyPrices: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
