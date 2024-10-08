import React from "react";
import { FaStar } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../Stores/API";
import { useRecoilState } from "recoil";
import { commentContents, commentEdit, score } from "../../state/comment";
import { getRequestData } from "./CommentFunction";
import Swal from "sweetalert2";

export default function CommentForm({ onSubmit, Id, title, apiEndPoint }) {
  const [commentContent, setCommentContent] = useRecoilState(commentContents);
  const [rating, setRating] = useRecoilState(score);
  const [cookies] = useCookies(["token"]);
  const [edit, setEdit] = useRecoilState(commentEdit);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const detailId = id ? Number(id) : null;
  const maxChars = 500;

  const mutation = useMutation({
    mutationKey: ["commentSend", title],
    mutationFn: async () => {
      const { url, data } = getRequestData(
        edit,
        Id,
        commentContent,
        rating,
        title,
        apiEndPoint
      );

      if (!cookies.token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await (edit ? axiosInstance.patch : axiosInstance.post)(
        url,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries([`${title}Detail`, detailId]);
      setCommentContent("");
      setRating(0);
      Swal.fire(edit ? "댓글이 수정되었습니다!" : "댓글이 생성되었습니다!");
      onSubmit(edit);
      setEdit(false); // 수정 모드 해제
    },
    onError: () => {
      Swal.fire(
        `댓글 ${
          edit ? "수정" : "생성"
        } 중 오류가 발생했습니다. 다시 시도해주세요.`
      );
    },
  });

  const handleSubmit = () => {
    if (title !== "plan" && rating === 0) {
      alert("평점을 입력 해주세요");
      return;
    }

    mutation.mutate(); // 데이터 전송
  };

  return (
    <div className="my-4 p-4 border border-gray-300 rounded-lg">
      <h4 className="mb-2 font-semibold">{title} 댓글 작성</h4>
      <div>
        <label className="block mb-1 font-medium">댓글 내용</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          rows="4"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          maxLength={maxChars}
        ></textarea>
      </div>
      {title !== "plan" && (
        <div className="flex justify-between">
          <div className="mb-3">
            <label className="block mb-1 font-medium">평점</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="text-right text-sm text-gray-500">
            {commentContent.length}/{maxChars}
          </div>
        </div>
      )}
      <button
        className="bg-green text-white p-2 rounded-lg w-full text-center"
        onClick={handleSubmit}
      >
        {edit ? "수정 완료" : "작성 완료"}
      </button>
    </div>
  );
}
