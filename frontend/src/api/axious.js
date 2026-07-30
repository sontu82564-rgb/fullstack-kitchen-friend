import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9003",
  withCredentials: true,
});

export default API;