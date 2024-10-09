import { Contract, parseUnits } from "ethers";
import { UniswapBase } from './uniswapBase';
import { TokenPair } from './tokenPair';
import { contractABI, factoryv3ABI } from './ABI';

export class UniswapV3 extends UniswapBase {
    static ROUTER_ADDRESS = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";
    static FACTORY_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
    static FEE_OPTIONS = ["100", "500", "3000", "10000"];
    private router: Contract;
    private factory: Contract;

    constructor(tokenPair: TokenPair) {
        super(tokenPair);
        this.router = new Contract(UniswapV3.ROUTER_ADDRESS, contractABI, this.provider);
        this.factory = new Contract(UniswapV3.FACTORY_ADDRESS, factoryv3ABI, this.provider);
    }

    async getPoolAddress(fee: number): Promise<string> {
        const { tokenIn, tokenOut } = this.tokenPair;
        const poolAddress = await this.factory.getPool(tokenIn, tokenOut, fee);
        return poolAddress;
    }

    async getSwapResults(inputAmount: number, decimals: { [key: string]: number }): Promise<any[]> {
        const amountInWithDecimals = parseUnits(
            String(inputAmount),
            decimals[this.tokenPair.tokenIn]
        ).toString();

        const baseParams = {
            tokenIn: this.tokenPair.tokenIn,
            tokenOut: this.tokenPair.tokenOut,
            amountIn: amountInWithDecimals,
            sqrtPriceLimitX96: "0"
        };


        const feePromises = UniswapV3.FEE_OPTIONS.map(async fee => {
            const params = { ...baseParams, fee };
            try {
                const amountOut = await this.router.quoteExactInputSingle.staticCall(params);
                return { success: true, amountOut, fee };
            } catch (e) {
                return { success: false };
            }
        });

        const results = await Promise.all(feePromises);
        const filteredResults = results.filter(res => res.success);

        const successfulResultsMapped = await Promise.all(filteredResults.map(async result => {
            const amountOut = Number(result.amountOut[0]) / 10 ** decimals[this.tokenPair.tokenOut];
            const poolAddress = await this.getPoolAddress(Number(result.fee));
            return {
                dex: "Uniswap V3",
                inputAmount,
                pool: poolAddress,
                outputAmount: amountOut,
                price: amountOut / inputAmount,
                fee: Number(result.fee),
            };
        }));

        return successfulResultsMapped;
    }
}
