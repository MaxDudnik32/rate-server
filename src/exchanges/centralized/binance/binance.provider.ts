import { Injectable } from '@nestjs/common';
import { CexExchange, ExchangeRate } from '../../exchange.interface';
import { BINANCE_CONFIG } from 'config/binance.config';
import axios from 'axios';

@Injectable()
export class BinanceProvider implements CexExchange {
    private readonly baseUrl: string;
    private readonly priceEndpoint: string;

    constructor() {
        this.baseUrl = BINANCE_CONFIG.BASE_URL;
        this.priceEndpoint = BINANCE_CONFIG.ENDPOINTS.PRICE;
    }

    async getPriceRate(inputCurrency: string, outputCurrency: string): Promise<ExchangeRate> {
        try {
            const pair = `${inputCurrency}${outputCurrency}`.toUpperCase();
            const revertPair = `${outputCurrency}${inputCurrency}`.toUpperCase();

            const response = await axios.get(`${this.baseUrl}${this.priceEndpoint}`);

            for (const coin of response.data) {
                if (coin.symbol === pair) {
                    return this.formatResponse(pair, Number(coin.price));
                } else if (coin.symbol === revertPair) {
                    return this.formatResponse(pair, 1 / Number(coin.price));
                }
            }

            return this.formatResponse(pair, null);
        } catch (error) {
            const errorMessage = this.handleError(error);
            console.error(errorMessage);
            return this.formatResponse(`${inputCurrency}${outputCurrency}`, null);
        }
    }

    getName(): string {
        return 'binance';
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