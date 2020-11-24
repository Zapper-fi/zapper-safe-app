import React, { Dispatch, useReducer } from 'react';

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

export type SettingsAction =
  | { type: SettingsActionType.SET_CURRENCY; payload: Currency }
  | { type: SettingsActionType.SET_GAS_MODE; payload: GasMode }
  | { type: SettingsActionType.SET_SLIPPAGE; payload: number };

export type SettingsState = {
  currency: Currency;
  gasMode: GasMode;
  slippage: number;
};

const initialState: SettingsState = {
  currency: Currency.USD,
  gasMode: GasMode.FAST,
  slippage: 3,
};

export const SettingsStateContext = React.createContext<SettingsState>(initialState);
export const SettingsDispatchContext = React.createContext<Dispatch<SettingsAction>>(() => {});

const reducer = (state: SettingsState = initialState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case SettingsActionType.SET_CURRENCY:
      return { ...state, currency: action.payload };
    case SettingsActionType.SET_GAS_MODE:
      return { ...state, gasMode: action.payload };
    case SettingsActionType.SET_SLIPPAGE:
      return { ...state, slippage: action.payload };
    default: {
      return state;
    }
  }
};

export const SettingsProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <SettingsStateContext.Provider value={state}>
      <SettingsDispatchContext.Provider value={dispatch}>{children}</SettingsDispatchContext.Provider>
    </SettingsStateContext.Provider>
  );
};
