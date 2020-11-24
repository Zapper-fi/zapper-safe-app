import React from 'react';

import useClickOutside from 'click-outside-hook';
import { IoIosInformationCircleOutline, IoMdSettings, IoMdArrowDropdown } from 'react-icons/io';
import ReactTooltip from 'react-tooltip';

import { GasSelect } from './GasSelect';
import { SlippageInput } from './SlippageInput';

const SettingsDropdown: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = () => {
    setIsDropdownOpen(false);
  };

  const ref = useClickOutside(handleClickOutside);

  return (
    // @ts-ignore
    <div ref={ref} className="dropdown dropdown_settings">
      <div className="dropdown_settings_header" onClick={toggle}>
        <div className="icon">
          <div className="flex flex-center">
            <IoMdSettings size="1.4em" />
          </div>
        </div>
        <div className="icon">
          <div className="flex flex-center">
            <IoMdArrowDropdown size="1.1em" />
          </div>
        </div>
      </div>
      {isDropdownOpen && (
        <div className="dropdown_list">
          <div>
            <div className="dropdown_list_title">
              Slippage Tolerance
              <div
                className="dropdown_list_title_tooltip"
                data-tip="This is maximum percentage you are willing to lose due to unfavorable price changes."
              >
                <div className="icon">
                  <div className="flex flex-center">
                    <IoIosInformationCircleOutline size="1.4em" />
                  </div>
                </div>
              </div>
            </div>
            <SlippageInput />
          </div>
          <div className="dropdown_list_title dropdown_list_title--margin">Select Gas Setting</div>
          <GasSelect />
          <ReactTooltip place="top" />
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
