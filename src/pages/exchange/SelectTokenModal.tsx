import React, { useMemo, useState } from 'react';

import {
  GenericModal,
  Table,
  TableAlignment,
  TableSortDirection,
  TextField,
  Icon,
} from '@gnosis.pm/safe-react-components';
import { sortBy } from 'lodash';
import styled from 'styled-components';

import { formatBalanceForDisplay, formatDollarForDisplay } from '../../utils/number';

import { ModalType } from './ExchangeProvider';
import { Currency, useExchangeRate } from './hooks/useExchangeRate';
import { useExchangeState } from './hooks/useExchangeState';
import { useExchangeTokens } from './hooks/useExchangeTokens';

enum TableHeader {
  ASSET = 'asset',
  BALANCE = 'balance',
  VALUE = 'value',
}

const TokenImage = styled.img`
  height: 24px;
  width: 24px;
  margin-right: 16px;
`;

export const SelectTokenModal = () => {
  const { exchangeTokens } = useExchangeTokens();
  const { openedModal, closeModal, setTokenToBuy, setTokenToSell } = useExchangeState();
  const { symbol, rate } = useExchangeRate(Currency.USD);

  const [sortedByHeaderId, setSortedByHeaderId] = useState(TableHeader.BALANCE);
  const [sortedByDirection, setSortedByDirection] = useState(TableSortDirection.desc);
  const [filterText, setFilterText] = useState('');

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
    const filteredTokens = exchangeTokens?.filter(t => t.symbol.toLowerCase().includes(filterText.toLowerCase()));

    const sortedTokens = sortBy(filteredTokens, t => {
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
            <div className="flex flex-center">
              <TokenImage src={token.img} />
              <div>{token.symbol}</div>
            </div>
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
  }, [exchangeTokens, sortedByHeaderId, sortedByDirection, filterText, rate, symbol]);

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
    const setToken = openedModal === ModalType.FROM ? setTokenToSell : setTokenToBuy;

    setFilterText('');
    setToken(token);
    closeModal();
  };

  if (!openedModal) {
    return null;
  }

  return (
    <GenericModal
      onClose={() => {
        setFilterText('');
        closeModal();
      }}
      title="Select a token"
      body={
        <div className="exchange_modal">
          <div className="table_filter">
            <div className="py-2">
              <TextField
                id="standard-name"
                label="Filter by token"
                value={filterText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                startAdornment={<Icon size="sm" type="search" />}
              />
            </div>
          </div>
          <Table
            headers={headers}
            rows={rows}
            sortedByHeaderId={sortedByHeaderId}
            sortDirection={sortedByDirection}
            onHeaderClick={onHeaderClick}
            onRowClick={onRowClick}
          />
        </div>
      }
    />
  );
};
