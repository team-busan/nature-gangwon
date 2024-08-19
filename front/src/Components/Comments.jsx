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
    if (!comment.detailContent) return ""; // undefined나 null에 대한 안전 처리

    if (isExpanded) {
      return comment.detailContent;
    }

    if (comment.detailContent.length <= maxLength) {
      return comment.detailContent;
    }

    return `${comment.detailContent.substring(0, maxLength)}...`;
  };

  return (
    <div className="flex-grow">
      <p>{renderContent()}</p>
      {comment.detailContent && comment.detailContent.length > maxLength && (
        <button onClick={toggleExpanded} className="text-green">
          {isExpanded ? "간략히 보기" : "더보기"}
        </button>
      )}
      <span className="flex items-center mt-2">
        <FaRegHeart
          className="text-red-600 cursor-pointer"
          onClick={() => onLike(comment.detailCommentId)}
        />
        <p className="ml-1">{/* {comment.like} */}5</p>
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

  return (
    <ul className="">
      {comments.length > 0 ? (
        comments.map((comment) => (
          <li
            className="flex mt-5 w-full p-2 gap-5 border-b-2 border-gray-300"
            key={comment.detailCommentId}
          >
            <div className="flex-shrink-0">
              <img
                className="w-20 h-20 rounded-full"
                src={
                  "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp"
                }
                alt={`${comment.userEmail}'s profile`}
              />
            </div>
            <div className="w-26 flex-shrink-0">
              <p>{comment.userNickname}</p>
              <span className="flex items-center justify-between">
                <span className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <p className="ml-1">{comment.score.toFixed(1)}</p>
                </span>
              </span>
              <p>{comment.detailUploadDate}</p>
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
