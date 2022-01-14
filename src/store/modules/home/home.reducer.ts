import produce from 'immer';
import HomeStoreInterface from '../../../interfaces/home-store.interface';

const initialState: HomeStoreInterface = {
  filters: {
    name: '',
    price: [0, 0],
  },
};

export default function cart(
  state: HomeStoreInterface = initialState,
  action: { type: string; name?: string },
) {
  switch (action.type) {
    case '@home/CLEAR_FILTERS':
      return produce(state, () => initialState);
    case '@home/SET_NAME_FILTER':
      return produce(state, () => ({
        ...state,
        filters: {
          ...state.filters,
          name: action.name,
        },
      }));
    default:
      return state;
  }
}
