import axios, { AxiosInstance } from "axios";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "https://dairy-be-j2x39.ondigitalocean.app/",
      //   baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
}

const http = new Http().instance;

export default http;
