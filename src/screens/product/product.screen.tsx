import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

import './product.style.scss';

import StoreInterface from '../../interfaces/store.interface';
import ProductInterface from '../../interfaces/product.interface';

const productDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget tellus blandit, finibus magna et, ultrices urna. Mauris vitae mattis lacus, a rhoncus massa. Ut placerat ligula in ante sollicitudin, eget cursus lacus lacinia.';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const products: ProductInterface[] = useSelector(
    (state: StoreInterface) => state.products,
  );

  const [product, setProduct] = useState<ProductInterface>(
    {} as ProductInterface,
  );
  const [cartQuantity, setCartQuantity] = useState<number>(0);

  const findProduct = () => {
    const thisProduct = products.find((p) => p.id === id);

    if (thisProduct) {
      return setProduct(thisProduct);
    }

    if (products.length) {
      return navigate('/not-found');
    }

    return true;
  };

  const handleChangeCartQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    setCartQuantity(parseInt(value));
  };

  useEffect(() => {
    findProduct();
  }, [id, products]);

  return (
    <div className="product screen">
      <img src={product.image} alt={product.name} loading="lazy" />
      <div className="product-content">
        <Typography variant="h5" component="h1">
          {product.name}
        </Typography>
        <Typography variant="body1">{productDescription}</Typography>
        <Typography variant="h3" component="h6">
          {`$ ${product.price}`}
        </Typography>
        <div className="product-to-cart">
          <div className="quantity">
            <Typography variant="body1">Quantity</Typography>
            <TextField
              name="quantity"
              value={cartQuantity}
              type="number"
              inputProps={{ min: 0, max: product.stock }}
              onChange={handleChangeCartQuantity}
              disabled={!product.stock}
            />
          </div>
          <Button variant="contained">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
