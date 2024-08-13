import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function CommentForm({ onSubmit }) {
  const [commentTitle, setCommentTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const newComment = {
      title: commentTitle,
      content: commentContent,
      rating,
      id: Date.now(),
    };

    onSubmit(newComment);

    // 제출 후 양식 초기화
    setCommentTitle("");
    setCommentContent("");
    setRating(0);
  };

  return (
    <div className="my-4 p-4 border border-gray-300 rounded-lg">
      <h4 className="mb-2 font-semibold">댓글 작성</h4>
      <div className="mb-3">
        <label className="block mb-1 font-medium">댓글 제목</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={commentTitle}
          onChange={(e) => setCommentTitle(e.target.value)}
        />
      </div>
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
        댓글 제출
      </button>
    </div>
  );
}
