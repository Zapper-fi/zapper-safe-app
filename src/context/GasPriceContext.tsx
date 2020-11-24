import React from 'react';

import Axios from 'axios';
import { useQuery } from 'react-query';

export enum GasMode {
  STANDARD = 'standard',
  FAST = 'fast',
  INSTANCE = 'instant',
}

export type GasPriceResponse = {
  standard: number;
  fast: number;
  instant: number;
};

export type GasPriceState = {
  data?: GasPriceResponse;
  isLoading: boolean;
};

export const GasPriceContext = React.createContext<GasPriceState>({ data: undefined, isLoading: true });

export const GasPriceProvider: React.FC = ({ children }) => {
  const { data, isLoading } = useQuery(['gas-prices'], async () => {
    const { data } = await Axios.get<GasPriceResponse>(`https://zapper-api-production.herokuapp.com/v1/gas-price`);
    return data;
  });

  return <GasPriceContext.Provider value={{ data, isLoading }}>{children}</GasPriceContext.Provider>;
};
