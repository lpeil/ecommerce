import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
} from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import './Navbar.styles.scss';

import StoreInterface from '../../interfaces/store.interface';
import CartStoreInterface from '../../interfaces/cart-store.interface';

function Navbar() {
  const navigate = useNavigate();
  const [cartQuantity, setCartQuantity] = useState(0);

  const cart: CartStoreInterface = useSelector(
    (state: StoreInterface) => state.cart,
  );

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  useEffect(() => {
    if (cart.items.length) {
      const quantities = cart.items.map((item) => item.quantity);

      setCartQuantity(quantities.reduce((a, b) => a + b));
    }
  }, [cart.items]);

  return (
    <Box sx={{ flexGrow: 1 }} className="navbar">
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">E-Commerce</Link>
          </Typography>
          <IconButton>
            <AccountCircle color="secondary" />
          </IconButton>
          <IconButton onClick={handleNavigateToCart}>
            <Badge badgeContent={cartQuantity} color="secondary">
              <ShoppingCart color="secondary" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
