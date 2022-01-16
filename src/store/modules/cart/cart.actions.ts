import ProductInterface from '../../../interfaces/product.interface';

export const addProductToCart = (product: ProductInterface, quantity = 1) => ({
  type: '@cart/ADD_PRODUCT',
  product,
  quantity,
});

export const removeProductFromCart = (product: ProductInterface) => ({
  type: '@cart/REMOVE_PRODUCT',
  product,
});
