import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import Comments from "../Comments";
import CommentForm from "../CommentForm";
import { useCookies } from "react-cookie";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_URL, axiosInstance } from "../../Stores/API";
import { useParams } from "react-router-dom";

export default function DetailComment({ comments }) {
  const [isWritingComment, setIsWritingComment] = useState(false);
  const [allComments, setAllComments] = useState(comments); // 댓글 목록을 상태로 관리
  const [cookies] = useCookies(["token"]);
  const [commentFilter, setCommentFilter] = useState("default");
  const { id } = useParams(); 
  const detailId = Number(id);

  const mutation = useMutation({
    mutationFn : async (option) => {
      const url = API_URL.LocationDetail.replace(":id", detailId);
      const response = await axiosInstance.get(`${url}/commentsFilter`,{
        option : option.filter,
      });
      return response.data;
    }
  })

  const handleAddComment = (newComment) => {
    setAllComments([newComment, ...allComments]);
    setIsWritingComment(false); // 댓글 작성 후 양식 숨기기
  };

  const handleWriteCommentClick = () => {
    if (!cookies.token) {
      alert("로그인 후 이용이 가능합니다.");
      return;
    }
    setIsWritingComment(!isWritingComment);
  };

  const handleFilter = (option) => {
    setCommentFilter(option);
    if(option === "best"){
      mutation.mutate({
        filter : "best"
      })
    }
  }

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
            onClick = {() => handleFilter("default")}
          >
            최신순
          </li>
          <li
            className={`cursor-pointer ${
              commentFilter !== "default" ? "text-softGreen font-bold" : ""
            }`}
            onClick = {() => handleFilter("best")}
          >
            추천순
          </li>
        </ul>
      </div>

      <div>
        {isWritingComment && <CommentForm onSubmit={handleAddComment} />}
      </div>

      <Comments comments={allComments} />
    </section>
  );
}
