import React from "react";
import { FaStar } from "react-icons/fa";
import Comment from "./Comment";
import defaultImage from "../../img/profile.jpg"

export function CommentItem({ comment, Id, onLike, formRef, title }) {
  if (!comment) {
    return null;
  }

  // comment 데이터를 통일된 형태로 변환하는 함수
  const normalizeCommentData = (comment, title) => {
    switch (title) {
      case "plan":
        return {
          id: comment.planCommentId,
          userEmail: comment.userEmail,
          userNickname: comment.userNickname,
          userProfile:
            comment.userProfile ||
            "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp",
          content: comment.planContent,
          uploadDate: comment.planUploadDate,
          score: comment.score || 0,
          like : comment.likeCount,
          likedUserEmails : comment.likedUserEmails,
        };
      case "festival":
        return {
          id: comment.festivalCommentId,
          userEmail: comment.userEmail,
          userNickname: comment.userNickname,
          userProfile:
            comment.userProfile ||
            "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp",
          content: comment.festivalContent,
          uploadDate: comment.festivalUploadDate,
          like : comment.likeCount,
          score: comment.score || 0,
          likedUserEmails : comment.likedUserEmails,
        };
      case "destination":
        return {
          id: comment.detailCommentId,
          userEmail: comment.userEmail,
          userNickname: comment.userNickname,
          userProfile:
            comment.userProfile ||
            "https://i.namu.wiki/i/Bge3xnYd4kRe_IKbm2uqxlhQJij2SngwNssjpjaOyOqoRhQlNwLrR2ZiK-JWJ2b99RGcSxDaZ2UCI7fiv4IDDQ.webp",
          content: comment.detailContent,
          uploadDate: comment.detailUploadDate,
          score: comment.score || 0,
          like : comment.likeCount,
          likedUserEmails : comment.likedUserEmails,
        };
      default:
        return comment;
    }
  };

  // 통일된 형태의 comment 데이터
  const normalizedComment = normalizeCommentData(comment, title);

  return (
    <li className="flex mt-5 w-full p-2 gap-5 border-b-2 border-gray-300">
      <div className="flex-shrink-0">
        <img
          className="w-20 h-20 rounded-full"
          src={
            normalizedComment.userProfile === "/image/profile.jpg"
              ? defaultImage
              : normalizedComment.userProfile
          }
          alt={`${normalizedComment.userEmail}'s profile`}
        />
      </div>
      <div className="w-44 flex-shrink-0">
        <p>{normalizedComment.userNickname}</p>
        <span className="flex items-center justify-between">
          {title === "plan" ? null : (
            <span className="flex items-center">
              <FaStar className="text-yellow-400" />
              <p className="ml-1">{normalizedComment.score.toFixed(1)}</p>
            </span>
          )}
        </span>
        <p>{normalizedComment.uploadDate.substring(0, 16)}</p>
      </div>
      <Comment comment={normalizedComment} Id = {Id} onLike={onLike} formRef={formRef} title = {title} />
    </li>
  );
}
