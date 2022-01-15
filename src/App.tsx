import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from '@mui/material';

import Routes from './routes';
import theme from './styles/theme';

import { setProducts } from './store/modules/products/products.actions';
import { apiGetProducts } from './services/products';

function App() {
  const dispatch = useDispatch();

  const getProducts = async () => {
    const apiProducts = await apiGetProducts();

    dispatch(setProducts(apiProducts));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}

// @ts-ignore
if (window.Cypress) {
  // @ts-ignore
  window.store = store;
}

export default App;
