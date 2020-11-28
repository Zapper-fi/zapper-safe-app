import React from 'react';

import { exchangeRoutes } from './constants/exchangeRoutes';
import { QuoteSource } from './constants/types';

type Props = {
  sources: QuoteSource[];
};

export const ExchangeRoute: React.FC<Props> = ({ sources }) => {
  const filteredSources = (sources ?? []).filter(source => Number(source.proportion) > 0);

  return (
    <div className="exchange_route">
      <div className="exchange_route_title">Exchange Route</div>
      {filteredSources.map((item, idx) => (
        <div className="exchange_route_item" key={`quote-source-${idx}`}>
          {item.name !== 'MultiHop' && (
            <img src={`https://zapper.fi/images/${exchangeRoutes[item.name]?.symbol}-icon.png`} />
          )}
          {item.name === 'MultiHop'
            ? (item.hops || []).map(hop => (
                <span className="exchange_route_item_hop" key={`exchange-hop-${item.name}-${hop}`}>
                  {exchangeRoutes[hop]?.symbol && <img src={`/images/${exchangeRoutes[hop].symbol}-icon.png`} />}
                  {exchangeRoutes[hop]?.displayName ?? hop}
                </span>
              ))
            : exchangeRoutes[item.name]?.displayName}
          {item.proportion !== '1' && (
            <div className="exchange_route_item_fee">{(Number(item.proportion) * 100).toFixed(2)}%</div>
          )}
        </div>
      ))}
    </div>
  );
};
