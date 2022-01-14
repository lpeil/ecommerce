export const clearHomeFilters = () => ({
  type: '@home/CLEAR_FILTERS',
});

export const setHomeNameFilter = (name: string) => ({
  type: '@home/SET_NAME_FILTER',
  name,
});

export const setHomePriceFilter = (price: number[] | number) => ({
  type: '@home/SET_PRICE_FILTER',
  price,
});
