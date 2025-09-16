import toast from "react-hot-toast";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const getProjects = async (userId) => {
  try {
    const response = await axiosInstanceAuth.get("/projects", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const getProjectById = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/projects/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const addProject = async (body) => {
  try {
    const response = await axiosInstanceAuth.post("/projects", body);
    console.log("🚀 ~ addProject ~ response:", response)
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateProject = async (body) => {
  try {
    const response = await axiosInstanceAuth.put(`/projects/${body._id}`, body);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axiosInstanceAuth.delete(`/projects/${projectId}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};
