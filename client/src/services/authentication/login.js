import toast from "react-hot-toast";
import axiosInstance from "../../apiInstances/axiosInstance";

export const loginWithEmail = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/login", body);
    toast.success(response.data.message);
    localStorage.setItem("auth_token", response?.data.token);
    localStorage.setItem("userId", response?.data?.user?.id);

    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);

    return error.response;
  }
};
