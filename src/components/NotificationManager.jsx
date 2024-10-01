import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProject } from '../api/Project';
import { updateCount } from '../store/slices/notification/notificationSlice';
import { useLocation } from 'react-router-dom';

const NotificationManager = () => {
  const [notifications, setNotifications] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
const location = useLocation()
  const dispatch = useDispatch();
  const authSelector = useSelector((state) => state.projectpulse.authUserReducer);
  const loggedInUserId = authSelector?.user?.id;
  const userRole = authSelector?.user?.role; // Assume role is in auth state
  const accessToken = authSelector?.access_token;

  useEffect(() => {
    const fetchTasksAndProjects = async () => {
      try {
        // const tasksResponse = await getAllTasks({}, accessToken);
        const projectsResponse = await getAllProject({}, accessToken);
        console.log("🚀 ~ fetchTasksAndProjects ~ projectsResponse:", projectsResponse)
        const allTasks = projectsResponse?.flatMap(project => project.task);
        console.log("🚀 ~ fetchTasksAndProjects ~ allTasks:", allTasks)
        setTasks(allTasks); // Store fetched tasks
        setProjects(projectsResponse); // Store fetched projects
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (loggedInUserId) {
      fetchTasksAndProjects();
    }
  }, [loggedInUserId, accessToken]);

  useEffect(() => {
    const generateNotifications = () => {
      const newNotifications = [];

      // Generate task notifications for Employees
      if (userRole === 'Employee') {
        tasks?.forEach((task) => {
          if (task.assigned_to.id === loggedInUserId) {
            if (task.status === 'Pending') {
              newNotifications.push(`You have a new task assigned: ${task.title}`);
            } else if (task.status === 'In Progress') {
              newNotifications.push(`Task "${task.title}" is now in progress`);
            } else if (task.status === 'Completed') {
              newNotifications.push(`Task "${task.title}" has been completed`);
            }
          }
        });
        projects?.forEach((project) => {
            if (project.employees?.some(emp => emp.id === loggedInUserId)) {
              if (project.status === 'Pending') {
                newNotifications.push(`Project "${project.name}" you are part of is pending`);
              } else if (project.status === 'In Progress') {
                newNotifications.push(`Project "${project.name}" you are part of is in progress`);
              } else if (project.status === 'Completed') {
                newNotifications.push(`Project "${project.name}" you are part of has been completed`);
              }
            }
          });
      }

      // Generate project notifications for Managers
      if (userRole === 'Manager') {
        projects?.forEach((project) => {
          if (project.manager.id === loggedInUserId) {
            if (project.status === 'Pending') {
              newNotifications.push(`New project "${project.name}" assigned to you is pending`);
            } else if (project.status === 'On Going') {
              newNotifications.push(`Project "${project.name}" assigned to you is in progress`);
            } else if (project.status === 'Completed') {
              newNotifications.push(`Project "${project.name}" assigned to you has been completed`);
            }

            // Check related tasks for status changes
            project.task.forEach((task) => {
              if (task.status === 'Pending') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" is pending`);
              } else if (task.status === 'In Progress') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" is now in progress`);
              } else if (task.status === 'Completed') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" has been completed`);
              }
            });
          }
        });
      }

      // Generate notifications for Admin
      if (userRole === 'Admin') {
        projects?.forEach((project) => {
          if (project.created_by.id === loggedInUserId) {
            if (project.status === 'Pending') {
              newNotifications.push(`Project "${project.name}" created by you is pending`);
            } else if (project.status === 'On Going') {
              newNotifications.push(`Project "${project.name}" created by you is in progress`);
            } else if (project.status === 'Completed') {
              newNotifications.push(`Project "${project.name}" created by you has been completed`);
            }

            // Check tasks related to the project
            project.task.forEach((task) => {
              if (task.status === 'Pending') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" is pending `);
              } else if (task.status === 'In Progress') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" is now in progress`);
              } else if (task.status === 'Completed') {
                newNotifications.push(`Task "${task.title}" in your project "${project.name}" has been completed`);
              }
            });
          }
        });
      }

      // Update notifications and dispatch count
      if (newNotifications.length > 0) {
        setNotifications(newNotifications);
        console.log('thiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii');
        dispatch(updateCount(newNotifications.length)); // Set count based on new notifications
      } else {
        dispatch(updateCount(0)); // Reset count if no notifications
      }
    };

    generateNotifications();
  }, [tasks, projects, userRole, dispatch, loggedInUserId,location.pathname]);

  return (
    <>
    <div style={styles.container}>
       
      <div style={styles.notificationBox}>
        {notifications?.length > 0 ? (
          notifications?.map((notification, index) => (
            <div key={index} style={styles.notificationItem}>
              {notification}
            </div>
          ))
        ) : (
          <p style={styles.noNotification}>No new notifications</p>
        )}
      </div>
    </div>
    {/* <div>
      <h2>Notifications </h2>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index}>{notification}</div>
        ))
      ) : (
        <p>No new notifications</p>
      )}
    </div> */}
    </>
    
  );
};

export default NotificationManager;
// CSS styles for the notifications
const styles = {
    container: {
      padding: '5px',
      maxWidth: '400px',
      margin: '0 auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '8px',
    },
    notificationBox: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '10px',
      backgroundColor: '#fff',
    },
    notificationItem: {
      padding: '10px',
      backgroundColor: '#e0f7fa',
      borderRadius: '5px',
      marginBottom: '10px',
      color: '#00695c',
      fontSize: '14px',
    },
    noNotification: {
      textAlign: 'center',
      color: '#999',
      fontSize: '14px',
    },
  };