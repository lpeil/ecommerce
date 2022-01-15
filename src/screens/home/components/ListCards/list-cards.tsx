import React from 'react';
import { useSelector } from 'react-redux';

import { ProductCard } from '../../../../components';
import { ProductCardSkeleton } from '../../../../components/ProductCard';

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

  const orderProducts = (a: ProductInterface, b: ProductInterface) => {
    const price1 = parseInt(a.price);
    const price2 = parseInt(b.price);
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();

    switch (`${homeOptions.orderBy.field}-${homeOptions.orderBy.order}`) {
      case 'name-asc':
        return name1 > name2 ? 1 : -1;
      case 'name-desc':
        return name1 > name2 ? -1 : 1;
      case 'price-asc':
        return price1 > price2 ? 1 : -1;
      case 'price-desc':
        return price1 > price2 ? -1 : 1;
      default:
        return parseInt(a.id) > parseInt(b.id) ? 1 : -1;
    }
  };

  return (
    <div className="list-cards">
      {products.length
        ? products
            .filter(filterProducts)
            .sort(orderProducts)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        : Array.from(Array(6).keys()).map((key) => (
            <ProductCardSkeleton key={key} />
          ))}
    </div>
  );
}

export default HomeListCards;
