import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const apiGetProducts = () =>
  api.get('product').then((response) => {
    const { data } = response;

    return data;
  });
