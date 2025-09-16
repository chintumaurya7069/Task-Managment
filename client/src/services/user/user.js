import toast from "react-hot-toast";
import axiosInstanceAuth from "../../apiInstances/axiosInstanceAuth";

export const getUser = async () => {
  try {
    const response = await axiosInstanceAuth.get("/users/get-user");
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const getByUserId = async (id) => {
  try {
    const response = await axiosInstanceAuth.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const addUser = async (body) => {
  try {
    const response = await axiosInstanceAuth.post("/users", body, {
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

export const updateUser = async (body) => {
  try {
    const response = await axiosInstanceAuth.put(`/users/${body._id}`, body);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await axiosInstanceAuth.delete(`/users/${userId}`);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error.response;
  }
};
