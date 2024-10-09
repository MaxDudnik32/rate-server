import { Contract, JsonRpcProvider } from "ethers";
import { coinABI } from './ABI';
import { RpcProvider } from './rpcProvider';

const tokenAddresses: { [key: string]: string } = {
    "USDC": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    "ETH": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "BTC": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    "USDT": "0xdac17f958d2ee523a2206206994597c13d831ec7",
};

export class TokenPair {
    public tokenIn: string;
    public tokenOut: string;
    private provider: JsonRpcProvider;
    private tokenInContract: Contract;
    private tokenOutContract: Contract;

    constructor(tokenIn: string, tokenOut: string) {
        if (!tokenAddresses[tokenIn] || !tokenAddresses[tokenOut]) {
            throw new Error("Failed to get token address");
        };
        this.tokenIn = tokenAddresses[tokenIn];
        this.tokenOut = tokenAddresses[tokenOut];
        this.provider = RpcProvider.getInstance() as JsonRpcProvider;
        this.tokenInContract = new Contract(this.tokenIn, coinABI, this.provider);
        this.tokenOutContract = new Contract(this.tokenOut, coinABI, this.provider);
    }

    getTokenIn(): string {
        return this.tokenIn;
    }

    getTokenOut(): string {
        return this.tokenOut;
    }

    async getDecimals(): Promise<{ [key: string]: number } | null> {
        try {
            const [decimalsIn, decimalsOut] = await Promise.all([
                this.tokenInContract.decimals(),
                this.tokenOutContract.decimals()
            ]);

            return {
                [this.tokenIn]: Number(decimalsIn),
                [this.tokenOut]: Number(decimalsOut)
            };
        } catch (error) {
            console.error("Error getting token decimals:", error);
            return null;
        }
    }
}
