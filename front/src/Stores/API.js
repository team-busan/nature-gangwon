import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import {
  destination_info,
  destination_detail,
  user_info,
  destination_comment,
} from "./mockData.js";

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
  Plan: "/plan",
};

const axiosMock = new AxiosMockAdapter(axiosInstance, {
  delayResponse: 100,
  onNoMatch: "throwException",
});

axiosMock.onGet(API_URL.SEARCH).reply((config) => {
  return [200, destination_info];
});

axiosMock.onGet(API_URL.LocationInfo).reply((config) => {
  const params = config.params || {};
  const { page = 1, size = 16, region = "all" } = params;

  const filteredData =
    region === "all"
      ? destination_info
      : destination_info.filter((item) => item.detail_sigungucode === region);
  const paginatedData = filteredData.slice(
    (page - 1) * size,
    page * size
  ); /* 시작 인덱스 ~ 끝 인덱스 */

  return [
    200,
    {
      data: paginatedData,
      totalItems: filteredData.length,
      currentPage: parseInt(page),
      itemsPerPage: parseInt(size),
      totalPages: Math.ceil(filteredData.length / size),
    },
  ];
});

axiosMock
  .onGet(new RegExp(`${API_URL.LocationDetail}/\\d+`))
  .reply((config) => {
    const id = parseInt(config.url.split("/").pop());
    const detail = destination_detail.find((item) => item.detail_id === id);
    const comments = destination_comment.filter(
      (item) => item.detail_id === id
    );

    if (detail) {
      return [200, { detail, comments }];
    } else {
      return [404, { message: "Not Found" }];
    }
  });

axiosMock.onGet(API_URL.Plan).reply((config) => {
  return [200, destination_info];
});

// const user_info_url = new RegExp(`${API_URL.MyPage}/*`);

// axiosMock.onGet(user_info_url).reply((config) => {
//   console.log(config.url);
//   const email = config.url.split("/").pop();
//   console.log(email);
//   const data = user_info.find((item) => item.email === email);

//   if (data) {
//     return [200, data];
//   } else {
//     return [404, { message: "Not Found" }];
//   }
// });
export { axiosInstance, API_URL };
