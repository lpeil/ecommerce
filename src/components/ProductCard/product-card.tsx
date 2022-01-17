import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Skeleton,
} from '@mui/material';

import './product-cards.style.scss';

import ProductInterface from '../../interfaces/product.interface';
import { addProductToCart } from '../../store/modules/cart/cart.actions';

interface ProductCardProps {
  product: ProductInterface;
}

function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addProductToCart(product));
    navigate('/cart');
  };

  const handleViewProduct = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Box className="product-card">
      <Paper elevation={0} square>
        <CardMedia
          image={product.image}
          alt={product.name}
          component="img"
          onClick={handleViewProduct}
          onLoad={() => setImageLoaded(true)}
          sx={{ display: imageLoaded ? 'block' : 'none' }}
        />
        <Skeleton
          variant="rectangular"
          width={320}
          height={240}
          sx={{ display: imageLoaded ? 'none' : 'block' }}
        />
        <CardContent>
          <Typography variant="h6" onClick={handleViewProduct}>
            {product.name}
          </Typography>
          <Typography variant="body1" component="p">
            {`$ ${product.price.toFixed(2)}`}
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
