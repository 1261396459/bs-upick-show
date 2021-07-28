import axios from "axios";

const apiHost = "/api";

export const client = axios.create({
  baseURL: apiHost,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});
