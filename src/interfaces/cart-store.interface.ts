import ProductInterface from './product.interface';

interface CartStoreInterface {
  products: {
    product: ProductInterface;

    quantity: number;
  }[];

  new: boolean;
}

export default CartStoreInterface;
