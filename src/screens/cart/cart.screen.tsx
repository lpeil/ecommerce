import React from 'react';

import { MyCart, Summary } from './components';

import './cart.style.scss';

function CartScreen() {
  return (
    <div className="cart screen">
      <MyCart />
      <Summary />
    </div>
  );
}

export default CartScreen;
