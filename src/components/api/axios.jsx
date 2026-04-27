import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 5000,
  withCredentials: true
});

export default axiosInstance;