import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%
  }

  body {
    height: 100%;
    margin: 0px;
    padding: 0px;
    font-family: 'Avenir Next', Arial, sans-serif;
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
    src: url('/fonts/AvenirNext/AvenirNextLTPro-Heavy.otf') format('truetype');
    font-weight: 700;
  }

  @font-face {
    font-family: 'Averta';
    src: url('/fonts/AvenirNext/AvenirNextLTPro-Bold.otf') format('truetype');
    font-weight: 600;
  }

  @font-face {
    font-family: 'Avenir Next';
    src: url(/fonts/AvenirNext/AvenirNextLTPro-Regular.otf) format('truetype');
    font-weight: 300;
  }
`;

export default GlobalStyle;
