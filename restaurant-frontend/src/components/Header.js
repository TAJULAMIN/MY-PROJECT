import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, IconButton, Typography, AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import BookIcon from '@mui/icons-material/Book';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import logo from '../assets/logo.jpg';
import { useAuth } from "../Context/AuthContext";  // ✅ use global auth

// --- styled components (same as before) ---
const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: 240,
    '& .MuiDrawer-paper': {
        width: 240,
        backgroundColor: '#222',
        color: 'white',
        padding: theme.spacing(2),
        borderRadius: '16px 0 0 16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
    color: '#FF5722',
    '&:hover': {
        backgroundColor: '#555',
        color: '#FFEB3B',
    },
    '& .MuiListItemText-primary': {
        fontSize: '1.1rem',
        fontWeight: 500,
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    color: '#FFA500',
    textDecoration: 'none',
    fontSize: '18px',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(4), 
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: '#FFEB3B',
        color: '#222',
        transform: 'scaleY(0.9)'
    },
}));
     const StyledButton = styled(Button)(({ theme }) => ({
    color: "#FFA500",
    textTransform: "none",
    fontSize: "18px",
    padding: theme.spacing(1),
    marginLeft: theme.spacing(4),
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor: "#FFEB3B",
      color: "#222",
      transform: "scaleY(0.9)",
    },
  }));
  

const Header = () => {
    const [open, setOpen] = useState(false); 
    const { isAuthenticated, logout } = useAuth(); // ✅ comes from context
   


    const handleDrawerToggle = () => setOpen(!open);

    return (
        <>
            <AppBar position="static" sx={{ background: 'linear-gradient(45deg, #0D0D0D, #333)', height: 64 }}>
                <Toolbar>
                    <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={logo} alt='logo' style={{ height: "2.5rem", borderRadius: '50%', marginRight: '0.5rem' }} />
                    </Link>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#f56d18', fontSize: '20px', fontWeight: 700, fontStyle: 'italic' }}>
                        TASTY FOOD
                    </Typography>

                    {/* Always visible */}
                    <StyledLink to="/">Home</StyledLink>
                    <StyledLink to="/menu">Menu</StyledLink>
                    <StyledLink to="/book-table">Book Now</StyledLink>
                    <StyledLink to="/contact">Contact</StyledLink>

                    {/* Conditional Auth links */}
                    {!isAuthenticated ? (
                        <>
                            <StyledLink to="/signin">Sign In</StyledLink>
                            <StyledLink to="/signup">Sign Up</StyledLink>
                        </>
                    ) : (
                         <>
                       
                        
                        <StyledButton component={Link} to="/my-bookings">
                        My Bookings
                      </StyledButton>
                        <StyledButton onClick={logout}>
                        Logout
                      </StyledButton>
                      </>
                      
                    )}

                    <IconButton edge="end" color="inherit" onClick={handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer */}
            <StyledDrawer anchor="right" open={open} onClose={handleDrawerToggle}>
                <List>
                    {[
                        { text: 'Home', icon: <HomeIcon />, path: '/' },
                        { text: 'Menu', icon: <RestaurantMenuIcon />, path: '/menu' },
                        { text: 'Book a Table', icon: <BookIcon />, path: '/book-table' },
                        { text: 'Contact', icon: <ContactMailIcon />, path: '/contact' }
                    ].map(({ text, icon, path }) => (
                        <StyledListItem button component={Link} to={path} onClick={handleDrawerToggle} key={text}>
                            {icon}
                            <ListItemText primary={text} />
                        </StyledListItem>
                    ))}
                </List>
            </StyledDrawer>
        </>
    );
};

export default Header;
