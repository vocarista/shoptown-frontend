import { useEffect } from 'react';
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
import AlertToast from './components/AlertToast';
import useAlert from './store/alert';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const toggleIsMobile = useGeneral((state: any) => state.toggleIsMobile)
  const setAllProducts = useProducts((state: any) => state.setAllProducts)
  const setDisplayProducts = useProducts((state: any) => state.setDisplayProducts)
  const base = useAuth((state: any) => state.base);
  const setAlert = useAlert((state: any) => state.setError);
  const setShowAlert = useAlert((state: any) => state.setShowError);

  const token = localStorage.getItem('token');
  
  useEffect(() => {
    async function validateToken() {

      const response = await fetch(`${base}/user/auth/is-token-valid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `"Bearer ${token}"`,
        },
        body: JSON.stringify({ token: token })
      })
      const data = await response.json();

      if (response.status === 200 && data == true) {
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
        setAlert('Session expired. Please login again.');
        setShowAlert(true);
      }
    }
    validateToken();
  })

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`${base}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        const data = await response.json();
        setAllProducts(data);
        setDisplayProducts(data);
      }
    }
    fetchProducts();
  })

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
      <AlertToast />
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  )
}

export default App;
