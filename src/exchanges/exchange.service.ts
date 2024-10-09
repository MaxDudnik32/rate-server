import { Injectable } from '@nestjs/common';
import { CentralizedExchangeFactory } from './centralized/cex.factory';
import { DecentralizedExchangeFactory } from './decentralized/dex.factory';
import { CexExchange, DexExchange } from './exchange.interface';

@Injectable()
export class ExchangeService {
    private centralizedExchanges: CexExchange[];
    private decentralizedExchanges: DexExchange[];

    constructor(
        private readonly centralizedFactory: CentralizedExchangeFactory,
        private readonly decentralizedFactory: DecentralizedExchangeFactory,
    ) {
        this.centralizedExchanges = this.centralizedFactory.createAllExchanges();
        this.decentralizedExchanges = this.decentralizedFactory.createAllExchanges();
    }

    async getAllRates(inputAmount: number, inputCurrency: string, outputCurrency: string) {
        const centralizedRatesPromises = this.centralizedExchanges.map(async exchange => {
            try {
                const rate = await exchange.getPriceRate(inputCurrency, outputCurrency);
                return rate ? {
                    exchangeType: 'Centralized',
                    exchangeName: exchange.getName(),
                    outputAmount: Number(inputAmount) * rate.price,
                    rate
                } : null;
            } catch (error) {
                console.error(`Error getting price on ${exchange.getName()}:`, error);
                return {
                    exchangeType: 'Centralized',
                    exchangeName: exchange.getName(),
                    outputAmount: 0,
                    rate: { price: 0 },
                    error: {
                        statusCode: 500,
                        message: 'Failed to execute get exchange price'
                    }
                };
            }
        });

        const decentralizedRatesPromises = this.decentralizedExchanges.map(async dex => {
            try {
                const simulationResult = await dex.executeSwapSimulation(inputAmount, inputCurrency, outputCurrency);
                return simulationResult.map(item => ({
                    exchangeType: 'Decentralized',
                    exchangeName: item.dex,
                    pool: item.pool,
                    outputAmount: item.outputAmount,
                    rate: {
                        symbol: `${inputCurrency}-${outputCurrency}`,
                        price: item.price
                    }
                }));
            } catch (error) {
                console.error(`Error executing swap simulation on dex:`, error);
                return {
                    exchangeType: 'Decentralized',
                    exchangeName: "",
                    outputAmount: 0,
                    rate: { price: 0 },
                    error: {
                        statusCode: 500,
                        message: 'Failed to execute swap simulation'
                    }
                };
            }
        });

        const centralizedRates = await Promise.all(centralizedRatesPromises);
        const decentralizedRates = await Promise.all(decentralizedRatesPromises);

        const flattenedDecentralizedRates = decentralizedRates.flat();

        return [...centralizedRates, ...flattenedDecentralizedRates];
    }
}