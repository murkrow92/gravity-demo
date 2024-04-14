import type { Currency } from '@api/service/type';

export function filterBySuffix(data: Currency[], suffix: string): Currency[] {
    return data.filter(item => item.symbol.endsWith(suffix));
}

export function detachSymbol(symbol: string, suffix: string): string[] {
    if (symbol.endsWith(suffix)) {
        const firstPart = symbol.substring(0, symbol.length - suffix.length);
        return [firstPart, suffix];
    }
    return [];
}
