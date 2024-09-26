import React, { useEffect, useState } from 'react';
import { getProjects, getTasks, getNotifications } from '../../api/Dashboard'; // Adjust the path as needed
// import Charts from './Charts'; // Your chart component
import NotificationList from './NotificationList'; // Your notification list component
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddProjectForm from '../../components/AddProjectForm';
const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility
  useEffect(() => {
    const fetchData = async () => {
      // const projectsData = await getProjects();
      // const tasksData = await getTasks();
      // const notificationsData = await getNotifications();

      // setProjects(projectsData);
      // setTasks(tasksData);
      // setNotifications(notificationsData);
    };

    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div className="dashboard" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Overview Section */}
      <Typography variant="h5" gutterBottom>
        Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Projects</Typography>
              <Typography variant="h4">{projects.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Tasks</Typography>
              <Typography variant="h4">{tasks.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Notifications</Typography>
              <Typography variant="h4">{notifications.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions Section */}
      <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>
        Quick Access
      </Typography>
      <div>
        <Button variant="contained" color="primary" style={{ margin: '5px' }} onClick={()=>setOpen(true)}>
          Add Project
        </Button>
        <Button variant="contained" color="secondary" style={{ margin: '5px' }}>
          Add Task
        </Button>
        <Button variant="contained" color="default" style={{ margin: '5px' }}>
          View Notifications
        </Button>
      </div>

      {/* Charts Section */}
      {/* <Charts projects={projects} tasks={tasks} /> */}

      {/* Notifications Section */}
      <div className="notifications" style={{ marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Recent Notifications
        </Typography>
        <NotificationList notifications={notifications} />
      </div>
        {/* Modal for Adding Project */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent>
          <AddProjectForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;
