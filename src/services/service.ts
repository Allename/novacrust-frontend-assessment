import axios from 'axios';

const  baseURL: string = import.meta.env.VITE_API_BASE_URL;

const service = axios.create({
  baseURL,
  timeout: 120000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  },
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default service;