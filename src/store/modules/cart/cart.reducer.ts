import produce from 'immer';

import CartStoreInterface from '../../../interfaces/cart-store.interface';
import ProductInterface from '../../../interfaces/product.interface';

const initialState: CartStoreInterface = JSON.parse(
  localStorage.getItem('cart') || '{"products":[],"new":false}',
);

export default function cart(
  state = initialState,
  action: { type: string; product?: ProductInterface; quantity?: number },
) {
  let productIndex: number;
  let newStore: CartStoreInterface;

  switch (action.type) {
    case '@cart/ADD_PRODUCT':
      productIndex = state.items.findIndex(
        (p) => p.product.id === action.product?.id,
      );

      if (productIndex === -1) {
        newStore = produce(state, () => ({
          items: [
            ...state.items,
            { product: action.product, quantity: action.quantity },
          ],
          new: true,
        }));

        localStorage.setItem('cart', JSON.stringify(newStore));

        return newStore;
      }

      newStore = produce(state, () => ({
        items: state.items.map((p, key) => {
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

      localStorage.setItem('cart', JSON.stringify(newStore));

      return newStore;
    case '@cart/REMOVE_PRODUCT':
      newStore = produce(state, () => ({
        ...state,
        items: state.items.filter((p) => p.product.id !== action.product?.id),
      }));

      localStorage.setItem('cart', JSON.stringify(newStore));

      return newStore;
    default:
      return state;
  }
}
