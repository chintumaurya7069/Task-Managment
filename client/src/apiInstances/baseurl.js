let url = "";

url = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001/api";
// url = "http://192.168.29.48:8000/api/v1";

export const BACKEND_BASE_URL = url;
