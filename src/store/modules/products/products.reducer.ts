import produce from 'immer';

import ProductInterface from '../../../interfaces/product.interface';

export default function cart(
  state: ProductInterface[] = [],
  action: { type: string; products?: ProductInterface[] },
) {
  switch (action.type) {
    case '@products/SET_PRODUCTS':
      return produce(state, () => action.products);
    default:
      return state;
  }
}
