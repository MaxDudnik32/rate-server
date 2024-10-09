import { ExchangeConfig } from './exchange.config';

export const BINANCE_CONFIG: ExchangeConfig = {
    NAME: 'binance',
    BASE_URL: 'https://api.binance.com',
    ENDPOINTS: {
        PRICE: '/api/v3/ticker/price',
    }
};