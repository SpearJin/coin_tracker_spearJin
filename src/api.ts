const BASE_URL = 'https://api.coinpaprika.com/v1';

export async function fetchCoins() {
  return await fetch(`${BASE_URL}/coins`).then((response) => response.json());
}
