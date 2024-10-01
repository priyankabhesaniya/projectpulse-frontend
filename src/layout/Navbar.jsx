import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box,Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import StarIcon from '@mui/icons-material/Star';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux';
import {  Modal } from '@mui/material';
import { resetAuthData } from '../store/slices/authUser/authUserSlice';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationModal from '../components/NotificationModal';
import { updateCount } from '../store/slices/notification/notificationSlice';
const Navbar = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  const unreadCount = useSelector((state) => state.projectpulse?.notificationSlice);
  console.log("🚀 ~ Navbar ~ unreadCount:", unreadCount)
  const {user}=authSelector
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [starredAnchorEl, setStarredAnchorEl] = useState(null);
  const [profile, setProfile] = useState(false);
  const [recentAnchorEl, setRecentAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    dispatch(updateCount(0));
    setOpenModal(false)};
  // Handlers for Starred dropdown
  const handleStarredMenuClick = (event) => {
    setStarredAnchorEl(event.currentTarget);
  };

  const handleStarredMenuClose = () => {
    setStarredAnchorEl(null);
  };

  // Handlers for Recent dropdown
  const handleRecentMenuClick = (event) => {
    setRecentAnchorEl(event.currentTarget);
  };

  const handleRecentMenuClose = () => {
    setRecentAnchorEl(null);
  };


  const handleLogout = () => {
    localStorage.clear()
    dispatch(resetAuthData())
    setTimeout(() => {
      navigate('login')

    }, 2000);
  };
const handleClose = ()=>{
  setProfile(false)
}
  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>

          <Typography variant="h6" style={{ flexGrow: 0.1 }}>
            <div className="fancy-text">
              Project<span className="highlight">Pulse</span>
            </div>
          </Typography>

          {/* Starred Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <IconButton
              aria-controls="starred-menu"
              aria-haspopup="true"
              onClick={handleStarredMenuClick}
              color="inherit"
            >
              <StarIcon />
              <span style={{ marginLeft: '4px' }}>Starred</span>
            </IconButton>
            <Menu
              id="starred-menu"
              anchorEl={starredAnchorEl}
              keepMounted
              open={Boolean(starredAnchorEl)}
              onClose={handleStarredMenuClose}
            >
              <MenuItem onClick={handleStarredMenuClose}>Starred Item 1</MenuItem>
              <MenuItem onClick={handleStarredMenuClose}>Starred Item 2</MenuItem>
              <MenuItem onClick={handleStarredMenuClose}>Starred Item 3</MenuItem>
            </Menu>
          </div>
          {/* Recent Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
          <IconButton
        aria-controls="recent-menu"
        aria-haspopup="true"
        onClick={handleRecentMenuClick}
        color="inherit"
      >
        <AccessTimeIcon />
        <span style={{ marginLeft: '4px' }}>Recents</span>
      </IconButton>
      <Menu
        id="recent-menu"
        anchorEl={recentAnchorEl}
        keepMounted
        open={Boolean(recentAnchorEl)}
        onClose={handleRecentMenuClose}
      >
        <MenuItem onClick={handleRecentMenuClose}>Recent Item 1</MenuItem>
        <MenuItem onClick={handleRecentMenuClose}>Recent Item 2</MenuItem>
        <MenuItem onClick={handleRecentMenuClose}>Recent Item 3</MenuItem>
      </Menu>
          </div>


        </div>

        {/* Logout Button with Custom Style */}
        <div>
        <IconButton color="inherit" onClick={handleOpenModal}>
        {/* <Badge 
        badgeContent={unreadCount?.count}
         color="error"> 
        </Badge> */}
          <NotificationsIcon />
      </IconButton>

          <IconButton color="inherit" style={{ marginLeft: '16px' }} onClick={()=>setProfile(true)}>
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
      <Modal
        open={profile}
        onClose={handleClose}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px'
          }}
        >
          <Typography variant="h6" id="user-profile-modal">
            User Profile
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Name:</strong> {user.name}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Phone:</strong> {user.phone}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            <strong>Role:</strong> {user.role}
          </Typography>
        </Box>
      </Modal>
      
      <NotificationModal open={openModal} handleClose={handleCloseModal} />
     
    </AppBar>
  );
};

export default Navbar;
