import React from 'react';
import { useState } from 'react';

import useClickOutside from 'click-outside-hook';
import { chunk } from 'lodash';
import { IoMdArrowDropdown } from 'react-icons/io';

import { Currency } from '../context/CurrencyContext';
import { useCurrency } from '../hooks/useCurrency';

const CurrencyDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { currency, setCurrency } = useCurrency();

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  const toggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const ref = useClickOutside(handleClickOutside);

  return (
    // @ts-ignore
    <div ref={ref} className="dropdown dropdown_currency" onClick={toggle}>
      <div className="dropdown_currency_header">
        <img className="currency_icon" src={`https://zapper.fi/images/${currency}.svg`} alt={`${currency} Icon`} />
        {currency}
        <div className="icon">
          <div className="flex flex-center">
            <IoMdArrowDropdown size="1.1em" />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="dropdown_list">
          <div className="row dropdown_list_row">
            {chunk(Object.keys(Currency), 4).map(chunk => (
              <div className="column">
                {chunk.map(currency => (
                  <div className="dropdown_list_item" onClick={() => setCurrency(currency as Currency)}>
                    <img
                      className="currency_icon"
                      src={`https://zapper.fi/images/${currency}.svg`}
                      alt={`${currency} Icon`}
                    />
                    {currency}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyDropdown;
