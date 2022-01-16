import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/home';
import NotFoundScreen from './screens/notFound';
import ProductScreen from './screens/product';
import CartScreen from './screens/cart';

import { Navbar } from './components';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route index element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
