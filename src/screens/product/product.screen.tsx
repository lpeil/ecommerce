import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Skeleton } from '@mui/material';

import ProductName from './product-name';
import './product.style.scss';

import { addProductToCart } from '../../store/modules/cart/cart.actions';

import StoreInterface from '../../interfaces/store.interface';
import ProductInterface from '../../interfaces/product.interface';

const productDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget tellus blandit, finibus magna et, ultrices urna. Mauris vitae mattis lacus, a rhoncus massa. Ut placerat ligula in ante sollicitudin, eget cursus lacus lacinia.';

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products: ProductInterface[] = useSelector(
    (state: StoreInterface) => state.products,
  );

  const [product, setProduct] = useState<ProductInterface>(
    {} as ProductInterface,
  );
  const [loadedProduct, setLoadedProduct] = useState<boolean>(false);
  const [cartQuantity, setCartQuantity] = useState<number>(1);

  const findProduct = () => {
    const thisProduct = products.find((p) => p.id === id);

    if (thisProduct) {
      setLoadedProduct(true);
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

  const handleAddToCart = () => {
    dispatch(addProductToCart(product, cartQuantity));
    navigate('/cart');
  };

  useEffect(() => {
    findProduct();
  }, [id, products]);

  return (
    <div className="product screen">
      <ProductName name={product.name} mobile loaded={loadedProduct} />
      {loadedProduct ? (
        <img src={product.image} alt={product.name} loading="lazy" />
      ) : (
        <Skeleton variant="rectangular" />
      )}
      <div className="product-content">
        <ProductName name={product.name} loaded={loadedProduct} />
        {loadedProduct ? (
          <Typography variant="body1">{productDescription}</Typography>
        ) : (
          <Skeleton variant="text" className="description" height={128} />
        )}
        {loadedProduct ? (
          <Typography variant="h3" component="h6">
            {`$ ${product.price}`}
          </Typography>
        ) : (
          <Skeleton variant="text" height={64} width={140} />
        )}
        <div className="product-to-cart">
          <div className="quantity">
            <Typography variant="body1">Quantity</Typography>
            <TextField
              name="quantity"
              value={cartQuantity}
              type="number"
              inputProps={{ min: 1, max: product.stock }}
              onChange={handleChangeCartQuantity}
              disabled={!product.stock}
            />
          </div>
          <Button variant="contained" onClick={handleAddToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
