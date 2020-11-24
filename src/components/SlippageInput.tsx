import React, { useState } from 'react';

import { IoIosWarning } from 'react-icons/io';

import { SLIPPAGE_OPTIONS } from '../context/SettingsContext';
import { useSettings } from '../hooks/useSettings';

export const SlippageInput = () => {
  const { slippage, setSlippage } = useSettings();
  const [slippageInputValue, setSlippageInputValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let checkIfNum;

    if (event.key !== undefined) {
      checkIfNum = event.key === 'event' || event.key === '+' || event.key === '-';
    } else if (event.keyCode !== undefined) {
      checkIfNum = event.keyCode === 69 || event.keyCode === 187 || event.keyCode === 189;
    }

    return checkIfNum && event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSlippage = +event.target.value;
    setSlippageInputValue(event.target.value);
    setSlippage(newSlippage);
  };

  const highSlippageWarning = Boolean(slippage > 5 && slippageInputValue !== '');
  const lowSlippageWarning = Boolean(slippage < 1 && slippageInputValue !== '');

  return (
    <div>
      <div className="formal_group formal_group--btn">
        {SLIPPAGE_OPTIONS.map(option => (
          <div
            key={option}
            className={`formal_group_item ${slippage === option ? 'formal_group_item--active' : ''}`}
            onClick={() => setSlippage(option)}
          >
            <div className="formal_group_item_title">{option}%</div>
          </div>
        ))}
        <div className="formal_input_withButton formal_group_item">
          <input
            type="number"
            min={0}
            step="any"
            className={`input input_slippage ${!SLIPPAGE_OPTIONS.includes(slippage) ? 'input--active' : ''}`}
            onKeyDown={handleKeyDown}
            value={slippageInputValue}
            placeholder={`${slippage}`}
            onChange={handleChange}
          />
          <div className="formal_input_withButton--max">%</div>
        </div>
      </div>
      {highSlippageWarning && (
        <div className="dropdown_warning">
          <div className="icon">
            <div className="flex flex-center">
              <IoIosWarning size="1.4em" />
            </div>
          </div>
          <div className="dropdown_warning_text">We hope you know what you're doing</div>
        </div>
      )}
      {lowSlippageWarning && (
        <div className="dropdown_warning">
          <div className="icon">
            <div className="flex flex-center">
              <IoIosWarning size="1.4em" />
            </div>
          </div>
          <div className="dropdown_warning_text">Transaction may fail</div>
        </div>
      )}
    </div>
  );
};
