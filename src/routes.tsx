import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomeScreen from './screens/home';
import NotFoundScreen from './screens/notFound';

import { Navbar } from './components';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/">
            <Route index element={<HomeScreen />} />
            <Route path="*" element={<NotFoundScreen />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;
