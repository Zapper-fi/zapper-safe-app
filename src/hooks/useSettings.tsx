import { useContext } from 'react';

import {
  Currency,
  GasMode,
  SettingsActionType,
  SettingsDispatchContext,
  SettingsStateContext,
} from '../context/SettingsContext';

export const useSettings = () => {
  const state = useContext(SettingsStateContext);
  const dispatch = useContext(SettingsDispatchContext);

  const setCurrency = (currency: Currency) => {
    dispatch({ type: SettingsActionType.SET_CURRENCY, payload: currency });
  };

  const setGasMode = (gasMode: GasMode) => {
    dispatch({ type: SettingsActionType.SET_GAS_MODE, payload: gasMode });
  };

  const setSlippage = (slippage: number) => {
    dispatch({ type: SettingsActionType.SET_SLIPPAGE, payload: slippage });
  };

  return { ...state, setCurrency, setGasMode, setSlippage };
};
