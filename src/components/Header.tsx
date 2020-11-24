import React from 'react';

import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import Blockies from 'react-blockies';
import ReactTooltip from 'react-tooltip';

export const Header: React.FC = () => {
  const safe = useSafe();
  const { safeAddress } = safe.info;

  return (
    <div className="header">
      <a href="https://zapper.fi" target="_blank">
        <div className="header_brand">
          <img className="header_brand_logo" src="/logo.svg" alt="Zapper.fi Logo" />
          <span className="header_brand_name">Zapper.fi</span>
        </div>
      </a>
      <div className="identicon">
        <div className="flex">
          <div className="identicon_image">
            <Blockies className="identicon_blockie" seed={safeAddress.toLowerCase()} size={10} scale={3} />
            <div className="identicon_connection" data-tip="Connected" data-place="bottom" />
          </div>
          <div className="identicon_address">
            {safeAddress.toLowerCase().substring(0, 6)}...{safeAddress.toLowerCase().slice(-4)}
          </div>
          <ReactTooltip />
        </div>
      </div>
      {/* Currency Picker */}
      {/* Settings */}
    </div>
  );
};
