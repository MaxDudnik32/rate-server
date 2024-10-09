## **Description**

This project is a cryptocurrency exchange rate comparison service designed to identify the best exchange rates across multiple platforms. The service supports Binance, KuCoin, and Uniswap (including both Uniswap V2 and V3) for trading ETH, BTC, and USDT. By utilizing the latest trading prices, the API offers two key endpoints:

- `/estimate` to find the most profitable exchange for a given trading pair and amount.
- `/getRates` to retrieve the prices of a specific cryptocurrency pair across all supported exchanges.


## Project setup

```bash
$ npm install
```
Create a .env file in the root directory and add your PROVIDER_URL

```bash
PROVIDER_URL=URL
```

Start the server

```bash
$ npm run start
```

## API Endpoints
### **/estimate**

- **Description**: Determines the best exchange for converting a specified amount of cryptocurrency.
- **Method**: `GET`
- **Parameters**:
  - `inputAmount` (number) — The amount of `inputCurrency` to exchange.
  - `inputCurrency` (string) — The currency to be converted (e.g., "BTC").
  - `outputCurrency` (string) — The target currency to receive (e.g., "USDT").
- **Example Request**:
  ```http
  GET /estimate?inputAmount=0.5&inputCurrency=BTC&outputCurrency=USDT
 - **Example Response**:
   ```json
   {
      "exchangeName": "kucoin",
      "outputAmount": 31123.2,
      "rate": 62246.4
    }
### **/getRates**

- **Description**: Returns the rate of 1 baseCurrency in terms of quoteCurrency for all supported exchanges.
- **Method**: `GET`
- **Parameters**:
  - `baseCurrency` (string) — The base currency (e.g., "BTC").
  - `quoteCurrency` (string) — The quote currency (e.g., "ETH").
- **Example Request**:
  ```http
  GET /getRates?inputCurrency=BTC&outputCurrency=ETH
 - **Example Response**:
   ```json
   [
      {
        "exchangeName": "binance",
        "rate": 25.5623721881391
      },
      {
        "exchangeName": "kucoin",
        "rate": 25.5689082076195
      },
      {
        "exchangeName": "Uniswap V2",
        "pool": "0xBb2b8038a1640196FbE3e38816F3e67Cba72D940",
        "rate": 25.1380840223392
      },
      {
        "exchangeName": "Uniswap V3",
        "pool": "0xe6ff8b9A37B0fab776134636D9981Aa778c4e718",
        "rate": 25.3948032635524
      },
      {
        "exchangeName": "Uniswap V3",
        "pool": "0x4585FE77225b41b697C938B018E2Ac67Ac5a20c0",
        "rate": 25.4771395090129
      },
      {
        "exchangeName": "Uniswap V3",
        "pool": "0xCBCdF9626bC03E24f779434178A73a0B4bad62eD",
        "rate": 25.3431039448235
      },
      {
        "exchangeName": "Uniswap V3",
        "pool": "0x6Ab3bba2F41e7eAA262fa5A1A9b3932fA161526F",
        "rate": 20.2488537271726
      }
    ]