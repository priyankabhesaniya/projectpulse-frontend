import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, LinearProgress, Divider } from '@mui/material';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { getOneProject } from '../api/Project';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ProjectDashboard = () => {
    const {id} = useParams()
    const authSelector = useSelector(
        (state) => state.projectpulse.authUserReducer
      );
    const [project,setProject] = useState([])
 
  const fetchTasks = async () => {
    // setIsLoading(true);
    try {
      const res = await getOneProject(id, authSelector?.access_token);
      setProject(res);
    } catch (error) {
      console.error("Error fetching tasks:", error?.message);
    } finally {
    //   setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [id]);
  const taskStatuses = project?.task?.reduce(
    (acc, task) => {
      acc[task.status] += 1;
      return acc;
    },
    { Pending: 0, Completed: 0, 'In Progress': 0 }
  );


  const pieData = {
    labels: ['Pending', 'Completed', 'In Progress'],
    datasets: [
      {
        label: 'Tasks by Status',
        data: [
          taskStatuses?.Pending || 0, 
          taskStatuses?.Completed || 0, 
          taskStatuses?.['In Progress'] || 0
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      }
    ]
  };
  


  const assigneeTasks = project?.task?.reduce((acc, task) => {
    acc[task.assigned_to.name] = (acc[task.assigned_to.name] || 0) + 1;
    return acc;
  }, {});

  const barData = {
   labels: assigneeTasks ? Object.keys(assigneeTasks) : [],
   datasets: [
    {
      label: 'Tasks by Assignee',
      data: assigneeTasks ? Object.values(assigneeTasks) : [],  // Check if assigneeTasks exists
      backgroundColor: '#36A2EB'
    }
  ]
  };

 
  const completedTasks = taskStatuses?.Completed;
  const totalTasks = project?.task?.length;
  const completionRate = Math?.round((completedTasks / totalTasks) * 100);


  const startDate = new Date(project.start_date);
  const endDate = new Date(project.deadline_date);
  const currentDate = new Date();
  const timeElapsed = Math.round(((currentDate - startDate) / (endDate - startDate)) * 100);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Project Dashboard: {project.name}
      </Typography>

     
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Project Overview</Typography>
        <Divider sx={{ marginBottom: '15px' }} />
        <Typography variant="body1"><strong>About:</strong> {project?.about}</Typography>
        <Typography variant="body1"><strong>Manager:</strong> {project?.manager?.name}</Typography>
        <Typography variant="body1"><strong>Team Members:</strong> {project?.employe?.map(emp => emp.name).join(', ')}</Typography>
        <Typography variant="body1"><strong>Start Date:</strong> {startDate?.toLocaleDateString()}</Typography>
        <Typography variant="body1"><strong>End Date:</strong> {endDate?.toLocaleDateString()}</Typography>
      </Paper>

   
      <Paper elevation={3} sx={{ padding: '20px', marginBottom: '20px' }}>
        <Typography variant="h6">Project Progress</Typography>
        <Divider sx={{ marginBottom: '15px' }} />
        <Typography variant="body1">Task Completion: {completionRate}%</Typography>
        <LinearProgress variant="determinate" value={completionRate} sx={{ marginBottom: '10px' }} />
        <Typography variant="body1">Time Elapsed: {timeElapsed}%</Typography>
        <LinearProgress variant="determinate" value={timeElapsed} sx={{ marginBottom: '10px' }} />
      </Paper>

      <Grid container spacing={3}>
    
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Task Status Breakdown</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>

   
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Tasks by Assignee</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectDashboard;
