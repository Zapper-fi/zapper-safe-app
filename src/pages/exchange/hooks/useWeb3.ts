import { useMemo } from 'react';

import Web3 from 'web3';

export const useWeb3 = () => {
  const web3 = useMemo(() => {
    const provider = 'https://mainnet.infura.io/v3/bf9c8c1758124c208066454d352c84c4';
    return new Web3(provider);
  }, []);

  return { web3 };
};
