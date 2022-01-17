import ProductInterface from './product.interface';

interface CartStoreInterface {
  items: {
    product: ProductInterface;

    quantity: number;
  }[];

  new: boolean;
}

export default CartStoreInterface;
