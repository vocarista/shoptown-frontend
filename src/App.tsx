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

function App() {
  const toggleIsMobile = useGeneral((state: any) => state.toggleIsMobile)
  const setAllProducts = useProducts((state: any) => state.setAllProducts)
  // const allProducts = useProducts((state: any) => state.allProducts)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:7120/products');
      const json = await response.json();
      setAllProducts(json);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) toggleIsMobile(false);
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
