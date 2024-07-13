import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { example, destinations } from "./mockData.js";

const BASE_URL = "http://localhost:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const API_URL = {
  HOME: "/",
  LocationInfo : "/locationinfo"
};

const axiosMock = new AxiosMockAdapter(axiosInstance, {
  delayResponse: 100,
  onNoMatch: "throwException",
});

axiosMock.onGet(API_URL.LocationInfo).reply(() => {
  return [200, destinations];
})

axiosMock.onGet(API_URL.HOME).reply(() => {
  return [200, example];
});

export { axiosInstance, API_URL };
