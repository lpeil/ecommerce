import ProductInterface from './product.interface';
import HomeStoreInterface from './home-store.interface';
import CartStoreInterface from './cart-store.interface';

interface StoreInterface {
  products: ProductInterface[];
  home: HomeStoreInterface;
  cart: CartStoreInterface;
}

export default StoreInterface;
