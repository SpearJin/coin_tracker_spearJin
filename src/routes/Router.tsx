import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chart from '../page/Chart';
import Coin from '../page/Coin';
import Coins from '../page/Coins';
import Price from '../page/Price';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Coins />}></Route>
        <Route path='/:coinId' element={<Coin />}>
          <Route path='chart' element={<Chart />} />
          <Route path='price' element={<Price />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
