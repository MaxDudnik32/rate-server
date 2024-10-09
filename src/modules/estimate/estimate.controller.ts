import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { EstimateService } from './estimate.service';

@Controller('estimate')
export class EstimateController {
    constructor(private readonly estimateService: EstimateService) { }

    @Get()
    async getEstimate(
        @Query('inputAmount', ParseFloatPipe) inputAmount: number,
        @Query('inputCurrency') inputCurrency: string,
        @Query('outputCurrency') outputCurrency: string,
    ) {
        return this.estimateService.findBestExchange(inputAmount, inputCurrency, outputCurrency);
    }
}
