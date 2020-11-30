import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { GasPriceProvider } from './context/GasPriceContext';
import { SettingsProvider } from './context/SettingsContext';
import { ExchangePage } from './pages/exchange';

import './styles/app.scss';

const App: React.FC = () => {
  return (
    <div className="theme--light">
      <Router>
        <SettingsProvider>
          <GasPriceProvider>
            <Header />
            <Switch>
              <Route exact path={['/', '/exchange']}>
                <ExchangePage />
              </Route>
            </Switch>
          </GasPriceProvider>
        </SettingsProvider>
      </Router>
    </div>
  );
};

export default App;
