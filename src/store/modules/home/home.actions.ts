export const clearHomeFilters = () => ({
  type: '@home/CLEAR_FILTERS',
});

export const setHomeNameFilter = (name: string) => ({
  type: '@home/SET_NAME_FILTER',
  name,
});
