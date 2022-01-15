import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiGetProducts } from '../../services/products';
import { setProducts } from '../../store/modules/products/products.actions';

import { LeftMenu, ListCards, OrderBy } from './components';
import './home.styles.scss';

import StoreInterface from '../../interfaces/store.interface';
import ProductInterface from '../../interfaces/product.interface';

function HomeScreen() {
  const dispatch = useDispatch();

  const products: ProductInterface[] = useSelector(
    (state: StoreInterface) => state.products,
  );

  const getProducts = async () => {
    const apiProducts = await apiGetProducts();

    dispatch(setProducts(apiProducts));
  };

  const mostExpensiveProductPrice = (): number => {
    const productsValues: number[] = products.map((product) =>
      parseInt(product.price),
    );

    return Math.max(...productsValues);
  };

  useEffect(() => {
    getProducts();
  }, []);

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
