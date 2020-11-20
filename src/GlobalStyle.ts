import avertaBoldFont from '@gnosis.pm/safe-react-components/dist/fonts/averta-bold.woff2';
import avertaFont from '@gnosis.pm/safe-react-components/dist/fonts/averta-normal.woff2';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }

  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: 'Averta', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  #root {
    height: 100%;
    padding-right: 0.5rem;
  }

  .MuiFormControl-root,
  .MuiInputBase-root {
    width: 100% !important;
  }

  a {
    text-decoration: none;
    transition: 0.3s;
    color: inherit;

    &:hover {
      opacity: 0.6; // opacity
    }
  }

  @font-face {
    font-family: 'Averta';
    src: local('Averta'), local('Averta Bold'),
    url(${avertaFont}) format('woff2'),
    url(${avertaBoldFont}) format('woff');
  }

  @font-face {
    font-family: 'Avenir Next';
    src: url('/fonts/AvenirNext/AvenirNextLTPro-Heavy.otf') format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Avenir Next';
    src: url('/fonts/AvenirNext/AvenirNextLTPro-Bold.otf') format('truetype');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Avenir Next';
    src: url('/fonts/AvenirNext/AvenirNextLTPro-Regular.otf') format('truetype');
    font-weight: 300;
  }
`;

export default GlobalStyle;
