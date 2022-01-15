import React from 'react';
import { useSelector } from 'react-redux';

import { LeftMenu, ListCards, OrderBy } from './components';
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
        <OrderBy />
        <ListCards />
      </div>
    </div>
  );
}

export default HomeScreen;
