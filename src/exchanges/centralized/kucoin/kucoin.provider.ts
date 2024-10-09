import { Injectable } from '@nestjs/common';
import { CexExchange, ExchangeRate } from '../../exchange.interface';
import { KUCOIN_CONFIG } from 'config/kucoin.config';
import axios from 'axios';

@Injectable()
export class KucoinProvider implements CexExchange {
    private readonly baseUrl: string;
    private readonly priceEndpoint: string;

    constructor() {
        this.baseUrl = KUCOIN_CONFIG.BASE_URL;
        this.priceEndpoint = KUCOIN_CONFIG.ENDPOINTS.PRICE;
    }

    async getPriceRate(inputCurrency: string, outputCurrency: string): Promise<ExchangeRate> {
        try {
            const priceUrl = '/api/v1/market/allTickers';
            const pair = `${inputCurrency}-${outputCurrency}`.toUpperCase();
            const revertPair = `${outputCurrency}-${inputCurrency}`.toUpperCase();

            const response = await axios.get(`${this.baseUrl}${priceUrl}`);

            const tickerData = response.data.data.ticker;

            for (const coin of tickerData) {
                if (coin.symbol === pair) {
                    return this.formatResponse(pair, Number(coin.last));
                } else if (coin.symbol === revertPair) {
                    return this.formatResponse(pair, 1 / Number(coin.last));
                }
            }

            return this.formatResponse(pair, null);
        } catch (error) {
            const errorMessage = this.handleError(error);
            console.error(errorMessage);
            return this.formatResponse(`${inputCurrency}-${outputCurrency}`, null);
        }
    }

    getName(): string {
        return 'kucoin';
    }

    private formatResponse(symbol: string, price: number | null): ExchangeRate {
        return {
            symbol,
            price: price ?? 0,
        };
    }

    private handleError(error): string {
        if (error.response) {
            return `API responded with status ${error.response.status}: ${error.response.statusText}`;
        } else if (error.request) {
            return `No response received from API: ${error.message}`;
        }
        return `Error setting up request: ${error.message}`;
    }
}