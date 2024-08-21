import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, axiosInstance } from "../../Stores/API";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { commentContents, commentEdit, isWritingCommentState, score } from "../../state/comment";

export default function Comment({ comment, onLike, formRef }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 320;
  const [user] = useRecoilState(userState);
  const [cookies] = useCookies(["token"]);
  const {id} = useParams();
  const detailId = Number(id);
  const queryClient = useQueryClient();
  const [isWritingComment, setIsWritingComment] = useRecoilState(isWritingCommentState);
  const [rating, setRating] = useRecoilState(score);
  const [commentContent, setCommentContent] = useRecoilState(commentContents);
  const [edit, setEdit] = useRecoilState(commentEdit);


  const userEmail = user ? user.userEmail : "";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if(edit && formRef.current){
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [edit]);
  
  const mutation = useMutation({
    mutationKey : ["commentDelete", comment.detailCommentId],
    mutationFn : async (Comment) => {
      const response = await axiosInstance.post(
        `${API_URL.LocationComment}/post-comment`,
        {
          detailCommentId : Comment.detailCommentId,
        },
        {
          headers : {
              Authorization : `Bearer ${cookies.token}`,
          },
        }
      );
      return response.data;
    },
    onSucess : async () => {
      await queryClient.invalidateQueries(["locationDetail", detailId]); // locationDetail로 시작하고 detailId에 해당하는 데이터 오래된 데이터로 만듬
    },
    onError : (error) => {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    }
  })

  const renderContent = () => {
    if (!comment.detailContent) return "";

    if (isExpanded) {
      return comment.detailContent;
    }

    if (comment.detailContent.length <= maxLength) {
      return comment.detailContent;
    }

    return `${comment.detailContent.substring(0, maxLength)}...`;
  };

  const handleDelete = () => {
    mutation.mutate({
      detailCommentId : comment.detailCommentId,
      detailId : detailId,
    })
  }

  const handleModify = (id, content, score) => {
    if(!isWritingComment){
      setIsWritingComment(!isWritingComment);
      setEdit(!edit);
      setRating(score);
      setCommentContent(content);
    }else{
      setEdit(true);
      setRating(score);
      setCommentContent(content);
    }
  };

  return (
    <div className="w-full">
      <p>{renderContent()}</p>
      {comment.detailContent && comment.detailContent.length > maxLength && (
        <button onClick={toggleExpanded} className="text-green">
          {isExpanded ? "간략히 보기" : "더보기"}
        </button>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="flex items-center">
          <FaRegHeart
            className="text-red-600 cursor-pointer"
            onClick={() => onLike(comment.detailCommentId)}
          />
          <p className="ml-1">{/* {comment.like} */}5</p>
        </span>
        {comment.userEmail === userEmail ? (
          <span className="flex flex-row">
            <button 
              className="bg-green text-white p-1 rounded-lg w-14 h-8 flex items-center justify-center mr-1"
              onClick = {() => handleModify(comment.detailCommentId, comment.detailContent, comment.score)}>
              수정
              <MdModeEditOutline />
            </button>
            <button 
              className="bg-tomato text-white p-1 rounded-lg w-14 h-8 flex items-center justify-center"
              onClick = {() => handleDelete()}>
              삭제
              <IoClose />
            </button>
          </span>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}