import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { apiGetProducts } from '../../services/products';
import { setProducts } from '../../store/modules/products/products.actions';

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

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      {products.map((product: ProductInterface) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}

export default HomeScreen;
