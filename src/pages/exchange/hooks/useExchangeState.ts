import { useContext } from 'react';

import { ExchangeStateContext } from '../ExchangeProvider';

export const useExchangeState = () => {
  const context = useContext(ExchangeStateContext);
  if (!context) {
    throw new Error('useExchangeState must be used within an ExchangeProvider');
  }
  return context;
};
