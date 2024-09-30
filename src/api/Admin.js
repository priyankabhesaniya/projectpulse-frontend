// admin
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createAdmin = async (userData,token) => {
  try {
    const response = await axios.post("admin", userData, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateAdmin = async (id, userData,token) => {
  try {
    const response = await axios.patch("admin/" + id, userData, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteAdmin = async (id,token) => {
  try {
    const response = await axios.delete("admin/" + id, headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllAdmin = async (param,token) => {

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
    .get("admin" + filter, headers(token))
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneAdmin = async (id,token) => {
  try {
    const response = await axios.get("admin/" + id,headers(token)); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
