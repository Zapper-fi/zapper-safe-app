import React, { useMemo, useState } from 'react';

import { GenericModal, Table, TableAlignment, TableSortDirection } from '@gnosis.pm/safe-react-components';
import { sortBy } from 'lodash';
import styled from 'styled-components';

import { formatBalanceForDisplay, formatDollarForDisplay } from '../../utils/number';

import { ExchangeAction, ModalType } from './ExchangeProvider';
import { useExchangeDispatch } from './hooks/useExchangeDispatch';
import { Currency, useExchangeRate } from './hooks/useExchangeRate';
import { useExchangeState } from './hooks/useExchangeState';
import { useExchangeTokens } from './hooks/useExchangeTokens';

enum TableHeader {
  ASSET = 'asset',
  BALANCE = 'balance',
  VALUE = 'value',
}

const TokenSymbolContainer = styled.div`
  display: flex;
  align-items: center;
`;

const TokenImage = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 16px;
`;

export const SelectTokenModal = () => {
  const dispatch = useExchangeDispatch();
  const { exchangeTokens } = useExchangeTokens();
  const { openedModal } = useExchangeState();
  const { symbol, rate } = useExchangeRate(Currency.USD);

  const [sortedByHeaderId, setSortedByHeaderId] = useState(TableHeader.BALANCE);
  const [sortedByDirection, setSortedByDirection] = useState(TableSortDirection.desc);

  const headers = useMemo(
    () => [
      {
        id: TableHeader.ASSET,
        label: 'Asset',
      },
      {
        id: TableHeader.BALANCE,
        alignment: TableAlignment.right,
        label: 'Balance',
      },
      {
        id: TableHeader.VALUE,
        alignment: TableAlignment.right,
        label: 'Value',
      },
    ],
    [],
  );

  const rows = useMemo(() => {
    const sortedTokens = sortBy(exchangeTokens, t => {
      const multiplier = sortedByDirection === TableSortDirection.asc ? 1 : -1;
      if (sortedByHeaderId === TableHeader.ASSET) {
        return multiplier * Number(t.symbol);
      } else if (sortedByHeaderId === TableHeader.BALANCE) {
        return multiplier * t.balance;
      } else {
        return multiplier * t.balanceUSD;
      }
    });

    return sortedTokens.map(token => ({
      id: token.symbol,
      cells: [
        {
          content: (
            <TokenSymbolContainer>
              <TokenImage src={token.img} />
              <div>{token.symbol}</div>
            </TokenSymbolContainer>
          ),
        },
        {
          content: <div>{formatBalanceForDisplay(token.balance)}</div>,
          alignment: TableAlignment.right,
        },
        {
          content: <div>{formatDollarForDisplay(token.balanceUSD, { symbol, rate })}</div>,
          alignment: TableAlignment.right,
        },
      ],
    }));
  }, [exchangeTokens, sortedByHeaderId, sortedByDirection]);

  const onHeaderClick = (headerId: string) => {
    const defaultSortDirection: Record<TableHeader, TableSortDirection> = {
      [TableHeader.ASSET]: TableSortDirection.asc,
      [TableHeader.BALANCE]: TableSortDirection.desc,
      [TableHeader.VALUE]: TableSortDirection.desc,
    };

    const newSortDirection =
      sortedByHeaderId !== headerId
        ? defaultSortDirection[headerId as TableHeader]
        : sortedByDirection === TableSortDirection.asc
        ? TableSortDirection.desc
        : TableSortDirection.asc;

    setSortedByHeaderId(headerId as TableHeader);
    setSortedByDirection(newSortDirection);
  };

  const onRowClick = (rowId: string) => {
    const token = exchangeTokens!.find(t => t.symbol === rowId)!;
    const action = openedModal === ModalType.FROM ? ExchangeAction.SET_TOKEN_TO_SELL : ExchangeAction.SET_TOKEN_TO_BUY;

    // @ts-ignore
    dispatch({ type: action, payload: token });
    dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: null });
  };

  if (!openedModal) {
    return null;
  }

  return (
    <GenericModal
      onClose={() => dispatch({ type: ExchangeAction.SET_OPENED_MODAL, payload: null })}
      title="Select a token"
      body={
        <Table
          headers={headers}
          rows={rows}
          sortedByHeaderId={sortedByHeaderId}
          sortDirection={sortedByDirection}
          onHeaderClick={onHeaderClick}
          onRowClick={onRowClick}
        />
      }
    />
  );
};
