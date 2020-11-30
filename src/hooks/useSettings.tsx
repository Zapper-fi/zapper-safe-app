import { useContext } from 'react';

import { SettingsStateContext } from '../context/SettingsContext';

export const useSettings = () => {
  const state = useContext(SettingsStateContext);
  return state;
};
