import { Injectable } from '@nestjs/common';
import { CexExchange } from '../exchange.interface';
import { BinanceProvider } from './binance/binance.provider';
import { KucoinProvider } from './kucoin/kucoin.provider';

@Injectable()
export class CentralizedExchangeFactory {
    createExchange(type: 'binance' | 'kucoin'): CexExchange {
        switch (type) {
            case 'binance':
                return new BinanceProvider();
            case 'kucoin':
                return new KucoinProvider();
            default:
                throw new Error('Unknown centralized exchange type');
        }
    }

    createAllExchanges(): CexExchange[] {
        return [
            this.createExchange('binance'),
            this.createExchange('kucoin'),
        ];
    }
}