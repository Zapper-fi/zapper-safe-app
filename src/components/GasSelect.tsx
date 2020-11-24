import React from 'react';

import { startCase } from 'lodash';

import { GasMode } from '../context/SettingsContext';
import { useGasPrices } from '../hooks/useGasPrices';
import { useSettings } from '../hooks/useSettings';

export const GasSelect: React.FC = () => {
  const { gasMode, setGasMode } = useSettings();
  const { gasPrices } = useGasPrices();

  return (
    <div>
      <div className="formal_group formal_group--btn">
        {Object.values(GasMode).map(gasModeOption => (
          <div
            key={gasModeOption}
            className={`formal_group_item formal_group_item--gas ${
              gasModeOption === gasMode ? 'formal_group_item--active' : ''
            }`}
            onClick={() => setGasMode(gasModeOption as GasMode)}
          >
            <div className="formal_group_item_title">{startCase(gasModeOption)}</div>
            <div className="formal_group_item_subtitle">
              {gasPrices ? `${gasPrices[gasModeOption].toFixed(0)} Gwei)` : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
