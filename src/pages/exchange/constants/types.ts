export type QuoteSourceName =
  | '0x'
  | 'LiquidityProvider'
  | 'Uniswap'
  | 'Uniswap_V2'
  | 'Kyber'
  | 'Curve'
  | 'Balancer'
  | 'Cream'
  | 'Bancor'
  | 'mStable'
  | 'Mooniswap'
  | 'Shell'
  | 'Swerve'
  | 'SnowSwap'
  | 'SushiSwap'
  | 'MultiHop'
  | 'DODO';

export type QuoteSource = {
  name: QuoteSourceName;
  proportion: string;
  intermediateToken?: string;
  hops?: QuoteSourceName[];
};

type QuoteOrder = {
  chainId: number;
  exchangeAddress: string;
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: string;
  takerAssetAmount: string;
  makerFee: string;
  takerFee: string;
  expirationTimeSeconds: string;
  salt: string;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
  signature: string;
};

export type Quote = {
  price: string;
  guaranteedPrice: string;
  to: string;
  data: string;
  value: string;
  gas: string;
  estimatedGas: string;
  gasPrice: string;
  protocolFee: string;
  minimumProtocolFee: string;
  buyTokenAddress: string;
  sellTokenAddress: string;
  buyAmount: string;
  sellAmount: string;
  sources: QuoteSource[];
  orders: QuoteOrder[];
  allowanceTarget: string;
};
