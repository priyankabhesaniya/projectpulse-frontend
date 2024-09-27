// projects
import axios from 'axios'; 

export const createProject = async (projectData) => {
    try {
        const response = await axios.post('projects', projectData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};
export const updateProject = async (id,projectData) => {
  try {
      const response = await axios.patch('projects/'+id, projectData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }); // Use the Axios instance
      return response.data; // Return response data if needed
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating user');
  }
};
export const deleteProject = async (id) => {
  try {
      const response = await axios.delete('projects/'+id, {
          headers: {
            'Content-Type': 'application/json'
          }
        }); // Use the Axios instance
      return response.data; // Return response data if needed
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating user');
  }
};
export const getAllProject = async (param) => {
    const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
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
      .get("projects" + filter, headers)
      .then((res) => {
        return res?.data;
      })
      .catch((error) => Promise.reject(error?.response?.data));
  };

  export const getOneProject = async (id) => {
    try {
        const response = await axios.get('projects/'+id, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};