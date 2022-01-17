import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Paper, TextField, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

import StoreInterface from '../../../../interfaces/store.interface';
import CartStoreInterface from '../../../../interfaces/cart-store.interface';
import ProductInterface from '../../../../interfaces/product.interface';

import {
  changeProductQuantity,
  removeProductFromCart,
} from '../../../../store/modules/cart/cart.actions';

const productDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

function MyCart() {
  const dispatch = useDispatch();

  const cart: CartStoreInterface = useSelector(
    (state: StoreInterface) => state.cart,
  );

  const handleChangeCartQuantity =
    (product: ProductInterface) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      dispatch(changeProductQuantity(product, parseFloat(value)));
    };

  const handleRemoveProduct = (product: ProductInterface) => () => {
    dispatch(removeProductFromCart(product));
  };

  return (
    <div className="my-cart">
      <Typography variant="h5" color="primary">
        My Cart
      </Typography>
      <div className="items">
        {cart.items.length ? (
          cart.items.map((item) => (
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
                    inputProps={{ min: 1, max: item.product.stock }}
                    onChange={handleChangeCartQuantity(item.product)}
                  />
                </div>
                <Typography variant="body1">
                  {`$ ${(item.product.price * item.quantity).toFixed(2)}`}
                </Typography>
              </div>
              <IconButton onClick={handleRemoveProduct(item.product)}>
                <Delete color="primary" />
              </IconButton>
            </Paper>
          ))
        ) : (
          <Typography variant="h4">Empty cart</Typography>
        )}
      </div>
    </div>
  );
}

export default MyCart;
