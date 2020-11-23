import React, { useMemo, useState } from 'react';

import { GenericModal, Table, TableAlignment, TableSortDirection } from '@gnosis.pm/safe-react-components';
import { sortBy } from 'lodash';
import styled from 'styled-components';

import { ExchangeAction } from './ExchangeProvider';
import { useExchangeDispatch } from './hooks/useExchangeDispatch';
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
          content: <div>{token.balance || ''}</div>,
          alignment: TableAlignment.right,
        },
        {
          content: <div>{token.balanceUSD || ''}</div>,
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
          //selectedRowIds={selectedRowIds}
          sortedByHeaderId={sortedByHeaderId}
          sortDirection={sortedByDirection}
          onHeaderClick={onHeaderClick}
        />
      }
    />
  );
};
