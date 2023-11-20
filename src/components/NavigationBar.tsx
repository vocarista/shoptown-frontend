import useGeneral from '../store/general';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Button, Flex } from '@radix-ui/themes';
import useAuth from '../store/auth';
import { Link as RouterLink } from 'react-router-dom';
import useAlert from '../store/alert';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import cartIcon from "../assets/shopping-cart.png";
import wishlistIcon from "../assets/wishlist.png"
import useUser from '../store/user';
import Badge from 'react-bootstrap/Badge';
import { useEffect, useState } from 'react';
import useProducts from '../store/products';

const Link = styled(RouterLink)`
color: black;
text-decoration: none;
`;

const NavigationBar = () => {
  const isMobile = useGeneral((state) => state.isMobile);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');
  const base = useAuth((state) => state.base);
  const setShowAlert = useAlert((state) => state.setShowAlert);
  const setAlert = useAlert((state) => state.setAlert);
  const navigate = useNavigate();

  const cartCount = useUser((state) => state.cartCount);
  const wishlistCount = useUser((state) => state.wishlistCount);
  const setCartList = useUser((state) => state.setCartList);
  const setWishlist = useUser((state) => state.setWishlist);
  const setDisplayProducts = useProducts((state) => state.setDisplayProducts);
  const resetDisplayProducts = useProducts((state) => state.resetDisplayProducts);
  const [keyword, setKeyword] = useState<string>('');

  const logoutHandler = async () => {
      await fetch(`${base}/user/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `"Bearer ${token}"`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });

      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('isLoggedIn');
      navigate('/');
      setAlert('Logged out successfully');
      setShowAlert(true);
      resetDisplayProducts();
  };

  useEffect(() => {
    if (isLoggedIn) {
      async function getCart() {
        const response = await fetch(`${base}/user/cart`, {
          method: 'GET',
          headers: {
            'Authorization': `"Bearer ${token}"`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setCartList(data);
        } else {
          setAlert('An error occurred. Please try again later.');
          setShowAlert(true);
        }
      }
      getCart();
    }
  }, [])
  
  const searchHandler = (event: any) => {
    event.preventDefault(); 
    async function getSearchedProducts() {
      const response = await fetch(`${base}/products/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ keyword: keyword }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setDisplayProducts(data);
        navigate('/');
      } else {
        setAlert('An error occurred. Please try again later.');
        setShowAlert(true);
      }
    }
    getSearchedProducts();
  };

  useEffect(() => {
    if (isLoggedIn) {
      async function getWishlist() {
        const response = await fetch(`${base}/user/wishlist`, {
          method: 'GET',
          headers: {
            'Authorization': `"Bearer ${token}"`,
            'Content-Type': 'application/json',
          },
        });
        if (response.status === 200) {
          const data = await response.json();
          setWishlist(data);
        } else {
          setAlert('An error occurred. Please try again later.');
          setShowAlert(true);
        }
      }
      getWishlist();
    }
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary w-screen">
        <Container fluid>
          <Navbar.Brand href="/">
            <img src= {logo} className={`${isMobile ? 'w-[30vw]' : 'w-[10vw]'}`} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "auto" }} navbarScroll>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="https://github.com/vocarista/shoptown-frontend" target="_blank">
                Github
              </Nav.Link>
              
              {isLoggedIn ? (
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item><Link to = "/profile">Profile</Link></NavDropdown.Item>
                  <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span className="text-red-600">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item><Link to='/login'>Login</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item><Link to='/signup'>Register</Link></NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
           {isLoggedIn && <Flex gap = "4" className={`${isMobile ? `my-3` : `mx-4` }`}>
              <Nav.Link><RouterLink to = "/cart"><Button variant = "ghost" radius='full'><img src = {cartIcon} className = "h-auto w-7"/>
              <Badge bg = "danger">{cartCount}</Badge></Button></RouterLink></Nav.Link>
              <Nav.Link><Button variant = "ghost" radius='full'><img src = {wishlistIcon} className = "h-auto w-7"/>
              <Badge bg = "danger">{wishlistCount}</Badge></Button></Nav.Link>
              </Flex>}
            <Form className={`d-flex ${isMobile ? `w-[85vw]` : `w-[30vw]` }`}>
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" onChange={(event) => {
                setKeyword(event.target.value);
              }}/>
              <Button size="3" variant="outline" onClick = {searchHandler}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;