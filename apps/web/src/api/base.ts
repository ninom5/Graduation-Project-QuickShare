import { ErrorResponseType } from "types";
import axios from "axios";
import { toast } from "react-toastify";

export const api = axios.create({
  baseURL: import.meta.env.VITE_CONNECTION_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
toast.error(api.defaults.baseURL);
console.log("API Base URL:", api.defaults.baseURL);

api.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("jwt");

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error: ErrorResponseType) => {
    if (error.response)
      return Promise.reject(error.response.data.message || error.message);

    return Promise.reject("Network error");
  }
);
