import axios from "axios";

const baseURL = "http://0.0.0.0:8000/api/v1/";

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
