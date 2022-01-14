import ProductInterface from './product.interface';
import HomeStoreInterface from './home-store.interface';

interface StoreInterface {
  products: ProductInterface[];
  home: HomeStoreInterface;
}

export default StoreInterface;
