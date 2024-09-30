import React, { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, axiosInstance } from "../../Stores/API";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import {
  commentContents,
  commentEdit,
  isWritingCommentState,
  score,
} from "../../state/comment";
import Swal from "sweetalert2";

export default function Comment({ comment, Id, formRef, title }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 320;
  const [user] = useRecoilState(userState);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const detailId = Number(id);
  const queryClient = useQueryClient();
  const [isWritingComment, setIsWritingComment] = useRecoilState(
    isWritingCommentState
  );
  const [rating, setRating] = useRecoilState(score);
  const [commentContent, setCommentContent] = useRecoilState(commentContents);
  const [edit, setEdit] = useRecoilState(commentEdit);

  const userEmail = user ? user.userEmail : "";

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (edit && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [edit]);

  const getLikeCommentUrl = () => {
    switch (title) {
      case "plan":
        return `${API_URL.PlanCommentLike}`;
      case "destination":
        return `${API_URL.DestinationCommentLike}`;
      case "festival":
        return `${API_URL.FestivalCommentLike}`;
      default:
        throw new Error("잘못된 title 값입니다.");
    }
  };

  const getDeleteCommentUrl = (commentId) => {
    switch (title) {
      case "plan":
        return `${API_URL.PlanCommentDelete}/${commentId}`;
      case "destination":
        return `${API_URL.DestinationCommentDelete}/${commentId}`;
      case "festival":
        return `${API_URL.FestivalCommentDelete}/${commentId}`;
      default:
        throw new Error("잘못된 title 값입니다.");
    }
  };

  // 좋아요 요청
  const likeMutation = useMutation({
    mutationKey: ["commentLike", comment.id],
    mutationFn: (commentId) => {
      const url = getLikeCommentUrl();
      if (!url) {
        throw new Error("Invalid URL");
      }
  
      const data = {
        [`${title === 'destination' ? 'detail' : title}Id`]: Id,
        [`${title === 'destination' ? 'detail' : title}CommentId`]: commentId,
      };
  
      return axiosInstance.post(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
    },
    onSuccess: async () => {
      // 댓글 목록을 다시 불러오기 위해 캐시 무효화
      await queryClient.invalidateQueries(["planComments", detailId]);
    },
    onError: (error) => {
      Swal.fire("오류 발생", "로그인 후 이용해주세요", "error");
    },
  });
  

  // 삭제 요청
  const mutation = useMutation({
    mutationKey: ["commentDelete", comment.id],
    mutationFn: (commentId) => {
      const url = getDeleteCommentUrl(commentId);
      return axiosInstance.delete(url, {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
    },
    onSuccess: async () => {
      // 댓글 목록을 다시 불러오기 위해 캐시 무효화
      await queryClient.invalidateQueries(["planComments", detailId]);
      Swal.fire("삭제 완료!", "댓글이 성공적으로 삭제되었습니다.", "success");
    },
    onError: (error) => {
      Swal.fire(
        "오류 발생",
        "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
        "error"
      );
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "정말로 삭제하시겠습니까?",
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        // 삭제 요청 실행
        mutation.mutate(id);
      }
    });
  };

  const handleOnLike = (commentId) => {
    likeMutation.mutate(commentId);
  };
  const handleModify = (id, content) => {
    if (edit && isWritingComment) {
      setIsWritingComment(false);
      setEdit(false);
      setRating(0);
      setCommentContent("");
    } else {
      setIsWritingComment(true);
      setEdit(id);
      setCommentContent(content);
    }
  };

  const isLikedByUser = comment.likedUserEmails && comment.likedUserEmails.includes(userEmail);
 // 사용자가 댓글 좋아요 했는지 확인 여부



  return (
    <div className="w-full">
      <p>
        {isExpanded
          ? comment.content
          : comment.content?.substring(0, maxLength)}
      </p>
      {comment.content && comment.content.length > maxLength && (
        <button onClick={toggleExpanded} className="text-green">
          {isExpanded ? "간략히 보기" : "더보기"}
        </button>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="flex items-center">
          {isLikedByUser ? (
            <FaHeart
              className="text-red-600 cursor-pointer"
              onClick={() => handleOnLike(comment.id)}
            />
          ) : (
            <FaRegHeart
              className="text-red-600 cursor-pointer"
              onClick={() => handleOnLike(comment.id)}
            />
          )}

          <p className="ml-1">{comment.like}</p>
        </span>
        {comment.userEmail === userEmail && (
          <span className="flex flex-row">
            <button
              className="bg-green text-white p-1 rounded-lg w-16 h-10 flex items-center justify-center mr-1"
              onClick={() => handleModify(comment.id, comment.content)}
            >
              수정
              <MdModeEditOutline />
            </button>
            <button
              className="bg-tomato text-white p-1 rounded-lg w-16 h-10 flex items-center justify-center"
              onClick={() => handleDelete(comment.id)}
            >
              삭제
              <IoClose />
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
