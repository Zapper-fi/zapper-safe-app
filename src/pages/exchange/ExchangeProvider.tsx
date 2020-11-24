import React, { Dispatch } from 'react';

export enum ModalType {
  FROM = 'from',
  TO = 'to',
}

export enum ExchangeAction {
  SET_IS_APPROVED = 'SET_IS_APPROVED',
  SET_QUOTE = 'SET_QUOTE',
  SET_OPENED_MODAL = 'SET_MODAL',
  SET_TOKEN_TO_SELL = 'SET_TOKEN_TO_SELL',
  SET_TOKEN_TO_BUY = 'SET_TOKEN_TO_BUY',
  SET_TOKEN_TO_SELL_BALANCE = 'SET_TOKEN_TO_SELL_BALANCE',
  SET_AMOUNT_TO_SELL = 'SET_AMOUNT_TO_SELL',
}

type ExchangeToken = {
  address: string;
  decimals: number;
  symbol: string;
};

type Action =
  // | { type: ExchangeAction.SET_IS_APPROVED; payload: boolean }
  // | { type: ExchangeAction.SET_QUOTE; payload: { quote: Quote | null; error: Error | null } }
  | { type: ExchangeAction.SET_OPENED_MODAL; payload: ModalType | null }
  | { type: ExchangeAction.SET_TOKEN_TO_SELL; payload: ExchangeToken }
  | { type: ExchangeAction.SET_TOKEN_TO_BUY; payload: ExchangeToken | null };
// | { type: ExchangeAction.SET_TOKEN_TO_SELL_BALANCE; payload: string }
// | { type: ExchangeAction.SET_AMOUNT_TO_SELL; payload: string };

type ExchangeState = {
  openedModal: ModalType | null;
  tokenToSell: ExchangeToken | null;
  tokenToBuy: ExchangeToken | null;
};

const initialState: ExchangeState = {
  openedModal: null,
  tokenToSell: {
    address: '0x0000000000000000000000000000000000000000',
    decimals: 18,
    symbol: 'ETH',
  },
  tokenToBuy: null,
};

const reducer = (state: ExchangeState, action: Action): ExchangeState => {
  switch (action.type) {
    case ExchangeAction.SET_OPENED_MODAL:
      return { ...state, openedModal: action.payload };
    case ExchangeAction.SET_TOKEN_TO_SELL:
      return { ...state, tokenToSell: action.payload };
    case ExchangeAction.SET_TOKEN_TO_BUY:
      return { ...state, tokenToBuy: action.payload };
    default: {
      return state;
    }
  }
};

export const ExchangeStateContext = React.createContext<ExchangeState>(null as any);
export const ExchangeDispatchContext = React.createContext<Dispatch<Action>>(null as any);

export const ExchangeProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>{children}</ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
};
