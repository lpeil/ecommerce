import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Button } from '@mui/material';

function Summary() {
  const navigate = useNavigate();

  const handleChooseMoreProducts = () => {
    navigate('/');
  };

  return (
    <div className="summary">
      <Typography variant="h5" color="primary">
        Summary
      </Typography>
      <Paper elevation={0} square>
        <div className="item">
          <Typography variant="body2">Subtotal (2 items)</Typography>
          <Typography variant="body1">$ 1000.00</Typography>
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
          <Typography variant="body1">$ 1000.00</Typography>
        </div>
        <Button variant="contained">Buy now</Button>
        <Button variant="outlined" onClick={handleChooseMoreProducts}>
          Choose more products
        </Button>
      </Paper>
    </div>
  );
}

export default Summary;
