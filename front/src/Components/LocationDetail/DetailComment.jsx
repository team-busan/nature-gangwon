import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Comments from "../Comments";
import CommentForm from "../CommentForm";

export default function DetailComment({ comments }) {
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [allComments, setAllComments] = useState(comments); // 댓글 목록을 상태로 관리

  const handleAddComment = (newComment) => {
    setAllComments([newComment, ...allComments]);
    setIsWritingComment(false); // 댓글 작성 후 양식 숨기기
  };

  return (
    <section className="w-1420 p-3">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-10 items-center">
            <h3 className="text-green">관광지 후기</h3>
            <span className="flex items-center">
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <p>4.0</p>
              <p>({allComments.length})</p>
            </span>
          </div>
          <div>
            <button
              className="bg-green text-white p-2 rounded-lg w-20 text-center"
              onClick={() => setIsWritingComment(!isWritingComment)}
            >
              댓글작성
            </button>
          </div>
        </div>
        <ul className="flex border-b-2 border-gray-300 pb-5">
          <li className="mr-5">최신순</li>
          <li>추천순</li>
        </ul>
      </div>

      {isWritingComment && <CommentForm onSubmit={handleAddComment} />}

      <Comments comments={allComments} />
    </section>
  );
}
