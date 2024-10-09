import { Module } from '@nestjs/common';
import { GetRatesController } from './getRatesPrices.controller';
import { GetRatesService } from './getRatesPrices.service';
import { ExchangeModule } from '../../exchanges/exchange.module';

@Module({
    imports: [ExchangeModule],
    controllers: [GetRatesController],
    providers: [GetRatesService],
})
export class GetRatesModule { }
