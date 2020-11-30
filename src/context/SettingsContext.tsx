import React, { useState } from 'react';

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  CNY = 'CNY',
  KRW = 'KRW',
  JPY = 'JPY',
  RUB = 'RUB',
  AUD = 'AUD',
  NZD = 'NZD',
  CHF = 'CHF',
  SGD = 'SGD',
  INR = 'INR',
  ETH = 'ETH',
  BTC = 'BTC',
  LINK = 'LINK',
}

export type CryptoCurrency = Currency.ETH | Currency.LINK | Currency.BTC;

export enum GasMode {
  STANDARD = 'standard',
  FAST = 'fast',
  INSTANCE = 'instant',
}

export enum SettingsActionType {
  SET_CURRENCY = 'SET_CURRENCY',
  SET_GAS_MODE = 'SET_GAS_MODE',
  SET_SLIPPAGE = 'SET_SLIPPAGE',
}

export const SLIPPAGE_OPTIONS = [2, 3];

export type SettingsContextType = {
  currency: Currency;
  gasMode: GasMode;
  slippage: number;
  setCurrency: (currency: Currency) => void;
  setGasMode: (gasMode: GasMode) => void;
  setSlippage: (slippage: number) => void;
};

export const SettingsStateContext = React.createContext<SettingsContextType>({} as any);

export const SettingsProvider: React.FC = ({ children }) => {
  const [currency, setCurrency] = useState(Currency.USD);
  const [gasMode, setGasMode] = useState(GasMode.FAST);
  const [slippage, setSlippage] = useState(3);

  const value = { currency, gasMode, slippage, setCurrency, setGasMode, setSlippage };
  return <SettingsStateContext.Provider value={value}>{children}</SettingsStateContext.Provider>;
};
