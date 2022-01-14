import api from './api';
import ProductInterface from '../interfaces/product.interface';

// eslint-disable-next-line import/prefer-default-export
export const apiGetProducts = () =>
  api.get('product').then((response) => {
    const { data } = response;

    return data.map((item: ProductInterface) => ({
      ...item,
      image: item.image.replace('lorempixel', 'loremflickr'),
    }));
  });
