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
  LocationInfo: "/locationinfo",
};

const axiosMock = new AxiosMockAdapter(axiosInstance, {
  delayResponse: 100,
  onNoMatch: "throwException",
});

axiosMock.onGet(API_URL.LocationInfo).reply((config) => {
  const params = config.params || {};
  const { page = 1, size = 16, region = "all" } = params;

  const filteredData = region === "all" ? destinations : destinations.filter(item => item.region === region);
  const paginatedData = filteredData.slice((page - 1) * size, page * size); /* 시작 인덱스 ~ 끝 인덱스 */

  return [200, {
    data: paginatedData,
    totalItems: filteredData.length,
    currentPage: parseInt(page),
    itemsPerPage: parseInt(size),
    totalPages: Math.ceil(filteredData.length / size),
  }];
});

axiosMock.onGet(API_URL.HOME).reply(() => {
  return [200, example];
});

export { axiosInstance, API_URL };
