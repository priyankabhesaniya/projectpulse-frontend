// users
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createEmployee = async (userData) => {
  try {
    const response = await axios.post("users", userData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateEmployee = async (id, userData) => {
  try {
    const response = await axios.patch("users/" + id, userData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteEmployee = async (id) => {
  try {
    const response = await axios.delete("users/" + id, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllEmployee = async (param) => {
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
    .get("users" + filter, headers)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneEmployee = async (id) => {
  try {
    const response = await axios.get("users/" + id,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};

export const getEmployeePair = async (id) => {
  try {
    const response = await axios.get("users?role=Employee", headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
