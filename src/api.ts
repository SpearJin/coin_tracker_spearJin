const BASE_URL = 'https://api.coinpaprika.com/v1';

// coins
export async function fetchCoins() {
  return await fetch(`${BASE_URL}/coins`).then((response) => response.json());
}

// CoinList
export async function fetchTickers() {
  return await fetch(`${BASE_URL}/tickers`).then((response) => response.json());
}

// CoinInfo
export async function fetchCoinInfo(coinId?: string) {
  return await fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

// CoinInfo, Price
export async function fetchTickerInfo(coinId?: string) {
  return await fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

// Chart
export function fetchCoinHistory(coinId?: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;
  return fetch(
    `${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
