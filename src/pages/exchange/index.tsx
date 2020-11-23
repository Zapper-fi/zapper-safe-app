import React from 'react';

import { Exchange } from './Exchange';
import { ExchangeProvider } from './ExchangeProvider';

export const ExchangePage: React.FC = () => {
  return (
    <ExchangeProvider>
      <Exchange />
    </ExchangeProvider>
  );
};
