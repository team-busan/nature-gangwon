import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useMutation, useQuery } from "@tanstack/react-query";
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
import { CommentList } from "../Comment/CommentList";

export default function DetailComment({ apiEndPoint, Id, title, typeId, totalScore }) {
  const [cookies] = useCookies(["token"]);
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
  const [commentSortOption, setCommentSortOption] = useState("인기순");

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

  const fetchComments = async () => {
    const commentUrl = `http://nature-gangwon.shop/${title}/comment/${typeId}?sort=${commentSortOption}`;
    try {
      const response = await axiosInstance.get(commentUrl);
      if (response.data && response.data.message === "It Doesn't Exist.") {
        return [];
      }
      return response.data;
    } catch (error) {
      console.error("Error fetching comments:", error);
      return [];
    }
  };

  const {
    data: comments = [],
    isLoading: isCommentLoading,
    isError: isCommentError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["Comments", typeId, commentSortOption],
    queryFn: fetchComments,
    enabled: !!typeId,
  });


  const handleAddComment = () => {
    refetchComments();
    setIsWritingComment(false);
  };

  const handleWriteCommentClick = () => {
    if (!cookies.token) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }
    setEdit(false);
    setIsWritingComment(!isWritingComment);
    if (!isWritingComment) {
      setRating(0);
      setCommentContent("");
    }
  };

  const handleFilter = (option) => {
    setCommentSortOption(option);
    if (option === "best") {
      mutation.mutate({
        filter: "best",
      });
    }
  };

  let filteredComments = comments;

  switch (title) {
    case "plan" :
      filteredComments = comments.planCommentList;
      break;
    case "destination" :
      filteredComments = comments.detailCommentList;
      break;
    case "festival" :
      filteredComments = comments.festivalCommentList;
      break;
    default :
      throw new Error("잘못된 값입니다");
  }

  let commentsLength = 0;

  switch (title) {
    case "plan":
      commentsLength = comments.planCommentList ? comments.planCommentList.length : 0;
      break;
    case "destination":
      commentsLength = comments.detailCommentList ? comments.detailCommentList.length : 0;
      break;
    case "festival":
      commentsLength = comments.festivalCommentList ? comments.festivalCommentList.length : 0;
      break;
    default:
      throw new Error("잘못된 값입니다");
  }
  

  return (
    <section className="w-1420 p-3" ref={formRef}>
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-10 items-center">
            <h3 className="text-green">댓글</h3>
            {title === "plan" ? null : (
              <span className="flex items-center">
                <span className="text-yellow-400">
                  <FaStar />
                </span>
                <p>{totalScore}</p>
                <p>({commentsLength})</p>
              </span>
            )}
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
              commentSortOption === "인기순" ? "text-softGreen font-bold" : ""
            }`}
            onClick={() => handleFilter("인기순")}
          >
            인기순
          </li>
          <li
            className={`cursor-pointer ${
              commentSortOption === "최신순" ? "text-softGreen font-bold" : ""
            }`}
            onClick={() => handleFilter("최신순")}
          >
            최신순
          </li>
        </ul>
      </div>

      <div>
        {isWritingComment && (
          <CommentForm
            onSubmit={handleAddComment}
            Id = {Id}
            title={title}
            apiEndPoint={apiEndPoint}
          />
        )}
      </div>
      <CommentList comments={filteredComments} Id = {Id} formRef={formRef} title={title} />
    </section>
  );
}
