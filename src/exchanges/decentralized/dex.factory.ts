import { Injectable } from '@nestjs/common';
import { DexExchange } from '../exchange.interface';
import { UniswapProvider } from './uniswap/provider';

@Injectable()
export class DecentralizedExchangeFactory {
    createExchange(type: 'uniswap'): DexExchange {
        switch (type) {
            case 'uniswap':
                return new UniswapProvider();
            default:
                throw new Error('Unknown decentralized exchange type');
        }
    }

    createAllExchanges(): DexExchange[] {
        return [
            this.createExchange('uniswap'),
        ];
    }
}
