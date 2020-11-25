import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import Axios from 'axios';
import { useQuery } from 'react-query';

export type ExchangeToken = {
  address?: string;
  decimals: number;
  img: string;
  symbol: string;
  balance: number;
  balanceUSD: number;
  balanceRaw: string;
};

// @TODO would this simply be better in the backend as /v1/exchange/tokens?
export const useExchangeTokens = () => {
  const safe = useSafe();
  const { safeAddress } = safe.info;

  const { data: exchangeTokens } = useQuery(['tokens', safeAddress], async () => {
    const { data } = await Axios.get<ExchangeToken[]>(
      // `https://zapper-api-production.herokuapp.com/v1/exchange/tokens`,
      `http://localhost:5000/v1/exchange/tokens`,
      {
        params: { address: safeAddress },
      },
    );
    return data;
  });

  return { exchangeTokens };
};
