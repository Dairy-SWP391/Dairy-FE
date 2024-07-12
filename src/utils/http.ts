import axios, { AxiosInstance, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { callAccessToken } from "../apis/user";

const withoutAccessTokenRoute = [
  "category/all",
  "product/get-product",
  "product/:id",
  "ship/districts",
  "ship/wards",
  "user/login"
];

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_URL_BE,
      // baseURL: "http://localhost:8000/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const http = new Http().instance;

http.interceptors.request.use(
  async (config) => {
    if (withoutAccessTokenRoute.includes(config.url as string)) {
      return config;
    }
    const { access_token, refresh_token } = JSON.parse(
      localStorage.getItem("token") || ""
    );
    if (access_token) {
      const exp = jwtDecode(access_token).exp as number;
      if (Date.now() > exp * 1000) {
        try {
          const newToken = await callAccessToken(refresh_token);
          if (newToken.status === 200) {
            localStorage.setItem("token", newToken.data.data.access_token);
            http.defaults.headers.common.Authorization = `Bearer ${newToken.data.data.access_token}`;
            config.headers.Authorization = `Bearer ${newToken.data.data.access_token}`;
          }
        } catch (err) {
          if (isAxiosError(err)) {
            if (err.response?.status === 401) {
              toast.error("Token Expired, Please login again");
              delete http.defaults.headers.common.Authorization;
              setTimeout(() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }, 2000);
            }
          }
        }
      }
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default http;
