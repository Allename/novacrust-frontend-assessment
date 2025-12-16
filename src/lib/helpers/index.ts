export function numberWithCommas(n: number | string) {
  const num = Number(parseFloat(n.toString()).toFixed(2)).toLocaleString("en", {
    minimumFractionDigits: 2,
  });

  return num;
}

export const tokenUsdRates: Record<string, number> = {
  eth: 3800,
  celo: 1, // USDT on CELO
  ton: 1, // USDT on TON
  bnb: 1, // USDT on BNB
};

export const fiatUsdToRate: Record<string, number> = {
  ngn: 1650,
};
