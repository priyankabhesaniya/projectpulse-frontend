// projects
import axios from "axios";
import { headers } from "../pages/admin-const/constants";

export const createProject = async (projectData) => {
  try {
    const response = await axios.post("projects", projectData,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const updateProject = async (id, projectData) => {
  try {
    const response = await axios.patch("projects/" + id, projectData, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete("projects/" + id, headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
export const getAllProject = async (param) => {
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
    .get("projects" + filter, headers)
    .then((res) => {
      return res?.data;
    })
    .catch((error) => Promise.reject(error?.response?.data));
};

export const getOneProject = async (id) => {
  console.log(headers,'headers in ptoject ');
  
  try {
    const response = await axios.get("projects/" + id,headers); // Use the Axios instance
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error creating user");
  }
};
