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
import Swal from "sweetalert2"; // SweetAlert2 추가

export default function Comment({ comment, onLike, formRef }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 320;
  const [user] = useRecoilState(userState);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
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
    if (edit && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [edit]);

  const mutation = useMutation({
    mutationKey: ["commentDelete", comment.detailCommentId],
    mutationFn: async (Comment) => {
      const url = API_URL.LocationDetail.replace(":id", id);
      const response = await axiosInstance.delete(
        `${url}/${Comment.detailCommentId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(["locationDetail", detailId]);
    },
    onError: (error) => {
      alert("오류가 발생했습니다. 다시 시도해주세요");
    },
  });

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
    Swal.fire({
      title: '삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning', // 모달에 표시할 아이콘 종류
      showCancelButton: true, // 취소 버튼 표시
      confirmButtonColor: '#3085d6', // 확인 버튼 색상
      cancelButtonColor: '#d33', // 취소 버튼 색상
      confirmButtonText: '삭제', // 확인 버튼 텍스트
      cancelButtonText: '취소' // 취소 버튼 텍스트
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate({
          detailCommentId: comment.detailCommentId,
          detailId: detailId,
        });
        Swal.fire(
          '삭제 완료!',
          '댓글이 성공적으로 삭제되었습니다.',
          'success'
        );
      }
    });
  };

  const handleModify = (id, content, score) => {
    if (edit && isWritingComment) {
      setIsWritingComment(false);
      setEdit(false);
      setRating(0);
      setCommentContent('');
    } else {
      setIsWritingComment(true);
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
          <p className="ml-1">{comment.like}</p>
        </span>
        {comment.userEmail === userEmail ? (
          <span className="flex flex-row">
            <button
              className="bg-green text-white p-1 rounded-lg w-16 h-10 flex items-center justify-center mr-1"
              onClick={() => handleModify(comment.detailCommentId, comment.detailContent, comment.score)}
            >
              수정
              <MdModeEditOutline />
            </button>
            <button
              className="bg-tomato text-white p-1 rounded-lg w-16 h-10 flex items-center justify-center"
              onClick={handleDelete}
            >
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
