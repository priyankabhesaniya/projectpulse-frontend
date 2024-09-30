import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import { resetAuthData } from '../store/slices/authUser/authUserSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleLogout = () => {
    localStorage.clear()
    dispatch(resetAuthData())
    setTimeout(() => {
      navigate('login')
      
    }, 2000);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
       <div style={{display:'flex'}}>

        <Typography variant="h6" style={{ flexGrow: 0.1 }}>
          <div className="fancy-text">
            Project<span className="highlight">Pulse</span>
          </div>
        </Typography>

        {/* Starred Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center',marginLeft:'20px'}}>
          <IconButton
            aria-controls="starred-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <StarIcon />
            <span style={{ marginLeft: '4px' }}>Starred</span> {/* Text next to star icon */}
          </IconButton>
          <Menu
            id="starred-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Starred Item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Starred Item 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Starred Item 3</MenuItem>
          </Menu>
        </div>
  {/* Starred Dropdown */}
  <div style={{ display: 'flex', alignItems: 'center',marginLeft:'20px'}}>
  <IconButton
            aria-controls="recent-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <AccessTimeIcon />
            <span style={{ marginLeft: '4px' }}>Recents</span> {/* Text next to star icon */}
          </IconButton>
          <Menu
            id="recent-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Recent Item 1</MenuItem>
            <MenuItem onClick={handleMenuClose}>Recent Item 2</MenuItem>
            <MenuItem onClick={handleMenuClose}>Recent Item 3</MenuItem>
          </Menu>
        </div>
       

       </div>

        {/* Logout Button with Custom Style */}
      <div>
      <IconButton color="inherit" style={{ marginLeft: '16px' }}>
          <AccountCircle />
        </IconButton>
      <Button
          sx={{
            backgroundColor: '#ff5733', // Button background color
            color: '#ffffff', // Text color
            borderRadius: '8px', // Rounded corners
            padding: '8px 16px', // Padding
            marginLeft: '16px', // Spacing from other elements
            transition: 'background-color 0.3s ease', // Transition effect
            '&:hover': {
              backgroundColor: '#ff8566', // Change background color on hover
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>

       
      </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
