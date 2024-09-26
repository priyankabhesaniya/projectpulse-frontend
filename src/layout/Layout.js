// Layout.js
import React, { Fragment,Suspense } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Grid, CssBaseline } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SettingsIcon from '@mui/icons-material/Settings';
import Loader from '../components/loader/Loader';
import UnauthorizerNode from './Unauthorised';
import ProtectedNode from './ProtectedNode';
import RoutesComponent from './RoutesComponent';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const Layout = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  console.log("🚀 ~ Layout ~ authSelectors:", authSelector)
 
    return (
        <Fragment>
        <CssBaseline />
        {authSelector?.access_token ? (
          <Grid container>
            <Grid item xs={12}>
              <AppBar position="fixed">
              <Navbar/>
              </AppBar>
            </Grid>
            <Grid item xs={2} style={{ position: "fixed", top: 64, height: "100vh", overflowY: "auto" }}>
              <ProtectedNode authSelector={authSelector} />
            </Grid>
            <Grid item xs={10} style={{ marginLeft: 240, paddingTop: 64, padding: 20,marginTop:50 }}>
              {/* Render routed components here */}
              <RoutesComponent />
            </Grid>
          </Grid>
        ) : (
          <Suspense fallback={<Loader />}>
            {/* Render the login page for unauthenticated users */}
            <UnauthorizerNode />
          </Suspense>
        )}
        {/* <Toaster /> */}
      </Fragment>
    );
};

export default Layout;
