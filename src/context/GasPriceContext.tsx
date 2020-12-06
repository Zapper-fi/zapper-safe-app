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
    const { data } = await Axios.get<GasPriceResponse>(`${process.env.REACT_APP_ZAPPER_API}/v1/gas-price`, {
      headers: {
        'x-zapper-api-key': process.env.REACT_APP_ZAPPER_API_KEY,
      },
    });
    return data;
  });

  return <GasPriceContext.Provider value={{ data, isLoading }}>{children}</GasPriceContext.Provider>;
};
