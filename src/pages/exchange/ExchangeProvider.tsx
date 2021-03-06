import React, { useEffect, useState } from 'react';

import { ExchangeToken, useExchangeTokens } from './hooks/useExchangeTokens';

export enum ModalType {
  FROM = 'from',
  TO = 'to',
}

type ExchangeContextType = {
  openedModal: ModalType | null;
  tokenToSell: ExchangeToken | null;
  tokenToBuy: ExchangeToken | null;
  amountToSell: string;
  amountToSellInputValue: string;
  setOpenedModal: (openedModal: ModalType | null) => void;
  setTokenToSell: (tokenToSell: ExchangeToken) => void;
  setTokenToBuy: (tokenToBuy: ExchangeToken) => void;
  setAmountToSell: (amountToSell: string) => void;
  setAmountToSellInputValue: (amountToSell: string) => void;
};

export const ExchangeStateContext = React.createContext<ExchangeContextType>({} as any);

export const ExchangeProvider: React.FC = ({ children }) => {
  const { exchangeTokens } = useExchangeTokens();
  const [openedModal, setOpenedModal] = useState<ModalType | null>(null);
  const [tokenToSell, setTokenToSell] = useState<ExchangeToken | null>({
    address: '0x0000000000000000000000000000000000000000',
    balance: 0,
    balanceRaw: '0',
    balanceUSD: 0,
    decimals: 18,
    img: 'https://zapper.fi/images/ETH-icon.png',
    symbol: 'ETH',
  });
  const [tokenToBuy, setTokenToBuy] = useState<ExchangeToken | null>(null);
  const [amountToSell, setAmountToSell] = useState('0');
  const [amountToSellInputValue, setAmountToSellInputValue] = useState('0');

  // Update token to sell and token to buy balances
  useEffect(() => {
    if (exchangeTokens && tokenToSell) {
      const updatedTokenToSell = exchangeTokens.find(t => t.symbol === tokenToSell.symbol)!;
      if (updatedTokenToSell?.balance !== tokenToSell.balance) {
        setTokenToSell(updatedTokenToSell);
      }
    }

    if (exchangeTokens && tokenToBuy) {
      const updatedTokenToBuy = exchangeTokens.find(t => t.symbol === tokenToBuy?.symbol)!;
      if (updatedTokenToBuy?.balance !== tokenToBuy?.balance) {
        setTokenToBuy(updatedTokenToBuy);
      }
    }
  }, [exchangeTokens, tokenToBuy, tokenToSell]);

  const value = {
    openedModal,
    tokenToSell,
    tokenToBuy,
    amountToSell,
    amountToSellInputValue,
    setOpenedModal,
    setTokenToSell,
    setTokenToBuy,
    setAmountToSell,
    setAmountToSellInputValue,
  };

  return <ExchangeStateContext.Provider value={value}>{children}</ExchangeStateContext.Provider>;
};
