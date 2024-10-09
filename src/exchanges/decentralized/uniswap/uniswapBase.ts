import { RpcProvider } from './RpcProvider';
import { TokenPair } from './tokenPair';

export abstract class UniswapBase {
    protected provider: RpcProvider;
    protected tokenPair: TokenPair;

    constructor(tokenPair: TokenPair) {
        if (new.target === UniswapBase) {
            throw new Error("UniswapBase is an abstract class and cannot be instantiated directly");
        }
        this.provider = RpcProvider.getInstance();
        this.tokenPair = tokenPair;
    }

    abstract getSwapResults(inputAmount: any, decimals: any): Promise<any[]>;
}