import axios from "axios";
import React from "react";
const axiosInstance = axios.create({
  baseURL: "https://scholar-stream-server-iota.vercel.app",
});
const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
