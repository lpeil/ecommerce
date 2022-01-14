import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/home/home.screen';
import NotFoundScreen from './screens/notFound/not-found.screen';

import { Navbar } from './components';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<HomeScreen />} />
          <Route path="*" element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
