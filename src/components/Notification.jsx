import React, { useState, useEffect } from 'react';
import { getAllProject } from '../api/Project';
import { useSelector,useDispatch } from 'react-redux';
import { updateCount,incrementCount } from '../store/slices/notification/notificationSlice';
const NotificationSystem = () => {

// const [notifications, setNotifications] = useState([]);
// const [tasks, setTasks] = useState([]);

// const authSelector = useSelector((state) => state.projectpulse.authUserReducer);
// const loggedInUserId = authSelector?.user?.id; // Use the logged-in user's ID
// const accessToken = authSelector?.access_token; // Get access token from auth state

// useEffect(() => {
//   // Function to fetch project tasks from the server
//   const fetchTasks = async () => {
//     try {
//       // Fetch all projects and their tasks using the user's access token
//       const response = await getAllProject({}, accessToken);
      
//       // Extract tasks assigned specifically to the logged-in user
//       const userTasks = response?.reduce((acc, project) => {
//         const assignedTasks = project?.task?.filter(
//           (task) => task?.assigned_to?.id === loggedInUserId
//         );
//         return acc.concat(assignedTasks);
//       }, []);

//       setTasks(userTasks); // Set only tasks assigned to the logged-in user
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   };

//   if (loggedInUserId) {
//     fetchTasks();

//     // Polling every 10 seconds to check for task updates
//     const interval = setInterval(() => {
//       fetchTasks();
//     }, 10000);

//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }
// }, [loggedInUserId, accessToken]);

// useEffect(() => {
//   // Function to generate notifications for tasks assigned to the logged-in user
//   const generateNotifications = () => {
//     const newNotifications = [];

//     tasks?.forEach((task) => {
//       // Generate notifications based on task status
//       if (task.status === 'Pending') {
//         newNotifications.push(`You have a new task assigned: ${task.title}`);
//       } else if (task.status === 'In Progress') {
//         newNotifications.push(`Task "${task.title}" is now in progress`);
//       } else if (task.status === 'Completed') {
//         newNotifications.push(`Task "${task.title}" has been completed`);
//       }
//     });

//     setNotifications(newNotifications); // Set new notifications
//   };

//   generateNotifications();
// }, [tasks]);
const [notifications, setNotifications] = useState([]);
const [tasks, setTasks] = useState([]);

const dispatch = useDispatch(); // Access dispatch function
const authSelector = useSelector((state) => state.projectpulse.authUserReducer);
const unreadCount = useSelector((state) => state?.projectpulse.notificationSlice?.count); // Access the unread count from the slice
const loggedInUserId = authSelector?.user?.id; // Use the logged-in user's ID
const accessToken = authSelector?.access_token; // Get access token from auth state

useEffect(() => {
  // Function to fetch project tasks from the server
  const fetchTasks = async () => {
    try {
      const response = await getAllProject({}, accessToken);
      const userTasks = response?.reduce((acc, project) => {
        const assignedTasks = project?.task?.filter(
          (task) => task?.assigned_to?.id === loggedInUserId
        );
        return acc.concat(assignedTasks);
      }, []);

      setTasks(userTasks); // Set only tasks assigned to the logged-in user
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  if (loggedInUserId) {
    fetchTasks();

    // Polling every 10 seconds to check for task updates
    const interval = setInterval(() => {
      fetchTasks();
    }, 10000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }
}, [loggedInUserId, accessToken]);

useEffect(() => {
  // Function to generate notifications for tasks assigned to the logged-in user
  const generateNotifications = () => {
    const newNotifications = [];

    tasks?.forEach((task) => {
      if (task.status === 'Pending') {
        newNotifications.push(`You have a new task assigned: ${task.title}`);
      } else if (task.status === 'In Progress') {
        newNotifications.push(`Task "${task.title}" is now in progress`);
      } else if (task.status === 'Completed') {
        newNotifications.push(`Task "${task.title}" has been completed`);
      }
    });

    // Update notifications and dispatch increment count for each new notification
    if (newNotifications.length > 0) {
      setNotifications(newNotifications); // Set new notifications
    //   dispatch(incrementCount(newNotifications.length)); // Increment count by the number of new notifications
    }
  };

  generateNotifications();
}, [tasks, dispatch]);


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
    </>
  );
};

// CSS styles for the notifications
const styles = {
  container: {
    padding: '20px',
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

export default NotificationSystem;
