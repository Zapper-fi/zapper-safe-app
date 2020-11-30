import { CryptoCurrency, Currency } from '../context/SettingsContext';

export const formatBalanceForDisplay = (balance: number): string => {
  let formattedBalance = balance.toString();

  if (balance === 0) {
    return '';
  }

  if (balance >= 1) {
    formattedBalance = Number(balance.toFixed(6)).toString();
  } else {
    const withoutTrailingZeros = balance.toFixed(20).replace(/0+$/, '');
    const decimals = withoutTrailingZeros.split('.')[1];
    if (decimals.length > 6) {
      formattedBalance = `${balance.toFixed(6)}...`;
    } else {
      formattedBalance = Number(balance.toFixed(6)).toString();
    }
  }

  return formattedBalance;
};

export const formatDollarForDisplay = (num: number, base: { symbol: Currency; rate: number }, decimals = 2) => {
  const symbol: Currency = base ? base.symbol : Currency.USD;
  const rate = base ? base.rate : 1;

  const isCrypto = [Currency.ETH, Currency.LINK, Currency.BTC].includes(symbol);
  const decimalCount = isCrypto ? 4 : decimals;

  const cryptoSymbol: Record<CryptoCurrency, string> = {
    LINK: '⬡',
    ETH: 'Ξ',
    BTC: '₿',
  };

  if (isNaN(num) || num === 0) {
    return '';
  } else if (isCrypto) {
    return `${cryptoSymbol[symbol as CryptoCurrency]} ${Number(num * rate).toFixed(decimalCount)}`;
  } else {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: symbol,
      minimumFractionDigits: decimalCount,
    });

    const value = Number(num * rate);
    return formatter.format(Number(value.toFixed(decimalCount)));
  }
};
