import toast from "react-hot-toast";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const getTask = async (userId) => {
  try {
    const response = await axiosInstanceAuth.get("/tasks/get-task", {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const getByTaskId = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const addTask = async (body) => {
  try {
    const response = await axiosInstanceAuth.post("/tasks", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const updateTask = async (body) => {
  try {
    const response = await axiosInstanceAuth.put(`/tasks/${body._id}`, body);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axiosInstanceAuth.delete(`/tasks/${taskId}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};
