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
  LocationDetail: "/locationdetail",
  MyPage: "/myPage",
};

export { axiosInstance, API_URL };
