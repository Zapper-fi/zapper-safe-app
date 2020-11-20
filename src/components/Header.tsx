import React from 'react';

import { useSafe } from '@rmeissner/safe-apps-react-sdk';
import styled from 'styled-components';

import { AddressDisplay } from './AddressDisplay';
import { Logo } from './Logo';

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Header: React.FC = () => {
  const safe = useSafe();

  return (
    <HeaderContainer>
      <Logo />
      <AddressDisplay address={safe.info.safeAddress} />
      {/* Currency Picker */}
      {/* Settings */}
    </HeaderContainer>
  );
};
