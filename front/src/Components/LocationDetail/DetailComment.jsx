import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";
import { API_URL, axiosInstance } from "../../Stores/API";
import { useLocation, useParams } from "react-router-dom";
import CommentForm from "../Comment/CommentForm";
import { useRecoilState } from "recoil";
import {
  commentContents,
  commentEdit,
  isWritingCommentState,
  score,
} from "../../state/comment";
import { set } from "react-hook-form";
import { CommentList } from "../Comment/CommentList";

export default function DetailComment({
  comments,
  refetchComments,
  apiEndPoint,
  title,
}) {
  const [cookies] = useCookies(["token"]);
  const [commentFilter, setCommentFilter] = useState("default");
  const { id } = useParams();
  const detailId = Number(id);
  const [rating, setRating] = useRecoilState(score);
  const [commentContent, setCommentContent] = useRecoilState(commentContents);
  const [isWritingComment, setIsWritingComment] = useRecoilState(
    isWritingCommentState
  );
  const [edit, setEdit] = useRecoilState(commentEdit);
  const formRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    return () => {
      setIsWritingComment(false);
      setEdit(false);
      setRating(0);
      setCommentContent("");
    };
  }, [location.pathname]); // 페이지 변경될 때 상태 초기화

  const mutation = useMutation({
    mutationFn: async (option) => {
      const url = `${apiEndPoint}/${detailId}/commentsFilter`;
      const response = await axiosInstance.get(url, {
        params: { filter: option.filter },
      });
      return response.data;
    },
  });

  const calculateAverageScore = (comments) => {
    // 평균 평점 계산하는 함수
    if (comments.length === 0) return 0;
    const totalScore = comments.reduce(
      (acc, comment) => acc + comment.score,
      0
    );
    return (totalScore / comments.length).toFixed(1);
  };

  const averageScore = calculateAverageScore(comments); // 평균 평점

  const handleAddComment = () => {
    refetchComments(); // 댓글 목록 갱신
    setIsWritingComment(false); // 작성 폼 숨기기
  };

  const handleWriteCommentClick = () => {
    if (!cookies.token) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }
    setEdit(false);
    setIsWritingComment(!isWritingComment);
    if (!isWritingComment) {
      // 댓글 작성이 꺼져있는 상태면 메시지랑, 별점 초기화
      setRating(0);
      setCommentContent("");
    }
  };

  const handleFilter = (option) => {
    setCommentFilter(option);
    if (option === "best") {
      mutation.mutate({
        filter: "best",
      });
    }
  };

  return (
    <section className="w-1420 p-3" ref={formRef}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-10 items-center">
            <h3 className="text-green">{title} 댓글</h3>
            {title === "plan" ? (
              <span className="flex items-center">
                <span className="text-yellow-400">
                  <FaStar />
                </span>
                <p>{averageScore}</p>
                <p>({comments.length})</p>
              </span>
            ) : null}
          </div>
          <div>
            <button
              className="bg-green text-white p-2 rounded-lg w-20 text-center"
              onClick={handleWriteCommentClick}
            >
              댓글작성
            </button>
          </div>
        </div>
        <ul className="flex border-b-2 border-gray-300 pb-5">
          <li
            className={`mr-5 cursor-pointer ${
              commentFilter === "default" ? "text-softGreen font-bold" : ""
            }`}
            onClick={() => handleFilter("default")}
          >
            최신순
          </li>
          <li
            className={`cursor-pointer ${
              commentFilter !== "default" ? "text-softGreen font-bold" : ""
            }`}
            onClick={() => handleFilter("best")}
          >
            추천순
          </li>
        </ul>
      </div>

      <div>
        {isWritingComment && (
          <CommentForm onSubmit={handleAddComment} title={title} apiEndPoint = {apiEndPoint}/>
        )}
      </div>
      <CommentList comments={comments} formRef = {formRef} title = {title} />
    </section>
  );
}
