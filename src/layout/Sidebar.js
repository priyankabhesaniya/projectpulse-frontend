import React from 'react';
import { List, ListItem, ListItemText, Drawer, Divider } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  // Define styles for active and inactive states
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      style={{ width: 240 }}
    >
      <div style={{ width: '240px', marginTop: '70px' }}>
        <List>
          <ListItem
            button
            component={NavLink}
            to="/"
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#f0f0f0' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem
            button
            component={NavLink}
            to="/project"
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#f0f0f0' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <ListItemText primary="Project" />
          </ListItem>
          {
            authSelector?.user?.role == 'Admin' && (

          <ListItem
            button
            component={NavLink}
            to="/manager"
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#f0f0f0' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <ListItemText primary="Manager" />
          </ListItem>
            )
          }
          {
            authSelector?.user?.role == 'Admin' &&
            (

          <ListItem
            button
            component={NavLink}
            to="/employee"
            style={({ isActive }) => ({
              ...linkStyle,
              backgroundColor: isActive ? '#f0f0f0' : 'transparent',
              fontWeight: isActive ? 'bold' : 'normal',
            })}
          >
            <ListItemText primary="Employee" />
          </ListItem>
            )
          }

          <Divider />
          {/* Add more items here */}
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
