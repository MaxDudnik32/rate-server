import { Injectable } from '@nestjs/common';
import { TokenPair } from './tokenPair';
import { UniswapV2 } from './uniswapV2';
import { UniswapV3 } from './uniswapV3';
import { DexExchange, SwapSimulationResult } from '../../exchange.interface';

@Injectable()
export class UniswapProvider implements DexExchange {
    private tokenPair: TokenPair | null;
    private uniswapV2: UniswapV2 | null;
    private uniswapV3: UniswapV3 | null;

    constructor() {
        this.tokenPair = null;
        this.uniswapV2 = null;
        this.uniswapV3 = null;
    }

    setTokenPair(tokenIn: string, tokenOut: string): void {
        this.tokenPair = new TokenPair(tokenIn, tokenOut);
        this.uniswapV2 = new UniswapV2(this.tokenPair);
        this.uniswapV3 = new UniswapV3(this.tokenPair);
    }

    async executeSwapSimulation(inputAmount: number, tokenIn: string, tokenOut: string): Promise<SwapSimulationResult[]> {
        this.setTokenPair(tokenIn, tokenOut);

        const decimals = await this.tokenPair.getDecimals();
        if (!decimals) {
            throw new Error("Failed to get token decimals");
        }

        const [v2Results, v3Results] = await Promise.all([
            this.uniswapV2.getSwapResults(inputAmount, decimals),
            this.uniswapV3.getSwapResults(inputAmount, decimals)
        ]);

        return [...v2Results, ...v3Results];
    }
}