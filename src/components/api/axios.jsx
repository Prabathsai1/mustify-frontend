import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://mustify-backend.onrender.com/",
  timeout: 5000,
  withCredentials: true
});

export default axiosInstance;
