import toast from "react-hot-toast";
import axiosInstance from "../../apiInstances/axiosInstance";

export const descriptionGenerateByAI = async (body) => {
  try {
    const response = await axiosInstance.post(
      "/api/generate-description",
      body
    );
    toast.success(response.data.message);
    localStorage.setItem("auth_token", response?.data.token);

    return response.data;
  } catch (error) {
    toast.error(error?.data?.message);

    return error.response;
  }
};
