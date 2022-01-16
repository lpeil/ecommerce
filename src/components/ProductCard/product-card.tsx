import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

import './product-cards.style.scss';

import ProductInterface from '../../interfaces/product.interface';

interface ProductCardProps {
  product: ProductInterface;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    // eslint-disable-next-line no-console
    console.log('Add to cart', product);
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Box className="product-card">
      {/* @ts-ignore */}
      <Paper elevation={0} square>
        <CardMedia
          image={product.image}
          alt={product.name}
          component="img"
          onClick={handleViewProduct}
        />
        <CardContent>
          <Typography variant="h6" onClick={handleViewProduct}>
            {product.name}
          </Typography>
          <Typography variant="body1" component="p">
            {`$ ${product.price}`}
          </Typography>
          <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>
          <Button onClick={handleViewProduct}>View Product</Button>
        </CardContent>
      </Paper>
    </Box>
  );
}

export default ProductCard;
