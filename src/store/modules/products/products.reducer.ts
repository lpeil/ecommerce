import produce from 'immer';

import ProductInterface from '../../../interfaces/product.interface';

export default function products(
  state: ProductInterface[] = [],
  action: { type: string; products?: ProductInterface[] },
) {
  switch (action.type) {
    case '@products/SET_PRODUCTS':
      return produce(state, () =>
        action.products?.map((item: ProductInterface) => ({
          ...item,
          price: parseFloat(`${item.price}`),
          image: item.image.replace('lorempixel', 'loremflickr'),
        })),
      );
    default:
      return state;
  }
}
