import { Controller, Get, Query } from '@nestjs/common';
import { GetRatesService } from './getRatesPrices.service';

@Controller('getRates')
export class GetRatesController {
    constructor(private readonly estimateService: GetRatesService) { }

    @Get()
    async getEstimate(
        @Query('inputCurrency') inputCurrency: string,
        @Query('outputCurrency') outputCurrency: string,
    ) {
        return this.estimateService.findAllExchanges(inputCurrency, outputCurrency);
    }
}