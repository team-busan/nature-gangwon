import React, { useState } from "react";
import { CommentItem } from "./CommentItem";

export function CommentList({ comments, onLike, formRef, title }) {
  const [visibleCount, setVisibleCount] = useState(5);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  if (!Array.isArray(comments) || comments.length === 0) {
    return <li>후기를 남겨 주세요!</li>;
  }

  return (
    <>
      <ul className="">
        {comments.slice(0, visibleCount).map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={onLike}
            formRef={formRef}
            title={title}
          />
        ))}
      </ul>
      {visibleCount < comments.length && (
        <div className="w-full mt-3 flex justify-end">
          <button
            onClick={handleLoadMore}
            className="text-white p-2 w-20 bg-green rounded-lg"
          >
            더보기+
          </button>
        </div>
      )}
    </>
  );
}

