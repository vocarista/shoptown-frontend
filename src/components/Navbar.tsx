import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LargeLogo from '../assets/logo-large.png';
import shoppingCart from '../assets/shopping-cart.png'
import wishListIcon from '../assets/wishlist.png';
import userIcon from '../assets/user.png';
import useUser from '../store/user';
import useGeneral from '../store/general';
import { Link } from 'react-router-dom';

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const cart = useUser((state: any) => state.cart);
  const wishlist = useUser((state: any) => state.wishlist);
  const [wishlistItemCount, setWishlistItemCount] = useState(0);
  const toggleWishlist = useGeneral((state: any) => state.toggleWishlist);
  const isLoggedIn = useUser((state: any) => state.isLoggedIn);
  const setIsLoggedIn = useUser((state: any) => state.setIsLoggedIn);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setVisible(currentScrollPos < prevScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [prevScrollPos]);

    
    const navbarStyles: React.CSSProperties = {
        visibility: visible? 'visible' : 'hidden',
        opacity: visible? 1 : 0,
        transition: 'visibility 0s, opacity 0.5s ease-in-out',
    };

  useEffect(() => {
    setCartItemCount(cart.length);
    setWishlistItemCount(wishlist.length);
  }, [cart])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" style={navbarStyles}>
      <Container maxWidth="xl"  className = {`bg-zinc-900`} >
        <Toolbar disableGutters className = {`p-0`}>
       
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <Link to = '/home'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{`Home`}</Typography>
                    </MenuItem>
                </Link>
                <a href = 'https://vocarista.com' target = "_blank">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{`About`}</Typography>
                    </MenuItem>
                </a>
            </Menu>
          </Box>
          <img src = { LargeLogo } className = { `w-[100px] h-[60px] mix-blend-lighten` } />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Link to = '/home'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{`Home`}</Typography>
                    </MenuItem>
                </Link>
                <a href = 'https://vocarista.com' target = "_blank">
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{`About`}</Typography>
                    </MenuItem>
                </a>
          </Box>

          <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
              sx={{ mr: 0 }}
              onClick = { toggleWishlist }
            >
              <img src = { wishListIcon } className = { `invert w-[40px] h-[40px]` }/>
              <div className="bubble">{ wishlistItemCount }</div>
            </IconButton>

          <Link to = '/cart'>
            <IconButton
              size="large"
              aria-label="cart"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <img src = { shoppingCart } className = { `invert w-[40px] h-[40px]` }/>
              <div className="bubble">{ cartItemCount }</div>
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <img src = { userIcon } className = { `invert w-[40px] h-[40px]` }/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <Link to = '/profile'>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{`Profile`}</Typography>
                    </MenuItem>
                </Link>
                <Link to = '/orders'>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{`My Orders`}</Typography>
                    </MenuItem>
                </Link>
                <MenuItem onClick={() => {
                    setIsLoggedIn()
                    handleCloseUserMenu()
                }}>
                  <Typography textAlign="center">{`Logout`}</Typography>
                </MenuItem>

            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;