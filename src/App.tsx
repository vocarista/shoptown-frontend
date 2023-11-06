import { useEffect } from 'react';
import Home from './pages/Home';

import NotFound from './pages/NotFound';
import useGeneral from './store/general';
import useProducts from './store/products';
import useAuth from './store/auth';
import AlertToast from './components/AlertToast';
import useAlert from './store/alert';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const toggleIsMobile = useGeneral((state: any) => state.toggleIsMobile)
  const setAllProducts = useProducts((state: any) => state.setAllProducts)
  const setDisplayProducts = useProducts((state: any) => state.setDisplayProducts)
  const base = useAuth((state: any) => state.base);
  const setAlert = useAlert((state: any) => state.setAlert);
  const setShowAlert = useAlert((state: any) => state.setShowAlert);

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
      <Router>
      <Routes>
        <Route path = {`*`} element = {<App />}></Route>
        <Route path = {`/`} element = {<Home />}/>
        <Route path = {`/*`} element = {<NotFound />} />
      </Routes>
      </Router>
    </div>
  )
}

export default App;
