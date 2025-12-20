import React, { useState, useEffect } from 'react';
import './App.css';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box, Tooltip } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import MostPopular from './MostPopular.jsx';
import HeroSection from './HeroSection';
import NewProducts from './NewProducts';
import Categories from './Categories';
import NewCollections from './NewCollections.jsx';
import Sales from './Sales.jsx';
import Footer from './Footer.jsx';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import DrawerComponent from './drawerComponent.jsx';
import ProductDetail from './ProductDetail.jsx';
import FavoriteIcon from '@mui/icons-material/Favorite';


import Woman from './Woman.jsx';
import Man from './Man.jsx';
import Dress from './Dress.jsx';
import Skirt from "./Skirt.jsx";
import WomanShoes from './WomanShoes.jsx';
import Blouse from './Blouse.jsx';
import WomanPants from './WomanPants.jsx';
import WomanShorts from './WomanShorts.jsx';
import WomanOuterwear from './WomanOuterwear.jsx';
import Bag from './Bag.jsx';
import WomanAccesories from './WomanAccesories.jsx';


import ManTshirt from './ManTshirt.jsx';
import ManPants from './ManPants.jsx';
import ManOuterWear from './ManOuterWear.jsx';
import ManShoes from './ManShoes.jsx';
import ManAccessories from './ManAccessories.jsx';

import Favorites from './Favorites';
import Cart from './Cart';
import RegisterPage from './RegisterPage.jsx';
import LoginPage from './LoginPage.jsx';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = (open) => () => setIsDrawerOpen(open);
  const navigate = useNavigate();
  const location = useLocation();


  const [currentUser, setCurrentUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(null);
    }
  }, [location]);


  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    handleMenuClose();
    navigate('/');
  };


  const hideAppBarRoutes = ["/loginPage", "/registerPage"];
  const showAppBar = !hideAppBarRoutes.includes(location.pathname);

  const pageTitles = {
    // --- Genel Sayfalar ---
    "/": "Home",
    "/NewCollections": "New Collections",
    "/woman": "Woman",
    "/man": "Man",
    "/sales": "On Sale",
    "/favorites": "Favorites",
    "/cart": "Shopping Bag",

    // --- Kadın Kategorileri (Woman) ---
    "/category/blouse": "Woman's Blouses",
    "/category/dress": "Woman's Dresses",
    "/category/woman-pants": "Woman's Pants",
    "/category/skirt": "Woman's Skirts",
    "/category/woman-shorts": "Woman's Shorts",
    "/category/woman-outerwear": "Woman's Outerwear",
    "/category/bag": "Woman's Bags",
    "/category/woman-shoes": "Woman's Shoes",
    "/category/woman-accesories": "Woman's Accessories", // Rotadaki olası yazım hatasına uyumlu

    // --- Erkek Kategorileri (Man) ---
    "/category/man-tshirt": "Men's Tops",
    "/category/man-pants": "Men's Bottoms",
    "/category/man-outerwear": "Men's Outerwear",
    "/category/man-shoes": "Men's Shoes",
    "/category/man-accessories": "Men's Accessories"
  };

  const currentTitle = pageTitles[location.pathname] || "";

  return (
    <>
      {showAppBar && (
        <AppBar
          position="static"
          sx={{
            backgroundColor: '#E6CCB2',
            color: (theme) => theme.palette.text.primary,
            boxShadow: 'none',
            height: { xs: 56, md: 64 },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon sx={{ color: '#452815', width: 50, height: 50 }} />
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                textAlign: "left",
                paddingRight: "16px",
                fontFamily: "Inter, serif",
                fontWeight: 900,
                letterSpacing: "4px",
                fontSize: "2.05rem",
                color: "#3C1904FF",
                marginLeft: 2,
              }}
            >
              {currentTitle}
            </Typography>

            <FavoriteIcon onClick={() => navigate('/favorites')} sx={{ color: '#73411F', width: 33, height: 33, mr: 3, mt: 0.3, cursor: 'pointer' }} />
            <ShoppingBagOutlinedIcon onClick={() => navigate('/cart')} sx={{ color: '#73411F', width: 33, height: 33, cursor: 'pointer' }} />

            {currentUser ? (
              <Box sx={{ marginLeft: 3, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Account Settings">
                  <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                    <PersonIcon sx={{ color: '#73411F', width: 35, height: 35 }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  {/* Menü İçeriği */}
                  <Box sx={{ px: 2, py: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#5D3A29' }}>
                      Hello, {currentUser.fullName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {currentUser.email}
                    </Typography>
                  </Box>
                  <MenuItem onClick={handleLogout} sx={{ color: '#C75000FF' }}>
                    <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <PersonIcon
                onClick={() => navigate('/loginPage')}
                sx={{ color: '#73411F', width: 35, height: 35, marginLeft: 3, cursor: 'pointer' }}
              />
            )}

          </Toolbar>
        </AppBar>
      )}

      <Routes>
        <Route path="/" element={<><HeroSection /><MostPopular /><Categories /><NewProducts /><Footer /></>} />

        <Route path="/woman" element={<Woman />} />
        <Route path="/man" element={<Man />} />
        <Route path="/NewCollections" element={<NewCollections />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/category/dress" element={<Dress />} />
        <Route path="/category/woman-shoes" element={<WomanShoes />} />
        <Route path="/category/skirt" element={<Skirt />} />
        <Route path="/category/blouse" element={<Blouse />} />
        <Route path="/category/woman-pants" element={<WomanPants />} />
        <Route path="/category/woman-shorts" element={<WomanShorts />} />
        <Route path="/category/woman-outerwear" element={<WomanOuterwear />} />
        <Route path="/category/bag" element={<Bag />} />
        <Route path="/category/woman-accesories" element={<WomanAccesories />} />
        <Route path="/category/man-tshirt" element={<ManTshirt />} />
        <Route path="/category/man-pants" element={<ManPants />} />
        <Route path="/category/man-outerwear" element={<ManOuterWear />} />
        <Route path="/category/man-shoes" element={<ManShoes />} />
        <Route path="/category/man-accessories" element={<ManAccessories />} />

        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
      </Routes>

      <DrawerComponent isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}