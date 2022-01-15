import produce from 'immer';
import HomeStoreInterface from '../../../interfaces/home-store.interface';

const initialState: HomeStoreInterface = {
  filters: {
    name: '',
    price: [0, 0],
  },
  orderBy: {
    field: 'id',
    order: 'asc',
  },
};

export default function cart(
  state: HomeStoreInterface = initialState,
  action: {
    type: string;
    name?: string;
    price?: number[];
    field?: 'string';
    order?: 'asc' | 'desc';
  },
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
    case '@home/SET_PRICE_FILTER':
      return produce(state, () => ({
        ...state,
        filters: {
          ...state.filters,
          price: action.price,
        },
      }));
    case '@home/CHANGE_ORDER_BY':
      return produce(state, () => ({
        ...state,
        orderBy: {
          field: action.field,
          order: action.order,
        },
      }));
    default:
      return state;
  }
}
