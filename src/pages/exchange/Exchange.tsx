import React from 'react';

import { Card, Text, Button, Divider } from '@gnosis.pm/safe-react-components';
import { Box, Grid } from '@material-ui/core';
import { MdSwapVert } from 'react-icons/md';
import styled from 'styled-components';

import { Page } from '../../components/Page';

import { ExchangeAction, ModalType } from './ExchangeProvider';
import { useExchangeDispatch } from './hooks/useExchangeDispatch';
import { useExchangeState } from './hooks/useExchangeState';
import { SelectTokenModal } from './SelectTokenModal';

const ExchangeCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  padding: 16px;
`;

const SwapButton = styled.button`
  background: #008c73;
  font-family: 'Avenir Next';
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 100%;
  outline: none;
  transition: 0.3s;
  padding: 8px;
  cursor: pointer;
  white-space: nowrap;
  color: #f7f5f5;
  box-shadow: #f7f5f5;

  &:hover {
    box-shadow: yellow;
  }

  .icon {
    color: #f7f5f5;
  }
`;

const TokenSelectButton = styled(Button)`
  display: flex;
  align-items: center;
  padding-left: 4px !important;
  padding-right: 4px !important;

  img {
    height: 24px;
    width: 24px;
    margin-right: 16px;
  }

  span {
    font-size: 16px;
  }
`;

const ExchangeButton = styled(Button)`
  width: 100%;
`;

export const Exchange: React.FC = () => {
  const { tokenToSell, tokenToBuy } = useExchangeState();
  const dispatch = useExchangeDispatch();

  return (
    <Page>
      <ExchangeCard>
        <Box py={1}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Text size="xl" color="secondaryHover">
              From
            </Text>
            <Text size="lg" color="secondaryHover">
              Balance: 0
            </Text>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <TokenSelectButton
              size="md"
              color="primary"
              onClick={() => dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.FROM })}
            >
              <img src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`} />
              <span>{tokenToSell?.symbol}</span>
            </TokenSelectButton>
          </Grid>
        </Box>
        <Divider />
        <Box py={1}>
          <SwapButton>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MdSwapVert size="1.5em" />
            </div>
          </SwapButton>
        </Box>
        <Divider />
        <Box py={1}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <Text size="xl" color="secondaryHover">
              To
            </Text>
          </Grid>
        </Box>
        <Box py={1}>
          <Grid container direction="row" justify="space-between" alignItems="center">
            <TokenSelectButton
              size="md"
              color="primary"
              onClick={() => dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.TO })}
            >
              {tokenToBuy && <img src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`} />}
              <span>{tokenToBuy ? tokenToBuy.symbol : 'Select Token'}</span>
            </TokenSelectButton>
          </Grid>
        </Box>
        <Divider />
        <Box py={1}>
          <ExchangeButton size="lg" color="primary" variant="contained">
            Exchange
          </ExchangeButton>
        </Box>
      </ExchangeCard>
      <SelectTokenModal />
    </Page>
  );
};
