// 댓글 데이터와 URL을 설정하는 함수
import {axiosInstance} from "../../Stores/API";


export const getRequestData = (edit, detailId, commentContent, rating, title, apiEndPoint) => {
  let url = "";
  let data = {};
  

  switch (title) {
    case "plan":
      url = edit ? `${axiosInstance.defaults.baseURL}/plan/patch-comment` : `${axiosInstance.defaults.baseURL}/plan/post-comment`;
      data = {
        planId: detailId,
        planContent: commentContent,
        ...(edit && { planCommentId: edit }) // 수정일 경우 planCommentId를 추가
      };
      break;

    case "destination": 
      url = edit ? `${axiosInstance.defaults.baseURL}/destination/patch-comment` : `${axiosInstance.defaults.baseURL}/destination/post-comment`;
      data = {
        detailId: detailId,
        detailContent: commentContent,
        score: rating,
        ...(edit && { detailCommentId : edit})
      };
      break;

    case "festival":
      url = edit ? `${axiosInstance.defaults.baseURL}/festival/patch-comment` : `${axiosInstance.defaults.baseURL}/festival/post-comment`;
      data = {
        festivalId: detailId,
        festivalContent: commentContent,
        score: rating,
        ...(edit && { festivalCommentId : edit})
      };
      break;

    default:
      throw new Error("잘못된 title 값입니다.");
  }

  return { url, data };
};
