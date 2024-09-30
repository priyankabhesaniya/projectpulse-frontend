// users
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createEmployee = async (userData,token) => {
  try {
    const response = await axios.post("users", userData, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateEmployee = async (id, userData,token) => {
  try {
    const response = await axios.patch("users/" + id, userData, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteEmployee = async (id,token) => {
  try {
    const response = await axios.delete("users/" + id, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllEmployee = async (param,token) => {
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
    .get("users" + filter, headers(token))
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneEmployee = async (id,token) => {
  try {
    const response = await axios.get("users/" + id,headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};

export const getEmployeePair = async (token) => {
  try {
    const response = await axios.get("users?role=Employee", headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
