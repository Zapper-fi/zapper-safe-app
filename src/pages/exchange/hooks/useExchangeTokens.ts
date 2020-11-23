import { useMemo } from 'react';

import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import Axios from 'axios';
import { sortBy } from 'lodash';
import { useQuery } from 'react-query';

type TokensResponse = {
  balance: number;
  balanceUSD: number;
  canExchange: boolean;
  hide: boolean;
  isStaked: boolean;
  symbol: string;
}[];

type SynthetixResponse = {
  synths: {
    balance: number;
    balanceUSD: number;
    img: string;
    symbol: string;
  }[];
  unlockedSnx: number;
  usdToSnxPrice: number;
};

type BalanceResponse<T> = Record<string, T>;

// @TODO would this simply be better in the backend as /v1/exchange/tokens?
export const useExchangeTokens = () => {
  const safe = useSafe();
  const { safeAddress } = safe.info;

  const { data: tokens } = useQuery(['tokens', safeAddress], () => {
    return Axios.get<BalanceResponse<TokensResponse>>(
      `https://zapper-api-production.herokuapp.com/v1/balances/tokens?addresses[]=${safeAddress}`,
    ).then(({ data }) => data);
  });

  const { data: synthetix } = useQuery(['synthetix', safeAddress], async () => {
    return Axios.get<BalanceResponse<SynthetixResponse>>(
      `https://zapper-api-production.herokuapp.com/v1/balances/synthetix?addresses[]=${safeAddress}`,
    ).then(({ data }) => data);
  });

  const exchangeTokens = useMemo(() => {
    const safeTokens = tokens?.[safeAddress] || [];
    const safeSynthTokens = synthetix?.[safeAddress]?.synths ?? [];
    const safeUnlockedSnx = synthetix?.[safeAddress]?.unlockedSnx ?? 0;
    const safeUsdToSnxPrice = synthetix?.[safeAddress]?.usdToSnxPrice ?? 0;

    const exchangeBasicTokens = safeTokens
      .filter(t => (!t.hide || t.canExchange) && !t.isStaked)
      .map(t => ({
        symbol: t.symbol,
        img: `https://zapper.fi/images/${t.symbol}-icon.png`,
        balance: t.balance,
        balanceUSD: t.balanceUSD,
      }));

    const exchangeSynthTokens = safeSynthTokens
      .map(t => ({
        symbol: t.symbol,
        img: `https://zapper.fi/images/${t.img}`,
        balance: t.balance,
        balanceUSD: t.balanceUSD,
      }))
      .concat({
        symbol: 'SNX',
        img: `https://zapper.fi/images/SNX-icon.png`,
        balance: Number(safeUnlockedSnx),
        balanceUSD: Number(safeUnlockedSnx) * Number(safeUsdToSnxPrice),
      });

    return sortBy([...exchangeBasicTokens, ...exchangeSynthTokens], t => -t.balanceUSD);
  }, [tokens, synthetix]);

  return { exchangeTokens };
};
