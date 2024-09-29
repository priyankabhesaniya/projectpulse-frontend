// manager
import axios from "axios";
import { headers } from "../pages/admin-const/constants";
export const createManager = async (userData) => {
  try {
    const response = await axios.post("users", userData,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
export const updateManager = async (id, userData) => {
  try {
    const response = await axios.patch("users/" + id, userData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
export const deleteManager = async (id) => {
  try {
    const response = await axios.delete("users/" + id, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
export const getAllManager = async (param) => {
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

export const getOneManager = async (id) => {
  try {
    const response = await axios.get("users/" + id,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
export const getManagersPair = async (id) => {
  try {
    const response = await axios.get("users?role=Manager", headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating users");
  }
};
