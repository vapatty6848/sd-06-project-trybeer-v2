import { createGlobalStyle, css } from 'styled-components';

import Typoslab from './fonts/TypoSlabIrregularDemo.otf';

const GlobalStyles = createGlobalStyle`
  @font-face {
      font-family: 'Typoslab';
      src: local('Typoslab'), 
      url(${Typoslab});
  } 

   * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap'); 
  }

  html body {
    height: 100%;
  }

  body {
    ${({ theme }) => css`
      background: ${theme.colors.backgroundHtml};
      padding: 0;
      margin: 0;
      font-family: 'Open Sans', sans-serif;
    `}
  }
`;

export default GlobalStyles;
