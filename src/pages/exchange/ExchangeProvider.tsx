import React, { useState } from 'react';

import { ExchangeToken } from './hooks/useExchangeTokens';

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
  const [openedModal, setOpenedModal] = useState<ModalType | null>(null);
  const [tokenToSell, setTokenToSell] = useState<ExchangeToken>({
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
