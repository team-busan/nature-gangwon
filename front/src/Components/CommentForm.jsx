import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { API_URL, axiosInstance } from "../Stores/API";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function CommentForm({ onSubmit }) {
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const detailId = Number(id);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["commentSend", detailId],
    mutationFn: async (newComment) => {
      const response = await axiosInstance.post(
        `${API_URL.LocationComment}/detail-comment`,
        {
          detailId: newComment.detailId,
          detailContent: newComment.comment,
          score: newComment.rating,
        },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return response.data;  // 단순히 성공적으로 데이터 반환
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["locationDetail", detailId]); 
      setCommentContent(""); 
      setRating(0); 
      alert("댓글이 생성되었습니다!");
      onSubmit(); 
    },
    onError: (error) => {
      alert("댓글 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });

  const handleSubmit = () => {
    mutation.mutate({
      detailId: detailId,
      comment: commentContent,
      rating: rating,
    });
  };

  return (
    <div className="my-4 p-4 border border-gray-300 rounded-lg">
      <h4 className="mb-2 font-semibold">댓글 작성</h4>
      <div className="mb-3">
        <label className="block mb-1 font-medium">댓글 내용</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">평점</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <FaStar
              key={star}
              className={`cursor-pointer ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <button
        className="bg-green text-white p-2 rounded-lg w-full text-center"
        onClick={handleSubmit}
      >
        작성 완료
      </button>
    </div>
  );
}
