import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';

import StoreInterface from '../../../../interfaces/store.interface';
import CartStoreInterface from '../../../../interfaces/cart-store.interface';

function Summary() {
  const navigate = useNavigate();
  const cart: CartStoreInterface = useSelector(
    (state: StoreInterface) => state.cart,
  );
  const [totalValue, setTotalValue] = useState('$ 0.00');
  const [cartQuantity, setCartQuantity] = useState(0);

  const handleChooseMoreProducts = () => {
    navigate('/');
  };

  const calculateTotalValue = () => {
    let value = 0;

    cart.items.forEach((item) => {
      value += item.product.price * item.quantity;
    });

    setTotalValue(`$ ${value}.00`);
  };

  const countCartQuantity = () => {
    if (cart.items.length) {
      const quantities = cart.items.map((item) => item.quantity);

      return setCartQuantity(quantities.reduce((a, b) => a + b));
    }

    return setCartQuantity(0);
  };

  useEffect(() => {
    calculateTotalValue();
    countCartQuantity();
  }, [cart.items]);

  return (
    <div className="summary">
      <Typography variant="h5" color="primary">
        Summary
      </Typography>
      <Paper elevation={0} square>
        <div className="item">
          <Typography variant="body2">
            Subtotal ({cartQuantity} items)
          </Typography>
          <Typography variant="body1">{totalValue}</Typography>
        </div>
        <div className="item">
          <Typography variant="body2">Delivery cost</Typography>
          <Typography variant="body1">$ 0.00</Typography>
        </div>
        <div className="item">
          <Typography variant="body2">Discount</Typography>
          <Typography variant="body1">$ 0.00</Typography>
        </div>
        <div className="item">
          <Typography variant="body2">Total Cost</Typography>
          <Typography variant="body1">{totalValue}</Typography>
        </div>
        <Button variant="contained" disabled={cartQuantity === 0}>
          Buy now
        </Button>
        <Button variant="outlined" onClick={handleChooseMoreProducts}>
          Choose more products
        </Button>
      </Paper>
    </div>
  );
}

export default Summary;
