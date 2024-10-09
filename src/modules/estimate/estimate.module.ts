import { Module } from '@nestjs/common';
import { EstimateController } from './estimate.controller';
import { EstimateService } from './estimate.service';
import { ExchangeModule } from '../../exchanges/exchange.module';

@Module({
    imports: [ExchangeModule],
    controllers: [EstimateController],
    providers: [EstimateService],
})
export class EstimateModule { }