import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../../exchanges/exchange.service';

interface RateWithPool {
    exchangeType: string;
    exchangeName: string;
    pool: string;
    outputAmount: number;
    rate: { symbol: string; price: number };
}

interface RateWithoutPool {
    exchangeType: string;
    exchangeName: string;
    outputAmount: number;
    rate: any;
}

type Rate = RateWithPool | RateWithoutPool;

@Injectable()
export class GetRatesService {
    constructor(private readonly exchangeService: ExchangeService) { }

    async findAllExchanges(inputCurrency: string, outputCurrency: string) {
        const rates = await this.exchangeService.getAllRates(1, inputCurrency, outputCurrency);

        const transformedRates = rates.map(rate => {
            const hasPool = (rate: Rate): rate is RateWithPool => 'pool' in rate;

            return {
                exchangeName: rate.exchangeName,
                ...(hasPool(rate) ? { pool: rate.pool } : {}),
                rate: rate.outputAmount,
            };
        });

        return transformedRates;
    }
}
