import React from 'react';

export default function Comments({ comments = [] }) {
  // 기본값으로 빈 배열 설정
  return (
    <>
      <ul>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <li key={comment.detail_comment_id}>
              <img src={comment.user_profile} alt={`${comment.user_email}'s profile`} />
              <p>{comment.user_email}</p>
              <p>{comment.detail_content}</p>
              <p>{comment.detail_upload_date}</p>
            </li>
          ))
        ) : (
          <li>No comments</li>
        )}
      </ul>
    </>
  );
}
