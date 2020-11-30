import { useEffect, useState } from 'react';

import { Currency } from '../../../context/SettingsContext';

export type ExchangeRate = {
  symbol: Currency;
  rate: number;
};

export const useExchangeRate = (symbol: Currency): ExchangeRate => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if ([Currency.ETH, Currency.BTC, Currency.LINK].includes(symbol)) {
      const id = symbol === 'BTC' ? 'bitcoin' : symbol === 'ETH' ? 'ethereum' : 'chainlink';
      fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`)
        .then(response => response.json())
        .then(data => setRate(1 / data[id].usd));
    } else {
      fetch('https://api.exchangeratesapi.io/latest?base=USD')
        .then(response => response.json())
        .then(data => setRate(data.rates[symbol]));
    }
  }, [symbol]);

  return { symbol, rate };
};
