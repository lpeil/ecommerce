import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import { history } from '../routes';
import createRootReducer from './modules/reducers';

const middlewares = [routerMiddleware(history)];

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : applyMiddleware(...middlewares);

export default createStore(createRootReducer(history), compose(enhancer));
