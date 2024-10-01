// ProtectedNode.js
import React from 'react';
import { Grid } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import RoutesComponent from './RoutesComponent'; // Assuming this is your routing component

const ProtectedNode = ({ authSelector }) => {
  return (
    <Grid container sx={{pb:0}}>
    

      {/* Fixed Sidebar */}
      <Grid item xs={2} style={{ position: "fixed", top: 64, height: "100vh", overflowY: "auto" }}>
        <Sidebar />
      </Grid>

      {/* Main Content Area */}
      <Grid item xs={10} style={{ marginLeft: 240, paddingTop: 64, padding: 20,marginTop:100,paddingBottom:0 }}>
        <RoutesComponent authSelector={authSelector} />
      </Grid>
    </Grid>
  );
};

export default ProtectedNode;
