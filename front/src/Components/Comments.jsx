import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { API_URL, axiosInstance } from "../Stores/API";
import { useParams } from "react-router-dom";

function Comment({ comment, onLike }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 320;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const renderContent = () => {
    if (isExpanded) {
      return comment.detail_content;
    }

    if (comment.detail_content.length <= maxLength) {
      return comment.detail_content;
    }

    return `${comment.detail_content.substring(0, maxLength)}...`;
  };

  return (
    <div className="flex-grow">
      <p>{renderContent()}</p>
      {comment.detail_content.length > maxLength && (
        <button onClick={toggleExpanded} className="text-green">
          {isExpanded ? "간략히 보기" : "더보기"}
        </button>
      )}
      <span className="flex items-center mt-2">
        <FaRegHeart
          className="text-red-600 cursor-pointer"
          onClick={() => onLike(comment.detail_comment_id)}
        />
        <p className="ml-1">{comment.like}</p>
      </span>
    </div>
  );
}

export default function Comments({ comments }) {
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();

  const mutation = useMutation({
    mutationFn: async ({ detail_comment_id }) => {
      const url = API_URL.LocationDetail.replace(":id", id);
      const response = await axiosInstance.post(
        `${url}/commentLike`,
        { comment_id : detail_comment_id },
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
    mutation.mutate({ detail_comment_id });
  };

  return (
    <ul className="">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <li
            className="flex mt-5 w-full p-2 gap-5 border-b-2 border-gray-300"
            key={comment.detail_comment_id}
          >
            <div className="flex-shrink-0">
              <img
                className="w-20 h-20 rounded-full"
                src={comment.user_profile}
                alt={`${comment.user_email}'s profile`}
              />
            </div>
            <div className="w-26 flex-shrink-0">
              <p>{comment.user_email}</p>
              <span className="flex items-center justify-between">
                <span className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <p className="ml-1">{comment.score.toFixed(1)}</p>
                </span>
              </span>
              <p>{comment.detail_upload_date}</p>
            </div>
            <Comment comment={comment} onLike={handleLike} />
          </li>
        ))
      ) : (
        <li>후기를 남겨 주세요!</li>
      )}
    </ul>
  );
}
