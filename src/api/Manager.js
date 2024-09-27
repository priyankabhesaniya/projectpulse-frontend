// manager
import axios from 'axios'; 

export const createManager = async (userData) => {
    try {
        const response = await axios.post('manager', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};
export const updateManager = async (id,userData) => {
  try {
      const response = await axios.patch('manager/'+id, userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        }); // Use the Axios instance
      return response.data; // Return response data if needed
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating user');
  }
};
export const deleteManager = async (id) => {
  try {
      const response = await axios.delete('manager/'+id, {
          headers: {
            'Content-Type': 'application/json'
          }
        }); // Use the Axios instance
      return response.data; // Return response data if needed
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Error creating user');
  }
};
export const getAllManager = async (param) => {
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
      .get("manager" + filter, headers)
      .then((res) => {
        return res?.data;
      })
      .catch((error) => Promise.reject(error?.response?.data));
  };

  export const getOneManager = async (id) => {
    try {
        const response = await axios.get('manager/'+id, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};