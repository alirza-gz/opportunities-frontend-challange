const CRYPTO_DATA = {
  hot: [
    { symbol: "BTC", name: "BTCUSDT", basePrice: 109481.14 },
    { symbol: "ETH", name: "ETHUSDT", basePrice: 2644.09 },
    { symbol: "TON", name: "TONUSDT", basePrice: 2.99 },
    { symbol: "DOGE", name: "DOGEUSDT", basePrice: 0.23 },
    { symbol: "SOL", name: "SOLUSDT", basePrice: 175.13 },
  ],
  new: [
    { symbol: "1000PEPE", name: "1000PEPEUSDT", basePrice: 0.01 },
    { symbol: "DOGS", name: "DOGSUSDT", basePrice: 0.000187 },
    { symbol: "1000SHIB", name: "1000SHIBUSDT", basePrice: 0.01 },
    { symbol: "NOT", name: "NOTUSDT", basePrice: 0.003 },
    { symbol: "CRV", name: "CRVUSDT", basePrice: 0.79 },
  ],
  gainers: [
    { symbol: "SUI", name: "SUIUSDT", basePrice: 3.64 },
    { symbol: "CRV", name: "CRVUSDT", basePrice: 0.79 },
    { symbol: "DYDX", name: "DYDXUSDT", basePrice: 0.62 },
    { symbol: "AAVE", name: "AAVEUSDT", basePrice: 280.81 },
    { symbol: "SOL", name: "SOLUSDT", basePrice: 175.12 },
  ],
};

export function generateMockData(category) {
  return CRYPTO_DATA[category].map((item, index) => ({
    id: `${category}-${item.symbol}-${index}`,
    symbol: item.symbol,
    name: item.name,
    price: item.basePrice * (0.95 + Math.random() * 0.1), // ±5% variation
    change: (Math.random() - 0.5) * 10, // ±5% change
    rank: index + 1,
  }));
}

export function updateMarketData(currentData) {
  const updated = currentData.map((item) => ({
    ...item,
    price: item.price * (0.98 + Math.random() * 0.04), // ±2% price change
    change: item.change + (Math.random() - 0.5) * 2, // Small change adjustment
  }));

  // Randomly shuffle positions to simulate rank changes
  if (Math.random() > 0.7) {
    const shuffled = [...updated];
    const i = Math.floor(Math.random() * shuffled.length);
    const j = Math.floor(Math.random() * shuffled.length);
    if (i !== j) {
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      // Update ranks
      shuffled.forEach((item, index) => {
        item.rank = index + 1;
      });
    }
    return shuffled;
  }

  return updated;
}
