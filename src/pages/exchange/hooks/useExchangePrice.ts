import Axios from 'axios';
import { useQuery } from 'react-query';
import { useDebounce } from 'use-debounce';
import Web3 from 'web3';

import { useGasPrices } from '../../../hooks/useGasPrices';
import { useSettings } from '../../../hooks/useSettings';
import { Quote } from '../constants/types';

import { useExchangeState } from './useExchangeState';

export const useExchangePrice = () => {
  const { tokenToSell, tokenToBuy, amountToSell } = useExchangeState();
  const [debouncedAmountToSell] = useDebounce(amountToSell, 200);

  const { gasPrices } = useGasPrices();
  const { gasMode, slippage } = useSettings();
  const gasPrice = +(gasPrices?.[gasMode] ?? 0);

  const areValidTokensSelected = tokenToBuy && tokenToSell && tokenToSell.symbol !== tokenToBuy.symbol;
  const isValidAmountSelected =
    amountToSell === debouncedAmountToSell &&
    +debouncedAmountToSell > 0 &&
    Web3.utils.toBN(debouncedAmountToSell).lte(Web3.utils.toBN(tokenToSell?.balanceRaw || '0'));
  const isValidGasPrice = gasPrice > 0;
  const isQuotable = areValidTokensSelected && isValidAmountSelected && isValidGasPrice;

  const { data: exchangePrice, isLoading, error } = useQuery(
    ['price', tokenToBuy?.symbol, tokenToSell?.symbol, debouncedAmountToSell, slippage, gasPrice.toString()],
    async () => {
      const { data } = await Axios.get<Quote>(`${process.env.REACT_APP_ZAPPER_API}/v1/exchange/price`, {
        params: {
          sellTokenAddress: tokenToSell?.address ?? tokenToSell?.symbol,
          buyTokenAddress: tokenToBuy?.address ?? tokenToBuy?.symbol,
          sellAmount: debouncedAmountToSell,
          slippagePercentage: slippage / 100,
          gasPrice: Web3.utils.toWei(gasPrice.toString(), 'gwei'),
        },
        headers: {
          'x-zapper-api-key': process.env.REACT_APP_ZAPPER_API_KEY,
        },
      });

      return data;
    },
    {
      enabled: isQuotable,
    },
  );

  return { isQuotable, exchangePrice, isLoading, error };
};
