export type QuoteHop = {
  name: string;
  displayName: string;
  symbol: string;
};

export type QuoteSource = {
  name: string;
  displayName: string;
  symbol: string;
  proportion: string;
  intermediateToken?: string;
  hops?: QuoteHop[];
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
