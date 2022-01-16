import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle, ShoppingCart } from '@mui/icons-material';
import './Navbar.styles.scss';

function Navbar() {
  const navigate = useNavigate();

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

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
            <ShoppingCart color="secondary" />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
