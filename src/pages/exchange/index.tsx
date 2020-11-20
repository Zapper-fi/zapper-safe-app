import React from 'react';

import { Card, Title } from '@gnosis.pm/safe-react-components';
import styled from 'styled-components';

import { Page } from '../../components/Page';

const ExchangeCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
`;

export const ExchangePage: React.FC = () => {
  return (
    <Page>
      <ExchangeCard>
        <Title size="xs">Some text</Title>
      </ExchangeCard>
    </Page>
  );
};
