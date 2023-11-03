import useGeneral from '../store/general';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Button } from '@radix-ui/themes';
import useAuth from '../store/auth';
import { Link as RouterLink } from 'react-router-dom';
import useError from '../store/error';
import logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Link = styled(RouterLink)`
color: black;
text-decoration: none;
`;

const NavigationBar = () => {
  const isMobile = useGeneral((state) => state.isMobile);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');
  const base = useAuth((state) => state.base);
  const setShowError = useError((state) => state.setShowError);
  const setError = useError((state) => state.setError);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const response = await fetch(`${base}/user/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `"Bearer ${token}"`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token }),
      });
      if (response.status === 200) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        navigate('/home');
        setError('Logged out successfully');
        setShowError(true);
      } else {
        setError('An error occurred. Please try again later.');
        setShowError(true);
      }

      
    } catch (error) {
      setError('An error occurred. Please try again later.');
      setShowError(true);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src= {logo} className={`${isMobile ? 'w-[30vw]' : 'w-[10vw]'}`} />
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
                  <NavDropdown.Item><Link to='/login'>Login</Link></NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item><Link to='/signup'>Register</Link></NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            <Form className={`d-flex ${isMobile ? `w-[85vw]` : `w-[30vw]` }`}>
              <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
              <Button size="3" variant="outline">
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
