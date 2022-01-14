import { combineReducers } from 'redux';

import products from './products/products.reducer';
import home from './home/home.reducer';

export default combineReducers({ products, home });
