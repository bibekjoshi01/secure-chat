import axios from "axios";
import { store } from "@/store/store";
import setCookie from "./Cookies/setCookie";
import getCookie from "./Cookies/getCookie";
import deleteCookie from "./Cookies/deleteCookie";
import { errorAlert } from "@/components/Alert/Redux/alertSlice";

export const axiosInstance = axios.create({
  baseURL: `http://localhost:8000`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (!window.navigator.onLine) {
      return Promise.reject("No Internet");
    } else {
      const contentType = determineContentType(config.data);
      config.headers = {
        Authorization: getCookie("accessToken")
          ? `Bearer ${getCookie("accessToken")}`
          : "",
        "Content-Type": contentType,
      };
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

function determineContentType(data) {
  if (typeof data === "object" && data instanceof FormData) {
    return "multipart/form-data";
  } else {
    return "application/json";
  }
}

// add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error === "No Internet") {
      store.dispatch(errorAlert("No internet Connection"));
    } else if (error?.message === "Network Error") {
      store.dispatch(errorAlert("Network Error"));
    } else if (error?.response?.status === 404) {
      store.dispatch(errorAlert("Page Not Found"));
    } //internal server error
    else if (error.response?.status === 500 || error.response?.status > 500) {
      store.dispatch(errorAlert("Internal Server Error"));
    } //to handle forbidden response status
    else if (error.response?.status === 403) {
      store.dispatch(
        errorAlert("You don't have permission to access on this server")
      );
    }

    const originalRequest = error.config;

    if (error.response.status === 401) {
      store.dispatch(errorAlert("You are logged out. Login in again."));
    } else if (
      error.response?.data.code === "token_not_valid" &&
      originalRequest.url !==
        "api/v1/public/customer-app/customer/token/refresh/"
    ) {
      //call for refresh token
      originalRequest.retry = true;
      try {
        const body = JSON.stringify({
          refresh: getCookie("refreshToken"),
        });
        deleteCookie("accessToken");
        const response = await axiosInstance.post(
          `api/v1/public/customer-app/customer/token/refresh/`,
          body
        );
        if (response.status === 200) {
          setCookie("accessToken", response?.data.access, {
            secure: true,
          });
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response?.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        store.dispatch(errorAlert(error));
      }
    }
    // Do something with response error
    return Promise.reject(error);
  }
);
