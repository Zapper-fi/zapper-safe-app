import React from 'react';

import { theme } from '@gnosis.pm/safe-react-components';
import { Loader, Title } from '@gnosis.pm/safe-react-components';
import SafeProvider from '@rmeissner/safe-apps-react-sdk';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { ThemeProvider } from 'styled-components';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <IconContext.Provider value={{}}>
        <SafeProvider
          loading={
            <>
              <Title size="md">Waiting for Safe...</Title>
              <Loader size="md" />
            </>
          }
        >
          <App />
        </SafeProvider>
      </IconContext.Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
