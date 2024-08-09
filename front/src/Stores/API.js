import axios from "axios";

const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const API_URL = {
  HOME: "/",
  SEARCH: "/search",
  LocationInfo: "/detail/list",
  LocationDetail: "/detail/:id",
  MyPage: "/myPage",
  Plan: "/plan",
};

export { axiosInstance, API_URL };
