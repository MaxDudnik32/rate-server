import { ExchangeConfig } from './exchange.config';

export const KUCOIN_CONFIG: ExchangeConfig = {
    NAME: 'kucoin',
    BASE_URL: 'https://api.kucoin.com',
    ENDPOINTS: {
        PRICE: '/api/v1/market/allTickers',
    }
};