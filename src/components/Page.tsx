import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  padding: 32px 0; // xlg
`;

export const Page: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};
