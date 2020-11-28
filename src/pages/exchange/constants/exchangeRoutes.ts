import { QuoteSourceName } from './types';

type ExchangeRouteMap = { displayName: string; symbol: string };

export const exchangeRoutes: Record<QuoteSourceName, ExchangeRouteMap> = {
  '0x': {
    displayName: '0x',
    symbol: 'ZRX',
  },
  LiquidityProvider: {
    displayName: 'Private Market Maker',
    symbol: 'ZRX',
  },
  Uniswap: {
    displayName: 'Uniswap V1',
    symbol: 'UNI',
  },
  Uniswap_V2: {
    displayName: 'Uniswap V2',
    symbol: 'UNI',
  },
  Kyber: {
    displayName: 'Kyber',
    symbol: 'KNC',
  },
  Curve: {
    displayName: 'Curve',
    symbol: 'CRV',
  },
  Balancer: {
    displayName: 'Balancer',
    symbol: 'BAL',
  },
  Cream: {
    displayName: 'Cream',
    symbol: 'CREAM',
  },
  Bancor: {
    displayName: 'Bancor',
    symbol: 'BNT',
  },
  mStable: {
    displayName: 'mStable',
    symbol: 'MTA',
  },
  Mooniswap: {
    displayName: 'Mooniswap',
    symbol: 'MOONI',
  },
  Shell: {
    displayName: 'Shell',
    symbol: 'SHL',
  },
  Swerve: {
    displayName: 'Swerve',
    symbol: 'SWRV',
  },
  SnowSwap: {
    displayName: 'SnowSwap',
    symbol: 'SNOW',
  },
  SushiSwap: {
    displayName: 'SushiSwap',
    symbol: 'SUSHI',
  },
  MultiHop: {
    displayName: 'MultiHop',
    symbol: 'MultiHop',
  },
  DODO: {
    displayName: 'Dodo',
    symbol: 'DODO',
  },
};
