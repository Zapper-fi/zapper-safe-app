import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import Axios from 'axios';
import { useQuery } from 'react-query';
import Web3 from 'web3';

import { useGasPrices } from '../../../hooks/useGasPrices';
import { useGnosisSdk } from '../../../hooks/useGnosisSdk';
import { useSettings } from '../../../hooks/useSettings';
import { Quote } from '../constants/types';

import { useExchangeState } from './useExchangeState';

export const useExchangeApproval = (price?: Quote) => {
  const safe = useSafe();
  const { sdk } = useGnosisSdk();
  const { tokenToBuy, tokenToSell, amountToSell } = useExchangeState();
  const { slippage, gasMode } = useSettings();
  const { gasPrices } = useGasPrices();
  const { safeAddress } = safe.info;

  const { data, isLoading } = useQuery(
    ['allowance', tokenToSell?.address],
    async () => {
      const { data } = await Axios.get<any>(`${process.env.REACT_APP_ZAPPER_API}/v1/exchange/allowance`, {
        params: {
          ownerAddress: safeAddress,
          tokenAddress: tokenToSell?.address,
          spenderAddress: price!.allowanceTarget,
        },
        headers: {
          'x-zapper-api-key': process.env.REACT_APP_ZAPPER_API_KEY,
        },
      });

      return data;
    },
    {
      enabled: price && !!tokenToSell && tokenToSell.symbol !== 'ETH',
    },
  );

  const approveToken = async () => {
    if (!tokenToSell) return;
    const approvalTx = data?.approvalTx;
    sdk.sendTransactions([approvalTx]);
    return data;
  };

  const exchangeToken = async () => {
    const { data: transaction } = await Axios.get<Quote>(`${process.env.REACT_APP_ZAPPER_API}/v1/exchange/quote`, {
      params: {
        sellTokenAddress: tokenToSell?.address ?? tokenToSell?.symbol,
        buyTokenAddress: tokenToBuy?.address ?? tokenToBuy?.symbol,
        sellAmount: amountToSell,
        slippagePercentage: slippage / 100,
        gasPrice: Web3.utils.toWei(gasPrices![gasMode].toString(), 'gwei'),
      },
      headers: {
        'x-zapper-api-key': process.env.REACT_APP_ZAPPER_API_KEY,
      },
    });

    if (!transaction.to || !transaction.data) {
      throw new Error('Missing required information to create transaction');
    }

    sdk.sendTransactions([transaction]);
  };

  const isApproved =
    tokenToSell?.symbol === 'ETH' || Web3.utils.toBN(amountToSell).lte(Web3.utils.toBN(data?.allowance ?? '0'));

  return { isApproved, isLoading, approveToken, exchangeToken };
};
