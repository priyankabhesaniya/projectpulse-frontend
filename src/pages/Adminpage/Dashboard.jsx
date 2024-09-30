import React, { useEffect, useState } from 'react';
import { getProjects, getTasks, getNotifications } from '../../api/Dashboard'; // Adjust the path as needed
// import Charts from './Charts'; // Your chart component
import NotificationList from './NotificationList'; // Your notification list component
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import AddProjectForm from '../../components/AddProjectForm';
import { useSelector } from 'react-redux';
import { getManagersPair } from '../../api/Manager';
import { getEmployeePair } from '../../api/Employe';
const Dashboard = () => {
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer)
  const [projects, setProjects] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [manager, setManager] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false); // State to control modal visibility
  
  useEffect(() => {
    const fetchData = async () => {
      const projectsData = await getProjects(authSelector?.access_token);
      setProjects(projectsData)
      const managerData = await getManagersPair(authSelector?.access_token)
      setManager(managerData)
      const employeeData = await getEmployeePair(authSelector?.access_token)
      setEmployee(employeeData)
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
    <div className="dashboard" style={{ padding: '0 20px' }}>
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
              <Typography variant="h6">Total Projects</Typography>
              <Typography variant="h4">{projects?.length ? projects?.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Managers</Typography>
              <Typography variant="h4">{manager?.length ? manager?.length : 0}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Employees</Typography>
              <Typography variant="h4">{employee?.length ? employee?.length : 0}</Typography>
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
      <AddProjectForm
        open={open}
        setOpen={setOpen}
        mode={"Add"}
        projectId={null}
        // setProjectId={setProjectId}
        // fetchProjects={fetchProjects}
      />
    </div>
  );
};

export default Dashboard;
