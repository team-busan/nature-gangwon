import axios from "axios";

const BASE_URL = "http://nature-gangwon.shop";

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
  FestivalDetails : "/festival/:id",
  PlanInfo : "/plan/list",
  PlanDetail : "/plan/:id",
  MyPage: "/myPage",
  Plan: "/plan",
  PlanMark : "/plan/mark",
  DestinationMark : "destination/mark",
  FestivalMark : "festival/mark",
  PlanComment: "/plan/patch-comment",
  FestivalComment: "/festival/patch-comment",
  DetailComment: "/detail/patch-comment",
  DestinationCommentDelete : "/destination/delete-comment",
  FestivalCommentDelete : "/festival/delete-comment",
  PlanCommentDelete : "/plan/delete-comment",
  PlanCommentLike : "/plan/comment-like",
  DestinationCommentLike : "/destination/comment-like",
  FestivalCommentLike : "/festival/comment-like"
};

export { axiosInstance, API_URL };
