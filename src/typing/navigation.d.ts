import { Currency } from '@api/service/type';

export type RootStackParamList = {
    Login: undefined;
    CurrencyPrices: undefined;
    Trade: {
        symbol: string;
        suffix?: string;
        price: string;
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
