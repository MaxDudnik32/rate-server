export const contractABI = [{
    "inputs": [
        {
            "components": [
                {
                    "internalType": "address",
                    "name": "tokenIn",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "tokenOut",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amountIn",
                    "type": "uint256"
                },
                {
                    "internalType": "uint24",
                    "name": "fee",
                    "type": "uint24"
                },
                {
                    "internalType": "uint160",
                    "name": "sqrtPriceLimitX96",
                    "type": "uint160"
                }
            ],
            "internalType": "struct IQuoterV2.QuoteExactInputSingleParams",
            "name": "params",
            "type": "tuple"
        }
    ],
    "name": "quoteExactInputSingle",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "amountOut",
            "type": "uint256"
        },
        {
            "internalType": "uint160",
            "name": "sqrtPriceX96After",
            "type": "uint160"
        },
        {
            "internalType": "uint32",
            "name": "initializedTicksCrossed",
            "type": "uint32"
        },
        {
            "internalType": "uint256",
            "name": "gasEstimate",
            "type": "uint256"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
},
];

export const coinABI = [
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
];

export const factoryv2ABI = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "getPair",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];

export const factoryv3ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint24",
                "name": "",
                "type": "uint24"
            }
        ],
        "name": "getPool",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

export const pairAbi = [
    {
        "constant": true,
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            {
                "internalType": "uint112",
                "name": "_reserve0",
                "type": "uint112"
            },
            {
                "internalType": "uint112",
                "name": "_reserve1",
                "type": "uint112"
            },
            {
                "internalType": "uint32",
                "name": "_blockTimestampLast",
                "type": "uint32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
];

module.exports = { contractABI, coinABI, factoryv2ABI, pairAbi, factoryv3ABI };