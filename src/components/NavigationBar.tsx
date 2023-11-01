import { useState, useRef, useEffect } from 'react';
import useGeneral from '../store/general';
import logo from '../assets/logo.png';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Button } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import useAuth from '../store/auth';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Toast from '@radix-ui/react-toast';

const NavigationBar = () => {
  const isMobile = useGeneral((state) => state.isMobile);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(JSON.parse(localStorage.getItem('isLoggedIn') || 'false'));
  const navigate = useNavigate();
  const base = useAuth((state) => state.base);
  const token = useAuth((state) => state.token);
  const setToken = useAuth((state) => state.setToken);
  
  const [showError, setShowError] = useState(false);

  const ErrorToast = () => {
    const eventDateRef = useRef(new Date());
    const timerRef = useRef(0);
    useEffect(() => {
      return () => clearTimeout(timerRef.current);
    }, []);
    return (
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="bg-white opacity-95 rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
          open={showError}
          onOpenChange={setShowError}
        >
          <Toast.Title className="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
            Error
          </Toast.Title>
          <Toast.Description asChild>
            <time
              className="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
              dateTime={eventDateRef.current.toISOString()}
            >
              Can't log out. Please try again.
            </time>
          </Toast.Description>
          <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
            <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
              OK
            </button>
          </Toast.Action>
        </Toast.Root>
        <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
      </Toast.Provider>
    );
  };

  const logoutHandler = async () => {
    axios.post(`${base}/user/auth/logout`, {
      token: token
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if (response.status === 200) {
        setToken('');
        localStorage.removeItem('token');
        localStorage.setItem('isLoggedIn', JSON.stringify(false));
        setIsLoggedIn(false);
        navigate('/login');
      } else {
        console.error('Unexpected response:', response);
        setShowError(true);
      }
    }).catch(err => {
      console.error(err);
      setShowError(true);
    })
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src={logo} className={`${isMobile ? 'w-[30vw]' : 'w-[10vw]'}`} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '300px' }} navbarScroll>
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="https://github.com/vocarista/shoptown-frontend" target="_blank">
                Github
              </Nav.Link>
              {isLoggedIn ? (
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/orders">Orders</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutHandler}>
                    <span className="text-red-600">Logout</span>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown title="Account" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick = {() => {
                    navigate('/login');
                  }}>Login</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick = {() => {
                    navigate('/signup');
                  }}>Signup</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Form className="d-flex">
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button size="3" variant="outline">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ErrorToast />
    </>
  );
};

export default NavigationBar;
