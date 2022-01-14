import ProductInterface from '../../../interfaces/product.interface';

export const setProducts = (products: ProductInterface[]) => ({
  type: '@products/SET_PRODUCTS',
  products,
});

export const deleteProducts = () => ({
  type: '@products/DELETE_PRODUCT',
});
