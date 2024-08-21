import React from "react";
import { FaStar } from "react-icons/fa";
import Comment from "./Comment";

export function CommentItem({ comment, onLike, formRef }) {
  if (!comment) {
    return null;
  }
  return (
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
      <Comment comment={comment} onLike={onLike} formRef = {formRef} />
    </li>
  );
}
