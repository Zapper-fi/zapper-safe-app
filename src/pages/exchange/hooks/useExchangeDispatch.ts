import { useContext } from 'react';

import { ExchangeDispatchContext } from '../ExchangeProvider';

export const useExchangeDispatch = () => {
  const context = useContext(ExchangeDispatchContext);
  if (!context) {
    throw new Error('useExchangeDispatch must be used within an ExchangeProvider');
  }
  return context;
};
