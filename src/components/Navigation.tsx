import React, { useState } from 'react';

import { Tab } from '@gnosis.pm/safe-react-components';
import { IoMdSwap, IoMdTrendingUp } from 'react-icons/io';
import styled from 'styled-components';

const NavigationItem = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-top: 0 !important;
    margin-right: 8px;
  }
`;

const NAVIGATION_ITEMS = [
  {
    id: 'exchange',
    label: 'Exchange',
    customContent: (
      <NavigationItem>
        <IoMdSwap size="1.25em" />
        Exchange
      </NavigationItem>
    ),
  },
  {
    id: 'invest',
    label: 'Invest',
    customContent: (
      <NavigationItem>
        <IoMdTrendingUp size="1.25em" />
        Invest
      </NavigationItem>
    ),
  },
];

export const Navigation: React.FC = () => {
  const [selected, setSelected] = useState('exchange');

  return (
    <>
      <Tab onChange={setSelected} selectedTab={selected} variant="outlined" items={NAVIGATION_ITEMS} />
      {selected}
    </>
  );
};
