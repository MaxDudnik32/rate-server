export interface ExchangeConfig {
    NAME: string;
    BASE_URL: string;
    ENDPOINTS: {
        [key: string]: string;
    };
};