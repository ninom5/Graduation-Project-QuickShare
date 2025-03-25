import axios from "axios";
import { beURL } from "constants/urls";

export const axiosAPI = axios.create({
  baseURL: beURL,
  //   withCredentials: true,
});
