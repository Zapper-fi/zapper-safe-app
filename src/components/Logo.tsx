import React from 'react';

import styled from 'styled-components';

const LogoContainer = styled.span`
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
`;

const LogoImg = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 12px; // md
`;

const LogoText = styled.span`
  font-family: 'Avenir Next', Arial, sans-serif;
  font-size: 20px; // h4
  font-weight: 600; // bold
  margin-top: 2px;
`;

export const Logo = () => {
  return (
    <a href="https://zapper.fi" target="_blank">
      <LogoContainer>
        <LogoImg src="/logo.svg" alt="Zapper.fi Logo" />
        <LogoText>Zapper.fi</LogoText>
      </LogoContainer>
    </a>
  );
};
