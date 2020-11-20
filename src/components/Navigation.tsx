import React, { useCallback } from 'react';

import { Tab } from '@gnosis.pm/safe-react-components';
import { Item } from '@gnosis.pm/safe-react-components/dist/navigation/Tab';
import { IoMdSwap, IoMdTrendingUp } from 'react-icons/io';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavigationItem = styled.div`
  display: flex;
  align-items: center;

  > svg {
    margin-top: 0 !important;
    margin-right: 8px;
  }
`;

const NAVIGATION_ITEMS: Item[] = [
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
    disabled: true,
    customContent: (
      <NavigationItem>
        <IoMdTrendingUp size="1.25em" />
        Invest
      </NavigationItem>
    ),
  },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  const selected = location.pathname.replace('/', '') || 'exchange';
  const setSelected = useCallback(
    selected => {
      history.push(`/${selected}`);
    },
    [history],
  );

  return (
    <React.Fragment>
      <Tab onChange={setSelected} selectedTab={selected} variant="outlined" items={NAVIGATION_ITEMS} />
    </React.Fragment>
  );
};
