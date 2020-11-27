import { useContext } from 'react';

import { ExchangeAction, ExchangeDispatchContext, ExchangeStateContext, ModalType } from '../ExchangeProvider';

import { ExchangeToken } from './useExchangeTokens';

export const useExchangeState = () => {
  const dispatch = useContext(ExchangeDispatchContext);
  const context = useContext(ExchangeStateContext);

  if (!context) {
    throw new Error('useExchangeState must be used within an ExchangeProvider');
  }

  const setTokenToSell = (token: ExchangeToken) => {
    dispatch({ type: ExchangeAction.SET_TOKEN_TO_SELL, payload: token });
  };

  const setTokenToBuy = (token: ExchangeToken) => {
    dispatch({ type: ExchangeAction.SET_TOKEN_TO_BUY, payload: token });
  };

  const setAmountToSell = (amountToSell: string) => {
    dispatch({ type: ExchangeAction.SET_AMOUNT_TO_SELL, payload: amountToSell });
  };

  const openTokenToSellModal = () => {
    dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.FROM });
  };

  const openTokenToBuyModal = () => {
    dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.TO });
  };

  const closeModal = () => {
    dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: null });
  };

  return {
    ...context,
    setTokenToBuy,
    setTokenToSell,
    setAmountToSell,
    openTokenToSellModal,
    openTokenToBuyModal,
    closeModal,
  };
};
