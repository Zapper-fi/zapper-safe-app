import React from 'react';

import { Card, Text, Button, Divider } from '@gnosis.pm/safe-react-components';
import { upperFirst } from 'lodash';
import { MdArrowDropDown, MdSwapVert } from 'react-icons/md';

import SettingsDropdown from '../../components/SettingsDropdown';
import { useSettings } from '../../hooks/useSettings';
import { formatBalanceForDisplay } from '../../utils/number';

import { ModalType } from './ExchangeProvider';
import { useExchangeApproval } from './hooks/useExchangeApproval';
import { useExchangePrice } from './hooks/useExchangePrice';
import { useExchangeState } from './hooks/useExchangeState';
import { SelectTokenModal } from './SelectTokenModal';

export const Exchange: React.FC = () => {
  const {
    tokenToBuy,
    tokenToSell,
    amountToSellInputValue,
    setTokenToBuy,
    setTokenToSell,
    setAmountToSell,
    setOpenedModal,
    setAmountToSellInputValue,
  } = useExchangeState();
  const { slippage, gasMode } = useSettings();
  const { isQuotable, isLoading: isLoadingPrice, exchangePrice, error: exchangePriceError } = useExchangePrice();
  const { isApproved, isLoading: isLoadingApproval, approveToken, exchangeToken } = useExchangeApproval(exchangePrice);

  const displayBuyAmount = exchangePrice ? +exchangePrice.buyAmount / 10 ** tokenToBuy!.decimals! : 0;
  const displayBuyAmountWithSlippage = displayBuyAmount * (1 - slippage / 100);
  const formattedBuyAmount = formatBalanceForDisplay(displayBuyAmountWithSlippage);

  const isWrap = tokenToSell?.symbol === 'ETH' && tokenToBuy?.symbol === 'WETH';
  const isUnwrap = tokenToSell?.symbol === 'WETH' && tokenToBuy?.symbol === 'ETH';
  const isEthWeth = isWrap || isUnwrap;
  const exchangeSources = (exchangePrice?.sources ?? []).filter(source => Number(source.proportion) > 0);

  const handleSwitchToAndFromTokens = () => {
    if (tokenToBuy) {
      setAmountToSellInputValue('0');
      setAmountToSell('0');
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
    if (exchangePriceError) {
      return 'Exchange Unavailable';
    }

    if (!isQuotable || isLoadingPrice || isLoadingApproval) {
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
    <div>
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
              <Button
                className="exchange_select_token mr-1"
                size="md"
                color="primary"
                onClick={() => setOpenedModal(ModalType.FROM)}
              >
                <img
                  src={`https://zapper.fi/images/${tokenToSell?.symbol}-icon.png`}
                  alt={`${tokenToSell?.symbol} Icon`}
                />
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
                    setAmountToSellInputValue(`${tokenToSell!.balance!}`);
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
                className={`input ${tokenToSell && +amountToSellInputValue > tokenToSell.balance && 'input--invalid'}`}
                value={amountToSellInputValue}
                onFocus={() => {
                  if (amountToSellInputValue === '0') {
                    setAmountToSellInputValue('');
                  }
                }}
                onBlur={() => {
                  if (amountToSellInputValue === '') {
                    setAmountToSellInputValue('0');
                    setAmountToSell('0');
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const amountToSell = e.target.value;
                  setAmountToSellInputValue(amountToSell);

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
              {exchangePrice && (
                <Text size="lg" color="secondaryHover">
                  {`1 ${tokenToBuy!.symbol} = ${formatBalanceForDisplay(1 / Number(exchangePrice.price))} ${
                    tokenToSell!.symbol
                  }`}
                </Text>
              )}
            </div>
          </div>
          <Divider />
          <div className="py-1">
            <Text size="xl" color="secondaryHover">
              To
            </Text>
          </div>
          <div className="py-1">
            <div className="flex flex-baseline flex-between">
              <Button
                className="exchange_select_token"
                size="md"
                color="primary"
                onClick={() => setOpenedModal(ModalType.TO)}
              >
                {tokenToBuy && (
                  <img
                    src={`https://zapper.fi/images/${tokenToBuy?.symbol}-icon.png`}
                    alt={`${tokenToBuy?.symbol} Icon`}
                  />
                )}
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
          <div className="py-1">
            <Button
              disabled={!isQuotable || isLoadingPrice || !!exchangePriceError}
              className="input--max"
              size="lg"
              color="primary"
              variant="contained"
              onClick={handleExchangeClick}
            >
              {isLoadingPrice && (
                <div className="loading-icon__wrapper">
                  <div className="lds-dual-ring"></div>
                </div>
              )}
              {getExchangeButtonText()}
            </Button>
          </div>
        </Card>
        {exchangePrice && (
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
        {exchangeSources.length > 0 && (
          <div className="exchange_route">
            <div className="exchange_route_title">Exchange Route</div>
            {exchangeSources.map((item, idx) => (
              <div className="exchange_route_item" key={`quote-source-${idx}`}>
                {item.name !== 'MultiHop' && (
                  <img src={`https://zapper.fi/images/${item.symbol}-icon.png`} alt={`${item.symbol} Icon`} />
                )}
                {item.name === 'MultiHop'
                  ? (item.hops || []).map(hop => (
                      <span className="exchange_route_item_hop" key={`exchange-hop-${item.name}-${hop}`}>
                        {hop.symbol && (
                          <img src={`https://zapper.fi/images/${hop.symbol}-icon.png`} alt={`${hop.symbol} Icon`} />
                        )}
                        {hop.displayName}
                      </span>
                    ))
                  : item.displayName}
                {item.proportion !== '1' && (
                  <div className="exchange_route_item_fee">{(Number(item.proportion) * 100).toFixed(2)}%</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <SelectTokenModal />
    </div>
  );
};
