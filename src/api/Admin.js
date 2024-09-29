// admin
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createAdmin = async (userData) => {
  try {
    const response = await axios.post("admin", userData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateAdmin = async (id, userData) => {
  try {
    const response = await axios.patch("admin/" + id, userData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete("admin/" + id, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllAdmin = async (param) => {

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
    .get("admin" + filter, headers)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneAdmin = async (id) => {
  try {
    const response = await axios.get("admin/" + id,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
