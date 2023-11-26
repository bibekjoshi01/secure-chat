import { axiosInstance } from "../../../utils/axios";

export const register = (body) => {
  return axiosInstance.post(`api/room/register`, body);
};

export const login = (body) => {
  return axiosInstance.post(`api/room/login`, body);
};
