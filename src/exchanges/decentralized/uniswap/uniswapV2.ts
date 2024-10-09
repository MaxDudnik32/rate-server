import { ethers, Contract } from "ethers";
import { UniswapBase } from './uniswapBase';
import { TokenPair } from './tokenPair';
import { factoryv2ABI, pairAbi } from './ABI';

export class UniswapV2 extends UniswapBase {
    static FACTORY_ADDRESS = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f";
    private factory: Contract;

    constructor(tokenPair: TokenPair) {
        super(tokenPair);
        this.factory = new Contract(UniswapV2.FACTORY_ADDRESS, factoryv2ABI, this.provider);
    }

    calculateTokensReceived(reserveOut: number, reserveIn: number, inputAmount: number): number {
        const updatedReserveIn = reserveIn + inputAmount;
        const totalReserve = reserveOut * reserveIn;
        const updatedReserveOut = totalReserve / updatedReserveIn;
        return reserveOut - updatedReserveOut;
    }

    async getSwapResults(inputAmount: number, decimals: { [key: string]: number }): Promise<any[]> {
        try {
            const pairAddress = await this.factory.getPair(this.tokenPair.getTokenIn(), this.tokenPair.getTokenOut());

            if (pairAddress === ethers.ZeroAddress) {
                return [];
            }

            const pairContract = new Contract(pairAddress, pairAbi, this.provider);
            const reserves = await pairContract.getReserves();

            const isToken0 = this.tokenPair.getTokenIn().toLowerCase() < this.tokenPair.getTokenOut().toLowerCase();
            const reserve0 = Number(reserves[0]);
            const reserve1 = Number(reserves[1]);

            const reserveIn = isToken0
                ? reserve0 / 10 ** decimals[this.tokenPair.getTokenIn()]
                : reserve1 / 10 ** decimals[this.tokenPair.getTokenIn()];
            const reserveOut = isToken0
                ? reserve1 / 10 ** decimals[this.tokenPair.getTokenOut()]
                : reserve0 / 10 ** decimals[this.tokenPair.getTokenOut()];

            const tokensReceived = this.calculateTokensReceived(reserveOut, reserveIn, Number(inputAmount));
            const price = tokensReceived / inputAmount;

            return [{
                dex: "Uniswap V2",
                pool: pairAddress,
                inputAmount,
                outputAmount: tokensReceived,
                price,
                fee: Number(3000),
            }];
        } catch (error) {
            console.error("Error getting swap results:", error);
            return [];
        }
    }
}
