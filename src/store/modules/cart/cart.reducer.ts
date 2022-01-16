import produce from 'immer';

import CartStoreInterface from '../../../interfaces/cart-store.interface';
import ProductInterface from '../../../interfaces/product.interface';

const initialState: CartStoreInterface = {
  products: [],
  new: false,
};

export default function cart(
  state = initialState,
  action: { type: string; product?: ProductInterface; quantity?: number },
) {
  let productIndex: number;

  switch (action.type) {
    case '@cart/ADD_PRODUCT':
      productIndex = state.products.findIndex(
        (p) => p.product.id === action.product?.id,
      );

      if (productIndex === -1) {
        return produce(state, () => ({
          products: [
            ...state.products,
            { product: action.product, quantity: action.quantity },
          ],
          new: true,
        }));
      }

      return produce(state, () => ({
        products: state.products.map((p, key) => {
          if (key === productIndex) {
            return {
              ...p,
              quantity: (action.quantity || 1) + p.quantity,
            };
          }

          return p;
        }),
        new: true,
      }));
    case '@cart/REMOVE_PRODUCT':
      return produce(state, () => ({
        ...state,
        products: state.products.filter(
          (p) => p.product.id !== action.product?.id,
        ),
      }));
    default:
      return state;
  }
}
