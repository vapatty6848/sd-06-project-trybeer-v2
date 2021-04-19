import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from './Styles/Global';
import { useTheme } from './Hooks/theme';

import Routes from './Routes';

const App = () => {
  const { theme } = useTheme();

  return (
    <BrowserRouter>
      <ThemeProvider theme={ theme }>
        <GlobalStyles />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
