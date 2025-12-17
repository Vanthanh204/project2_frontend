import axios from "axios";

const API = axios.create({
  baseURL: "https://project2-backend-nu.vercel.app/",
  headers: {
    "Content-Type": "application/json"
  }
});

export default API;
