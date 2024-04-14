import { Currency } from '@api/service/type';

export type RootStackParamList = {
    Login: undefined;
    CurrencyPrices: undefined;
    Trade: {
        currency: Currency;
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
