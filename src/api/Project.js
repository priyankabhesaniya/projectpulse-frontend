// projects
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createProject = async (projectData,token) => {
  try {
    const response = await axios.post("projects", projectData,headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateProject = async (id, projectData,token) => {
  console.log("🚀 ~ updateProject ~ projectData:", projectData)
  try {
    const response = await axios.patch("projects/" + id, projectData, headers(token)); // Use the Axios instance
    console.log("🚀 ~ updateProject ~ response:", response)
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteProject = async (id,token) => {
  try {
    const response = await axios.delete("projects/" + id, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllProject = async (param,token) => {
  console.log(headers,'headers in ptoject ');

  
  let filter =
    "?" +
    (param
      ? Object.keys(param)
          .filter((key) => param[key] !== "")
          .map(function (key) {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(param[key])
            );
          })
          .join("&")
      : "");
  return await axios
    .get("projects" + filter, headers(token))
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneProject = async (id,token) => {
  console.log(headers,'headers in ptoject ');
  
  try {
    const response = await axios.get("projects/" + id,headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};

export const createTaskInProject = async (projectId, newTask,token) => {
  console.log("🚀 ~ createTaskInProject ~ token:", token)
  try {
    // Step 1: Fetch the current project data
    const projectResponse = await axios.get(`projects/${projectId}`,headers(token));
    const project = projectResponse.data;
    console.log("🚀 ~ createTaskInProject ~ projectResponse:", projectResponse)
    console.log("🚀 ~ createTaskInProject ~ project:", project)

    // Step 2: Create a new task with an incremented ID (or generate one as needed)
    const taskId = project?.task?.length ? project?.task?.length + 1 : 1; // Generate new task ID
    const task = {
      id: taskId || 1,
      ...newTask // Spread the task data
    };

    // Step 3: Add the new task to the project's tasks array
    project.task?.push(task);

    // Step 4: Update the project with the new task included
    console.log(project,'befor');
    // await axios.put(`projects/${projectId}`, project,token);
    await updateProject(projectId,{...project,task:project?.task},token)

    console.log('Task created and added to project:', task);
  } catch (error) {
    console.error('Error creating task:', error.message);
  }
};

export const updateTaskInProject = async (projectId, taskId, updatedTaskData,token) => {
  try {
    // Step 1: Fetch the current project data
    const projectResponse = await axios.get(`projects/${projectId}`,headers(token));
    const project = projectResponse.data;

    // Step 2: Find the task to update within the project's tasks array
    const taskIndex = project.task.findIndex(tas => tas.id === taskId);
    
    if (taskIndex === -1) {
      console.error('Task not found');
      return; // Exit if the task does not exist
    }

    // Step 3: Update the task with the new data
    const updatedTask = { ...project.task[taskIndex], ...updatedTaskData };

    // Step 4: Replace the old task with the updated task in the array
    project.task[taskIndex] = updatedTask;

    // Step 5: Update the project with the modified tasks array
    // await axios.put(`projects/${projectId}`, project,headers(token));
    await updateProject(projectId,project,token)

    console.log('Task updated successfully:', updatedTask);
  } catch (error) {
    console.error('Error updating task:', error.message);
  }
};

export const getTasksByProjectId = async (projectId,token) => {
  try {
    // Make a GET request to fetch the project by ID
    const response = await axios.get(`projects/${projectId}`,headers(token));

    // Extract the tasks from the project data
    const project = response.data;
    const tasks = project.task;

    console.log(`Tasks for Project ID ${projectId}:`, tasks);
    return tasks; // Return the tasks
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    return []; // Return an empty array in case of an error
  }
};

export const getOneTask = async (projectId, taskId,token) => {
  console.log("🚀 ~ getOneTask ~ taskId:", taskId)
  console.log("🚀 ~ getOneTask ~ projectId:", projectId)
  try {
    // Get the project data
    const projectResponse = await axios.get(`/projects/${projectId}`,headers(token));

    console.log("🚀 ~ getOneTask ~ projectResponse:", projectResponse)
    const project = projectResponse.data;

    // Find the task in the project
    const task = project.task.find((tas) => {
      return tas.id === taskId
    })

    console.log("🚀 ~ getOneTask ~ task:", task)
    if (task) {
      return task; // Return the task data
    } else {
      throw new Error(`Task with ID ${taskId} not found in Project ${projectId}`);
    }
  } catch (error) {
    console.error('Error fetching task:', error.message);
    throw error; // Rethrow the error for further handling
  }
};


export const deleteTask = async (id,taksId,token) => {
  try {
    const response = await axios.get("projects/" + id, headers(token)); // Use the Axios instance
    console.log("🚀 ~ deleteTask ~ response:", response)
    const task = response?.data?.task
    const updatedTask = task?.filter((item)=>item.id !== taksId)
    console.log("🚀 ~ deleteTask ~ updatedTask:", updatedTask)
    const project = {...response?.data,task:updatedTask}
   const res = await updateProject(id,project,token)
    console.log("🚀 ~ deleteTask ~ res:", res)

    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};