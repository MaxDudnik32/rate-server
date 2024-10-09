export interface CexExchange {
    getPriceRate(inputCurrency: string, outputCurrency: string): Promise<ExchangeRate>;
    getName(): string;
}

export interface DexExchange {
    executeSwapSimulation(inputAmount: number, tokenIn: string, tokenOut: string): Promise<SwapSimulationResult[]>;
}

export interface ExchangeRate {
    symbol: string;
    price: number;
}

export interface SwapSimulationResult {
    dex: string;
    inputAmount: number;
    pool: string;
    outputAmount: number;
    price: number;
    fee: number;
}
