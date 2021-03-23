import axios from "axios";
import { BASE_URL } from "./Constants";

export const get = (URL, params) => {
  return axios.get(`${BASE_URL}${URL}`, { params });
};
