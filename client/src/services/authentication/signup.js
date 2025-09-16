import toast from "react-hot-toast";
import axiosInstance from "../../apiInstances/axiosInstance";

export const SignUpWithEmail = async (body) => {
  try {
    const response = await axiosInstance.post("/auth/signup", body);
    toast.success(response.data.message);

    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);

    return error.response;
  }
};
