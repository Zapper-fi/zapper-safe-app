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

import { useSettings } from '../../hooks/useSettings';
import { formatBalanceForDisplay, formatDollarForDisplay } from '../../utils/number';

import { ModalType } from './ExchangeProvider';
import { useExchangeRate } from './hooks/useExchangeRate';
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
  const { currency } = useSettings();
  const { exchangeTokens } = useExchangeTokens();
  const {
    openedModal,
    setOpenedModal,
    setTokenToBuy,
    setTokenToSell,
    setAmountToSell,
    setAmountToSellInputValue,
  } = useExchangeState();
  const { symbol, rate } = useExchangeRate(currency);

  const [sortedByHeaderId, setSortedByHeaderId] = useState(TableHeader.VALUE);
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

    if (openedModal === ModalType.FROM) {
      setTokenToSell(token);
      setAmountToSellInputValue('0');
      setAmountToSell('0');
    } else {
      setTokenToBuy(token);
    }

    setFilterText('');
    setOpenedModal(null);
  };

  if (!openedModal) {
    return null;
  }

  return (
    <GenericModal
      onClose={() => {
        setFilterText('');
        setOpenedModal(null);
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
