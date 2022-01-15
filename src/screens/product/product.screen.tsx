import React from 'react';
import { useParams } from 'react-router-dom';

function ProductScreen() {
  const { id } = useParams();

  return <h1>Product {id} Screen</h1>;
}

export default ProductScreen;
