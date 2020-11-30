import { useContext } from 'react';

import { ExchangeStateContext } from '../ExchangeProvider';

export const useExchangeState = () => {
  const state = useContext(ExchangeStateContext);
  return state;
};
