# :zap:️ Zapper Safe App :zap:️

## Getting Started

Install dependencies and start a local dev server.

```sh
yarn
cp .env.sample .env
yarn start
```

Then:

Then:

- If HTTPS is used (by default enabled)
  - Open your Safe app locally (by default via https://localhost:3000/) and accept the SSL error.
- Go to Safe Multisig web interface
  - [Mainnet](https://app.gnosis-safe.io)
  - [Rinkeby](https://rinkeby.gnosis-safe.io/app)
- Connect your wallet with MetaMask
- Click `Add Safe` and enter `0x9e4728508410cb40ca553c85cb0cb2eea608179a` (the Zapper test safe)
  - Ensure that your connected wallet address is an owner of this safe
- Go to `Apps` -> `Manage Apps` -> `Add Custom App`
- Paste your localhost URL, default is https://localhost:3000/
- You should see `Zapper` as a new app
- Develop your app from there

## Features

The Zapper Safe App is derived from the [Gnosis Safe App Starter Template](https://github.com/gnosis/safe-app-template), which combines recommendations described in the following repositories:

- [Safe Apps SDK](https://github.com/gnosis/safe-apps-sdk)
- [safe-react-components](https://github.com/gnosis/safe-react-components)

You can use the `useSafe` React hook to interact with the Safe Apps SDK

```tsx
const safe = useSafe();
console.log(safe.info);
```

Safe React Components are also integrated and ready to use. [See all components](https://components.gnosis-safe.io/).

## Dependencies

### Included
- [`@gnosis.pm/safe-react-components`](https://github.com/gnosis/safe-react-components) (UI components themed for the Safe Multisig interface)
- [`@rmeissner/safe-apps-react-sdk`](https://github.com/rmeissner/safe-sdks-js/tree/master/safe-apps-react-sdk) (React hook for the Safe Apps SDK)

### Recommended
- [`web3`](https://github.com/ethereum/web3.js/) (Library for interacting with Ethereum)
- [`@studydefi/money-legos`](https://github.com/studydefi/money-legos) (Library for DeFi interactions)
