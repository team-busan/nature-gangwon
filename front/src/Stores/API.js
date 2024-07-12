import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { exeample } from "./mockData.js";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const API_URL = {
  HOME: "/",
};

const axiosMock = new AxiosMockAdapter(axiosInstance, {
  delayResponse: 100,
  onNoMatch: "throwException",
});

axiosMock.onGet(API_URL.HOME).reply(() => {
  return [200, exeample];
});

export { axiosInstance, API_URL };
