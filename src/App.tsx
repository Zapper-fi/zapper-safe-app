import React from 'react';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { ExchangePage } from './pages/exchange';
import { InvestPage } from './pages/invest';

const App: React.FC = () => {
  return (
    <>
      <Router>
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
      </Router>
    </>
  );
};

export default App;
