import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiGetProducts } from '../../services/products';
import { setProducts } from '../../store/modules/products/products.actions';

import { LeftMenu } from './components';
import './home.styles.scss';

import StoreInterface from '../../interfaces/store.interface';
import ProductInterface from '../../interfaces/product.interface';
import HomeStoreInterface from '../../interfaces/home-store.interface';

function HomeScreen() {
  const dispatch = useDispatch();

  const products: ProductInterface[] = useSelector(
    (state: StoreInterface) => state.products,
  );

  const homeOptions: HomeStoreInterface = useSelector(
    (state: StoreInterface) => state.home,
  );

  const filterProducts = (product: ProductInterface) => {
    if (
      parseInt(product.price) < homeOptions.filters.price[0] ||
      parseInt(product.price) > homeOptions.filters.price[1]
    ) {
      return false;
    }

    return product.name
      .toLowerCase()
      .includes(homeOptions.filters.name?.toLowerCase() || '');
  };

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
        {products.filter(filterProducts).map((product) => (
          <p key={product.id}>{product.name}</p>
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;
