// employee
import axios from 'axios'; 

export const createEmployee = async (userData) => {
    try {
        const response = await axios.post('employee', userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};
export const getAllEmployee = async (param) => {
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
      .get("employee" + filter, headers)
      .then((res) => {
        return res?.data;
      })
      .catch((error) => Promise.reject(error?.response?.data));
  };

  export const getOneEmployee = async (id) => {
    try {
        const response = await axios.get('employee/'+id, {
            headers: {
              'Content-Type': 'application/json'
            }
          }); // Use the Axios instance
        return response.data; // Return response data if needed
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error creating user');
    }
};