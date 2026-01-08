import axios from "axios";

const API = axios.create({
  baseURL: "https://tamizh-karai-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
