import { useContext } from 'react';

import { GasPriceContext } from '../context/GasPriceContext';

export const useGasPrices = () => {
  const { data, isLoading } = useContext(GasPriceContext);
  return { gasPrices: data, isLoading };
};
