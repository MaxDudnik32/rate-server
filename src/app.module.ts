import { Module } from '@nestjs/common';
import { EstimateModule } from './modules/estimate/estimate.module';
import { ExchangeModule } from './exchanges/exchange.module';
import { GetRatesModule } from './modules/get-rates/getRatesPrices.module';

@Module({
    imports: [
        ExchangeModule,
        GetRatesModule,
        EstimateModule,
    ]
})
export class AppModule { }
