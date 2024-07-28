import React, { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
function Comment({ comment }) {
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
        <button 
          onClick={toggleExpanded}
          className = "text-green"
        >
          {isExpanded ? '간략히 보기' : '더보기'}
        </button>
      )}
    </div>
  );
}

export default function Comments({ comments }) {
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
            <div className="w-28 flex-shrink-0">
              <p>{comment.user_email}</p>
              <span className="flex items-center">
                <FaStar className="text-yellow-400" />
                <p className="ml-1">{comment.score.toFixed(1)}</p>
                <FaRegHeart className = "text-red-600 ml-1"/>
                <p className = "ml-1">{comment.like}</p>
              </span>
              <p>{comment.detail_upload_date}</p>
            </div>
            <Comment comment={comment} />
          </li>
        ))
      ) : (
        <li>후기를 남겨 주세요!</li>
      )}
    </ul>
  );
}
