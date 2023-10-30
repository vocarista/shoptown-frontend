import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmed from './pages/Confirmed';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import useGeneral from './store/general';
import useProducts from './store/products';
import useAuth from './store/auth';
import axios, { AxiosError, AxiosResponse } from "axios";

function App() {
  const toggleIsMobile = useGeneral((state: any) => state.toggleIsMobile)
  const setAllProducts = useProducts((state: any) => state.setAllProducts)
  const base = useAuth((state: any) => state.base);
  const setToken = useAuth((state: any) => state.setToken);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, [])

  useEffect(() => {
    axios.get(`${base}/products`)
    .then((response: AxiosResponse) => {
      setAllProducts(response.data)
    }).catch((err: AxiosError) => console.log(err));
  }, [setAllProducts, base]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1000) toggleIsMobile(false);
      else toggleIsMobile(true)
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

  return (
    <div className = "App">
      <Routes>
        <Route path = {`/`} element = {<Navigate to = '/home' />} />
        <Route path = {`/home`} element = {<Home />} index/>
        <Route path = {`/cart`} element = {<Cart />} />
        <Route path = {`/login`} element = {<Login />} />
        <Route path = {`/signup`} element = {<Signup />} />
        <Route path = {`/confirm`} element = {<Confirmed />} />
        <Route path = {`/checkout`} element = {<Checkout />} />
        <Route path = {`/orders`} element = {<Orders />} />
        <Route path = {`/profile`} element = {<Profile />} />
        <Route path = {`/*`} element = {<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;
