import { useEffect, useState } from 'react';

import Axios from 'axios';
import useDebouncedEffect from 'use-debounced-effect-hook';
import Web3 from 'web3';

import { useGasPrices } from '../../../hooks/useGasPrices';
import { useSettings } from '../../../hooks/useSettings';

import { useExchangeState } from './useExchangeState';

export const useExchangePriceQuote = () => {
  const [priceQuote, setPriceQuote] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { tokenToSell, tokenToBuy, amountToSell } = useExchangeState();
  const { gasPrices } = useGasPrices();
  const { gasMode, slippage } = useSettings();
  const gasPrice = +(gasPrices?.[gasMode] ?? 0);

  const areValidTokensSelected = tokenToBuy && tokenToSell && tokenToSell.symbol !== tokenToBuy.symbol;
  const isValidAmountSelected =
    +amountToSell > 0 && Web3.utils.toBN(amountToSell).lte(Web3.utils.toBN(tokenToSell?.balanceRaw || '0'));
  const isValidGasPrice = gasPrice > 0;
  const isQuotable = areValidTokensSelected && isValidAmountSelected && isValidGasPrice;

  useEffect(() => {
    if (isQuotable) {
      setIsLoading(true);
    }
  }, [isQuotable]);

  useDebouncedEffect(
    () => {
      if (!isQuotable) {
        setPriceQuote(null);
        setIsLoading(false);
        setError(null);
      } else {
        setIsLoading(true);
        Axios.get<any>('http://localhost:5000/v1/exchange/price', {
          params: {
            sellTokenAddress: tokenToSell?.address ?? tokenToSell?.symbol,
            buyTokenAddress: tokenToBuy?.address ?? tokenToBuy?.symbol,
            sellAmount: amountToSell,
            slippagePercentage: slippage / 100,
            gasPrice: Web3.utils.toWei(gasPrice.toString(), 'gwei'),
          },
        })
          .then(({ data }) => {
            // eslint-disable-next-line no-console
            console.log(data);
            setPriceQuote(data);
          })
          .catch(err => {
            setError(err);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    },
    [isQuotable, tokenToSell, tokenToBuy, amountToSell, slippage, gasPrice],
    200,
  );

  return { isQuotable, priceQuote, isLoading, error };
};
