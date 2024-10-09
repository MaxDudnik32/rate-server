import { Injectable } from '@nestjs/common';
import { ExchangeService } from '../../exchanges/exchange.service';

interface Rate {
    exchangeName: string;
    outputAmount: number;
    rate: { price: number };
    pool?: string;
    error?: { statusCode: number, message: string };
}

@Injectable()
export class EstimateService {
    constructor(private readonly exchangeService: ExchangeService) { }

    async findBestExchange(inputAmount: number, inputCurrency: string, outputCurrency: string) {
        const rates: Rate[] = await this.exchangeService.getAllRates(inputAmount, inputCurrency, outputCurrency);

        const bestRate = rates.reduce((prev, current) => {
            return current.outputAmount > prev.outputAmount ? current : prev;
        }, { exchangeName: "No exchange", outputAmount: 0, rate: { price: 0 } } as Rate);

        const { exchangeName, outputAmount, rate, pool } = bestRate;

        return {
            exchangeName,
            ...(pool ? { pool } : {}),
            outputAmount,
            rate: rate.price,
        };
    }
}