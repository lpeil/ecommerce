import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import products from './products/products.reducer';

const createRootReducer = (history: History<unknown>) =>
  combineReducers({ router: connectRouter(history), products });

export default createRootReducer;
