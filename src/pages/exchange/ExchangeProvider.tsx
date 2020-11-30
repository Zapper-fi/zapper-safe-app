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
  setOpenedModal: (openedModal: ModalType | null) => void;
  setTokenToSell: (tokenToSell: ExchangeToken) => void;
  setTokenToBuy: (tokenToBuy: ExchangeToken) => void;
  setAmountToSell: (amountToSell: string) => void;
};

export const ExchangeStateContext = React.createContext<ExchangeContextType>({} as any);

export const ExchangeProvider: React.FC = ({ children }) => {
  const { exchangeTokens } = useExchangeTokens();
  const [openedModal, setOpenedModal] = useState<ModalType | null>(null);
  const [tokenToSell, setTokenToSell] = useState<ExchangeToken | null>(null);
  const [tokenToBuy, setTokenToBuy] = useState<ExchangeToken | null>(null);
  const [amountToSell, setAmountToSell] = useState('0');

  // Update token to sell and token to buy balances
  useEffect(() => {
    if (exchangeTokens && !tokenToSell) {
      const updatedTokenToSell = exchangeTokens.find(t => t.symbol === 'ETH')!;
      setTokenToSell(updatedTokenToSell);
    }

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
  }, [exchangeTokens]);

  const value = {
    openedModal,
    tokenToSell,
    tokenToBuy,
    amountToSell,
    setOpenedModal,
    setTokenToSell,
    setTokenToBuy,
    setAmountToSell,
  };

  return <ExchangeStateContext.Provider value={value}>{children}</ExchangeStateContext.Provider>;
};
