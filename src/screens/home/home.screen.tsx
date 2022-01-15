import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { LeftMenu, ListCards, OrderBy, MobileFilters } from './components';
import './home.styles.scss';

import StoreInterface from '../../interfaces/store.interface';
import ProductInterface from '../../interfaces/product.interface';

function HomeScreen() {
  const products: ProductInterface[] = useSelector(
    (state: StoreInterface) => state.products,
  );

  const mostExpensiveProductPrice = (): number => {
    const productsValues: number[] = products.map((product) =>
      parseInt(product.price),
    );

    return Math.max(...productsValues);
  };

  return (
    <div className="home screen">
      <LeftMenu highestPrice={mostExpensiveProductPrice()} />
      <div className="products">
        <Box sx={{ display: { xs: 'none', md: 'block' }, width: '100%' }}>
          <OrderBy />
        </Box>
        <MobileFilters highestPrice={mostExpensiveProductPrice()} />
        <ListCards />
      </div>
    </div>
  );
}

export default HomeScreen;
