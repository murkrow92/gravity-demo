import { GET } from '@api/axios.ts';
import type { Currency } from './type.d.ts';

const getCurrencies = async () => {
    const { data } = (await GET(
        '/ticker/price',
        {},
        {
            baseURL: 'https://api.binance.com/api/v3',
        }
    )) as { data: Currency[] };
    return data;
};

const CurrencyModule = {
    getCurrencies,
};

export default CurrencyModule;
