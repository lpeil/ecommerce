import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './modules/reducers';

const enhancer =
  process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware())
    : applyMiddleware();

export default createStore(rootReducer, compose(enhancer));
