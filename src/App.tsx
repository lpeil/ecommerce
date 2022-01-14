import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import store from './store';
import theme from './styles/theme';
import Routes from './routes';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
