import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './pages/home';
import WeatherAlerts from './pages/weatherAlerts';
import SearchLocation from './pages/search';
import Login from './pages/login';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/weather-alerts" element={<WeatherAlerts />} />
        <Route path='/search' element={<SearchLocation />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;