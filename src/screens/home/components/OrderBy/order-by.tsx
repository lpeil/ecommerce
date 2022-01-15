import React from 'react';
import { Typography, Select, MenuItem } from '@mui/material';

function HomeOrder() {
  return (
    <div className="order">
      <Typography variant="body1">Order by</Typography>
      <Select>
        <MenuItem>Featured</MenuItem>
        <MenuItem>Price: Low to High</MenuItem>
        <MenuItem>Price: High to Low</MenuItem>
        <MenuItem>Name: A to Z</MenuItem>
        <MenuItem>Name: Z to A</MenuItem>
      </Select>
    </div>
  );
}

export default HomeOrder;
