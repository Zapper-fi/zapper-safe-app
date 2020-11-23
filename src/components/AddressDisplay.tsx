import React from 'react';

import Blockies from 'react-blockies';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Identicon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px; // $xlg
  max-width: 200px;
  padding: 0 12px; // 0 $md
  height: 40px;
  transition: 0.3s; // $transition
  border-radius: 4px; // $radius
  cursor: pointer;
  position: relative;
`;

const RoundBlockies = styled(Blockies)`
  border-radius: 50%;
`;

const ConnectionStatus = styled.span`
  position: absolute;
  bottom: 2px;
  right: 12px; // md
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background: #00d897; // success
`;

const IdenticonAddress = styled.span`
  font-weight: 500; // demibold
  max-width: 175px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 75px;
`;

type Props = {
  address: string;
};

export const AddressDisplay: React.FC<Props> = ({ address }) => {
  return (
    <Container>
      <Identicon>
        <RoundBlockies seed={address.toLowerCase()} size={10} scale={3} />
        <ConnectionStatus data-tip="Connected" data-place="bottom" />
      </Identicon>
      <IdenticonAddress>
        {address.toLowerCase().substring(0, 6)}...{address.toLowerCase().slice(-4)}
      </IdenticonAddress>
      <ReactTooltip />
    </Container>
  );
};
