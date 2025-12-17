import axios from "axios";

const API = axios.create({
  baseURL: "https://project2-backend-xz70.onrender.com/api"
});

export default API;
