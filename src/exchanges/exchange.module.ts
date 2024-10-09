import { Module } from '@nestjs/common';
import { CentralizedExchangeFactory } from './centralized/cex.factory';
import { DecentralizedExchangeFactory } from './decentralized/dex.factory';
import { BinanceProvider } from './centralized/binance/binance.provider';
import { KucoinProvider } from './centralized/kucoin/kucoin.provider';
import { ExchangeService } from './exchange.service';

@Module({
    providers: [
        CentralizedExchangeFactory,
        DecentralizedExchangeFactory,
        BinanceProvider,
        KucoinProvider,
        ExchangeService
    ],
    exports: [
        CentralizedExchangeFactory,
        DecentralizedExchangeFactory,
        ExchangeService
    ],
})
export class ExchangeModule { }

