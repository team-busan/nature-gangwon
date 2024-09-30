import React, { useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { PiEyesDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import ShareModal from "../Comment/ShareModal";
import { userState } from "../../state/userState";
import { useRecoilState } from "recoil";
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL, axiosInstance } from "../../Stores/API";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";

export default function DetailHeader({ header, Id, title, mark, refetch }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareButtonRef = useRef(null);
  const [user] = useRecoilState(userState);
  const [cookies] = useCookies(["token"]);
  const { id } = useParams();
  const detailId = Number(id);

  const queryClient = new QueryClient();
  const userEmail = user ? user.userEmail : "";

  const markMutation = useMutation({
    mutationKey : ["Mark", header.id],
    mutationFn : () => {
      let url = `${axiosInstance.defaults.baseURL}`;

      if(title === "destination"){
        url = `${axiosInstance.defaults.baseURL}/${API_URL.DestinationMark}`;
      }else{
        url = `${axiosInstance.defaults.baseURL}/${API_URL.FestivalMark}`;
      };

      const data = {
        [`${title === 'destination' ? 'detail' : title}Id`]: Id,
      }

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
      refetch();
      await queryClient.invalidateQueries(["locationDetail", detailId]);
    },
    onError: (error) => {
      Swal.fire("오류 발생", "로그인 후 이용해주세요", "error");
    },
  })


  const toggleShareModal = () => {
    setIsShareModalOpen((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  const handleOnMark = (Id) => {
    markMutation.mutate(Id);
  }

  const isLikedByUser = mark && mark.includes(userEmail);


  return (
    <section className="w-1420 flex flex-col p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex justify-between w-full">
          <span>
            <h1 className="flex text-darkGreen">{header.Title}</h1>
          </span>
          <div className="flex gap-3 relative">
            <button 
              className=""
            >
            {isLikedByUser ? (
            <FaHeart
              className="text-red-600 cursor-pointer"
              onClick = {() => handleOnMark(header.Id)}
            />
          ) : (
            <FaRegHeart
              className="text-red-600 cursor-pointer"
              onClick = {() => handleOnMark(header.Id)}
            />
          )}
            </button>
            <button
              ref={shareButtonRef}
              className=""
              onClick={toggleShareModal}
            >
              <LuShare2 className="w-6 h-6 text-green" />
            </button>
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              onCopy={copyToClipboard}
              shareButtonRef={shareButtonRef} // 공유 버튼의 ref를 모달로 전달
            />
          </div>
        </div>
      </div>
      <h4 className="text-softGreen">{header.Address}</h4>
      <div className="flex flex-row w-full justify-between items-center mt-2">
        <span className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <h3>{header.TotalScore}</h3>
        </span>
        <span className="flex items-center">
          <PiEyesDuotone className="mr-2 text-2xl transform rotate-180" />
          <p className="mr-4">{header.Views}</p>
          <FaRegComment className="mr-2 text-2xl" />
          <p>{header.TotalComments}</p>
        </span>
      </div>
      <div className="flex justify-center w-full mt-3">
        <hr className="border-t-2 bg-gray-600 w-full" />
      </div>
    </section>
  );
}