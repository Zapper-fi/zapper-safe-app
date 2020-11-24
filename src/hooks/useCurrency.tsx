import { useContext } from 'react';

import {
  CurrencyStateContext,
  CurrencyDispatchContext,
  CurrencyActionType,
  Currency,
} from '../context/CurrencyContext';

export const useCurrency = () => {
  const state = useContext(CurrencyStateContext);
  const dispatch = useContext(CurrencyDispatchContext);

  const setCurrency = (currency: Currency) => {
    dispatch({ type: CurrencyActionType.SET_CURRENCY, payload: currency });
  };

  return { ...state, setCurrency };
};
