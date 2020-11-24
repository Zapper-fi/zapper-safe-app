import React from 'react';

import { Card, Text, Button, Divider } from '@gnosis.pm/safe-react-components';
import { MdSwapVert } from 'react-icons/md';
import styled from 'styled-components';

import { Page } from '../../components/Page';

import { ExchangeAction, ModalType } from './ExchangeProvider';
import { useExchangeDispatch } from './hooks/useExchangeDispatch';
import { useExchangeState } from './hooks/useExchangeState';
import { SelectTokenModal } from './SelectTokenModal';

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

export const Exchange: React.FC = () => {
  const { tokenToSell, tokenToBuy } = useExchangeState();
  const dispatch = useExchangeDispatch();

  return (
    <Page>
      <div className="exchange">
        <Card className="exchange_card">
          <div className="py-2 flex flex-baseline flex-between">
            <Text size="xl" color="secondaryHover">
              From
            </Text>
            <Text size="lg" color="secondaryHover">
              Balance: 0
            </Text>
          </div>
          <div className="py-2 flex flex-baseline flex-between">
            <TokenSelectButton
              size="md"
              color="primary"
              onClick={() => dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.FROM })}
            >
              <img src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`} />
              <span>{tokenToSell?.symbol}</span>
            </TokenSelectButton>
          </div>
          <Divider />
          <div className="py-2">
            <button className="exchange_swap">
              <div className="icon">
                <div className="flex flex-center">
                  <MdSwapVert size="1.5em" />
                </div>
              </div>
            </button>
          </div>
          <Divider />
          <div className="py-2">
            <div className="py-2 flex flex-baseline flex-between">
              <Text size="xl" color="secondaryHover">
                To
              </Text>
            </div>
          </div>
          <div className="py-2">
            <div className="py-2 flex flex-baseline flex-between">
              <TokenSelectButton
                size="md"
                color="primary"
                onClick={() => dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: ModalType.TO })}
              >
                {tokenToBuy && <img src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`} />}
                <span>{tokenToBuy ? tokenToBuy.symbol : 'Select Token'}</span>
              </TokenSelectButton>
            </div>
          </div>
          <Divider />
          <div className="py-2">
            <Button className="input--max" size="lg" color="primary" variant="contained">
              Exchange
            </Button>
          </div>
        </Card>
      </div>
      <SelectTokenModal />
    </Page>
  );
};
