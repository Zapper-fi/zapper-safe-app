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

export enum CurrencyActionType {
  SET_CURRENCY = 'SET_CURRENCY',
}

export type CurrencyAction = { type: CurrencyActionType.SET_CURRENCY; payload: Currency };

export type CurrencyState = {
  currency: Currency;
};

const initialState: CurrencyState = {
  currency: Currency.USD,
};

export const CurrencyStateContext = React.createContext<CurrencyState>(initialState);
export const CurrencyDispatchContext = React.createContext<Dispatch<CurrencyAction>>(() => {});

const reducer = (state: CurrencyState = initialState, action: CurrencyAction): CurrencyState => {
  switch (action.type) {
    case CurrencyActionType.SET_CURRENCY:
      return { ...state, currency: action.payload };
    default: {
      return state;
    }
  }
};

export const CurrencyProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CurrencyStateContext.Provider value={state}>
      <CurrencyDispatchContext.Provider value={dispatch}>{children}</CurrencyDispatchContext.Provider>
    </CurrencyStateContext.Provider>
  );
};
