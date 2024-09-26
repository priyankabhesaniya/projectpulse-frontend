import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update this to your JSON server's URL

// Function to get all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data; // Return the list of projects
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; // Propagate the error
  }
};

// Function to get all tasks
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`);
    return response.data; // Return the list of tasks
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error; // Propagate the error
  }
};

// Function to get notifications
export const getNotifications = async () => {
  try {
    const response = await axios.get(`${API_URL}/notifications`);
    return response.data; // Return the list of notifications
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Propagate the error
  }
};

// Function to get user statistics
export const getUserStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/userStats`);
    return response.data; // Return the user statistics
  } catch (error) {
    console.error('Error fetching user stats:', error);
    throw error; // Propagate the error
  }
};
