import React, { useEffect, useState } from 'react';

import { Card, Text, Button, Divider } from '@gnosis.pm/safe-react-components';
import { upperFirst } from 'lodash';
import { MdArrowDropDown, MdSwapVert } from 'react-icons/md';

import { Page } from '../../components/Page';
import SettingsDropdown from '../../components/SettingsDropdown';
import { useSettings } from '../../hooks/useSettings';
import { formatBalanceForDisplay } from '../../utils/number';

import { ExchangeRoute } from './ExchangeRoute';
import { useExchangeApproval } from './hooks/useExchangeApproval';
import { useExchangePriceQuote } from './hooks/useExchangePriceQuote';
import { useExchangeState } from './hooks/useExchangeState';
import { useExchangeTokens } from './hooks/useExchangeTokens';
import { SelectTokenModal } from './SelectTokenModal';

export const Exchange: React.FC = () => {
  const [inputValue, setInputValue] = useState('0');

  const {
    tokenToBuy,
    tokenToSell,
    setTokenToBuy,
    setTokenToSell,
    setAmountToSell,
    openTokenToBuyModal,
    openTokenToSellModal,
  } = useExchangeState();
  const { exchangeTokens } = useExchangeTokens();
  const { slippage, gasMode } = useSettings();
  const { isQuotable, isLoading: isLoadingQuote, priceQuote, error: quoteError } = useExchangePriceQuote();
  const { isApproved, isLoading: isLoadingApproval, approveToken, exchangeToken } = useExchangeApproval(priceQuote);

  const displayBuyAmount = priceQuote ? (priceQuote.buyAmount / 10 ** tokenToBuy!.decimals!) * (1 - slippage / 100) : 0;
  const formattedBuyAmount = formatBalanceForDisplay(displayBuyAmount);
  const isWrap = tokenToSell?.symbol === 'ETH' && tokenToBuy?.symbol === 'WETH';
  const isUnwrap = tokenToSell?.symbol === 'WETH' && tokenToBuy?.symbol === 'ETH';
  const isEthWeth = isWrap || isUnwrap;

  useEffect(() => {
    if (exchangeTokens) {
      const ethToken = exchangeTokens!.find(t => t.symbol === 'ETH')!;
      setTokenToSell(ethToken);
    }
  }, [exchangeTokens]);

  const handleSwitchToAndFromTokens = () => {
    if (tokenToBuy) {
      setInputValue('0');
      setTokenToSell(tokenToBuy);
      setTokenToBuy(tokenToSell!);
    }
  };

  const handleExchangeClick = () => {
    if (!isApproved) {
      approveToken();
    } else {
      exchangeToken();
    }
  };

  const getExchangeButtonText = () => {
    if (quoteError) {
      return 'Exchange Unavailable';
    }

    if (!isQuotable || isLoadingQuote || isLoadingApproval) {
      return 'Exchange';
    }

    if (!isApproved) {
      return `Approve ${tokenToSell?.symbol}`;
    }

    if (!isEthWeth) {
      return 'Exchange';
    }

    return isWrap ? 'Wrap' : 'Unwrap';
  };

  return (
    <Page>
      <div className="exchange">
        <Card className="exchange_card">
          <div className="py-1 flex flex-baseline flex-between">
            <Text size="xl" color="secondaryHover">
              From
            </Text>
            <Text size="lg" color="secondaryHover">
              Balance: {tokenToSell?.balance}
            </Text>
          </div>
          <div className="py-1 flex flex-center flex-between">
            <div>
              <Button className="exchange_select_token mr-1" size="md" color="primary" onClick={openTokenToSellModal}>
                <img src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`} />
                <span>{tokenToSell?.symbol}</span>
                <div className="icon">
                  <div className="flex flex-center">
                    <MdArrowDropDown size="1.5em" />
                  </div>
                </div>
              </Button>
              {tokenToSell && tokenToSell.balance > 0 && (
                <Button
                  className="exchange_max"
                  size="md"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setInputValue(`${tokenToSell!.balance!}`);
                    setAmountToSell(tokenToSell!.balanceRaw!);
                  }}
                >
                  MAX
                </Button>
              )}
            </div>

            <div className="exchange_card_input">
              <input
                type="number"
                min={0}
                step="any"
                className={`input ${tokenToSell && +inputValue > tokenToSell.balance && 'input--invalid'}`}
                value={inputValue}
                onFocus={() => {
                  if (inputValue === '0') {
                    setInputValue('');
                  }
                }}
                onBlur={() => {
                  if (inputValue === '') {
                    setInputValue('0');
                    setAmountToSell('0');
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const amountToSell = e.target.value;
                  setInputValue(amountToSell);

                  const rawAmountToSell = `${+amountToSell * 10 ** tokenToSell!.decimals!}`;
                  setAmountToSell(rawAmountToSell);
                }}
              />
            </div>
          </div>
          <Divider />
          <div className="py-1">
            <div className="flex flex-center flex-between">
              <button className="exchange_swap" onClick={handleSwitchToAndFromTokens}>
                <div className="icon">
                  <div className="flex flex-center">
                    <MdSwapVert size="1.5em" />
                  </div>
                </div>
              </button>
              {priceQuote && (
                <Text size="lg" color="secondaryHover">
                  {`1 ${tokenToBuy!.symbol} = ${formatBalanceForDisplay(1 / Number(priceQuote.price))} ${
                    tokenToSell!.symbol
                  }`}
                </Text>
              )}
            </div>
          </div>
          <Divider />
          <div className="py-1">
            <div className="py-2 flex flex-baseline flex-between">
              <Text size="xl" color="secondaryHover">
                To
              </Text>
            </div>
          </div>
          <div className="py-1">
            <div className="py-2 flex flex-baseline flex-between">
              <Button className="exchange_select_token" size="md" color="primary" onClick={openTokenToBuyModal}>
                {tokenToBuy && <img src={`https://zapper.fi/images/${tokenToBuy?.symbol}-icon.png`} />}
                <span>{tokenToBuy ? tokenToBuy.symbol : 'Select Token'}</span>
                <div className="icon">
                  <div className="flex flex-center">
                    <MdArrowDropDown size="1.5em" />
                  </div>
                </div>
              </Button>
              <div className="exchange_card_input">
                <input className="input" step="any" disabled={true} value={formattedBuyAmount} />
              </div>
            </div>
          </div>
          <Divider />
          <div className="py-2">
            <Button
              disabled={!isQuotable || isLoadingQuote || !!quoteError}
              className="input--max"
              size="lg"
              color="primary"
              variant="contained"
              onClick={handleExchangeClick}
            >
              {isLoadingQuote && (
                <div className="loading-icon__wrapper">
                  <div className="lds-dual-ring"></div>
                </div>
              )}
              {getExchangeButtonText()}
            </Button>
          </div>
        </Card>
        {priceQuote && (
          <div className="exchange_route">
            <div className="exchange_transaction-settings">
              <div className="exchange_transaction-settings_title">Transaction Settings</div>
              <SettingsDropdown />
            </div>
            {!isEthWeth && (
              <div className="exchange_route_stat">
                <div className="exchange_route_stat--left">Slippage</div>
                <div className="exchange_route_stat--right">{Number(slippage).toFixed(2)}%</div>
              </div>
            )}
            {!isEthWeth && (
              <div className="exchange_route_stat">
                <div className="exchange_route_stat--left">Minimum Received</div>
                <div className="exchange_route_stat--right">{formattedBuyAmount}</div>
              </div>
            )}
            <div className="exchange_route_stat">
              <div className="exchange_route_stat--left">Transaction Speed</div>
              <div className="exchange_route_stat--right">{upperFirst(gasMode)}</div>
            </div>
          </div>
        )}
        {isApproved ? 'APPROVED!' : 'NAH!'}
        {priceQuote && priceQuote.sources.length > 0 && <ExchangeRoute sources={priceQuote.sources} />}
      </div>
      <SelectTokenModal />
    </Page>
  );
};
