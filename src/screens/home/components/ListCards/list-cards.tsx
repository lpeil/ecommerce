import React from 'react';
import { useSelector } from 'react-redux';

import StoreInterface from '../../../../interfaces/store.interface';
import ProductInterface from '../../../../interfaces/product.interface';
import HomeStoreInterface from '../../../../interfaces/home-store.interface';

function HomeListCards() {
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

  return (
    <div className="list-cards">
      {products.filter(filterProducts).map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}
    </div>
  );
}

export default HomeListCards;
