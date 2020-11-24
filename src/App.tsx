import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { CurrencyProvider } from './context/CurrencyContext';
import { ExchangePage } from './pages/exchange';
import { InvestPage } from './pages/invest';

import './styles/app.scss';

const App: React.FC = () => {
  return (
    <div className="theme--light">
      <Router>
        <CurrencyProvider>
          <Header />
          <Navigation />
          <Switch>
            <Route exact path={['/', '/exchange']}>
              <ExchangePage />
            </Route>
            <Route exact path={['/invest']}>
              <InvestPage />
            </Route>
          </Switch>
        </CurrencyProvider>
      </Router>
    </div>
  );
};

export default App;
