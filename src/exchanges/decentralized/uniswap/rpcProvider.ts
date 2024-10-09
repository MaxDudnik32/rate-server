import { JsonRpcProvider } from "ethers";

export class RpcProvider extends JsonRpcProvider {
    private static instance: RpcProvider | null = null;

    private constructor() {
        super(process.env.PROVIDER_URL);
    }

    static getInstance(): RpcProvider {
        if (!RpcProvider.instance) {
            RpcProvider.instance = new RpcProvider();
        }
        return RpcProvider.instance;
    }
}