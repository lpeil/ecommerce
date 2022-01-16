import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Paper, TextField } from '@mui/material';

import StoreInterface from '../../../../interfaces/store.interface';
import CartStoreInterface from '../../../../interfaces/cart-store.interface';

const productDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function MyCart() {
  const cart: CartStoreInterface = useSelector(
    (state: StoreInterface) => state.cart,
  );

  return (
    <div className="my-cart">
      <Typography variant="h5" color="primary">
        My Cart
      </Typography>
      <div className="items">
        {cart.items.map((item) => (
          <Paper elevation={1} square key={item.product.id}>
            <div className="content">
              <img src={item.product.image} alt={item.product.name} />
              <div className="item">
                <Typography variant="body1">{item.product.name}</Typography>
                <Typography variant="body2">{productDescription}</Typography>
              </div>
            </div>
            <div className="quantity">
              <div className="input">
                <Typography variant="body1">Quantity</Typography>
                <TextField
                  name="quantity"
                  value={item.quantity}
                  type="number"
                  inputProps={{ min: 1, max: 3000 }}
                  onChange={() => console.log('ei')}
                />
              </div>
              <Typography variant="body1">
                {`$ ${(parseFloat(item.product.price) * item.quantity).toFixed(
                  2,
                )}`}
              </Typography>
            </div>
          </Paper>
        ))}
      </div>
    </div>
  );
}

export default MyCart;
