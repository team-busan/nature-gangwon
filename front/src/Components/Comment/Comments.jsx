import React from "react";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL, axiosInstance } from "../../Stores/API";
import { CommentList } from "./CommentList";

export default function Comments({ comments , formRef}) {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async ({ detail_comment_id }) => {
      const url = API_URL.LocationDetail.replace(":id", id);
      const response = await axiosInstance.post(
        `${url}/commentLike`,
        { comment_id: detail_comment_id },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log("좋아요 처리 성공:", data);
    },
    onError: (error) => {
      console.error("좋아요 처리 실패:", error);
    },
  });

  const handleLike = (detail_comment_id) => {
    if (!cookies.token) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }

    if (!detail_comment_id) {
      console.error("댓글 ID가 정의되지 않았습니다.");
      return;
    }

    mutation.mutate({ detail_comment_id });
  };

  return <CommentList comments={comments} onLike={handleLike} formRef = {formRef} />;
}
