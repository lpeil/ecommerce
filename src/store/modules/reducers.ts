import { combineReducers } from 'redux';

import products from './products/products.reducer';
import home from './home/home.reducer';
import cart from './cart/cart.reducer';

export default combineReducers({ products, home, cart });
