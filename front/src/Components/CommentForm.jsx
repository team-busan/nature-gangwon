import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import axios from "axios";
import { API_URL, axiosInstance } from "../Stores/API";
import { useParams } from "react-router-dom";
import { QueryClient, useMutation } from "@tanstack/react-query";

export default function CommentForm({ onSubmit }) {
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const [cookies] = useCookies(["token"]); // 쿠키에서 token을 가져옴
  const { id } = useParams();
  const detailId = Number(id);

  const mutation = useMutation({
    mutationFn : async (newComment) => {
      const url = API_URL.LocationDetail.replace(':id', detailId);
      const response = await axiosInstance.get(`${url}/comments`,{
        comment : newComment.comment,
        rating : newComment.rating,
      });
      return response.data;
    },
    onSuccess : async (newComment) => {
      QueryClient.invalidateQueries(['comments', detailId]); // 관련된 쿼리를 무효화하여 데이터 재요청
      onSubmit(newComment);
      setCommentContent("");
      setRating(0);
    },
    onError : () => {
      alert("오류가 발생 했습니다");
    }
  });

  const handleSubmit = () => {
    mutation.mutate({
      comment : commentContent,
      rating : rating,
    })
  }

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
              className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
