import { useState } from 'react';

import initSdk from '@gnosis.pm/safe-apps-sdk';

export const useGnosisSdk = () => {
  const [sdk] = useState(() => {
    const appsSdk = initSdk();
    return appsSdk;
  });

  return { sdk };
};
