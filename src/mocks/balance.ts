export interface BalanceDetail {
    tokenBalance: number;
}

export const availableBalances: Record<string, BalanceDetail> = {
    USDT: {
        tokenBalance: 3000,
    },
    BTC: {
        tokenBalance: 0.01,
    },
};
