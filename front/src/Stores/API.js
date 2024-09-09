import axios from "axios";

const BASE_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

const API_URL = {
  HOME: "/",
  SEARCH: "/search",
  LocationInfo: "/destination/list",
  LocationDetail: "/destination/:id",
  LocationComment : "/destination",
  FestivalInfo : "/festival/list",
  PlanInfo : "/plan/list",
  PlanDetail : "/plan/:id",
  MyPage: "/myPage",
  Plan: "/plan",
  PlanComment: "/plan/patch-comment",
  FestivalComment: "/festival/patch-comment",
  DetailComment: "/detail/patch-comment",
  PlanCommentDelete : "/plan/delete-comment",
  PlanCommentLike : "/plan/comment-like",
};

export { axiosInstance, API_URL };
