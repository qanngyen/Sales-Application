import axios from 'axios';

// Lấy URL từ biến môi trường
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export default axiosInstance;
