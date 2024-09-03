import React, { useState, useRef } from "react";
import profile from "../../img/house.avif";
import ShareModal from "../Comment/ShareModal";
import { LuShare2 } from "react-icons/lu";
import { IoHeartOutline } from "react-icons/io5";
import { PiEyesDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";

const getTravelStatus = (startDate, endDate) => {
  const today = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (today < start) {
    return "여행 전";
  } else if (today >= start && today <= end) {
    return "여행 중";
  } else {
    return "여행 완료";
  }
};

const getBackgroundColorClass = (status) => {
  switch (status) {
    case "여행 전":
      return "bg-blue-500";
    case "여행 중":
      return "bg-orange-500";
    case "여행 완료":
      return "bg-green";
    default:
      return "";
  }
};

export default function PlanDetailHeader({
  planHeader,
}) {
  const travelStatus = getTravelStatus(
    planHeader.startDate,
    planHeader.endDate
  );
  const backgroundColorClass = getBackgroundColorClass(travelStatus);


  const formattedStartDate = planHeader.startDate.split(" ")[0];
  const formattedEndDate = planHeader.endDate.split(" ")[0];

  // 모달 열림/닫힘 상태 관리
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareButtonRef = useRef(null);

  // 모달을 여는 함수
  const toggleShareModal = () => {
    setIsShareModalOpen((prev) => !prev);
  };

  // 클립보드에 URL을 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <section className="w-1420 mb-2">
      <div className="flex mt-3 justify-between items-center p-2 border-b-2">
        <div className="flex">
          <span className="w-20 h-20">
            <img
              src={profile}
              alt="프로필 이미지"
              className="w-20 h-20 rounded-full"
            />
          </span>
          <span className="p-2">
            <p>{planHeader.userNickname}</p>
            <p className="text-gray-400">{planHeader.planUploadDate}</p>
            <div className="flex items-center">
              {/* 날짜 표시에서 시간 제거 */}
              <p className = "mr-2">
                {formattedStartDate} ~ {formattedEndDate}
              </p>
              <div
                className={`p-1 rounded-lg ${backgroundColorClass} w-20 flex justify-center`}
              >
                <p className="text-white">{travelStatus}</p>
              </div>
            </div>
          </span>
        </div>
        <div className="flex flex-col items-end relative">
          <div className="flex items-center space-x-4 mb-2">
            <button className="flex items-center">
              <IoHeartOutline className="w-6 h-6 text-red-500" />
              <p className="ml-1">({planHeader.markCount})</p>
            </button>
            <button
              ref={shareButtonRef}
              onClick={toggleShareModal}
              className="flex items-center"
            >
              <LuShare2 className="w-6 h-6 text-green" />
            </button>
            <ShareModal
              isOpen={isShareModalOpen}
              onClose={() => setIsShareModalOpen(false)}
              onCopy={copyToClipboard}
              shareButtonRef={shareButtonRef}
            />
          </div>
          <div className="flex items-center space-x-4 mt-5">
            <span className="flex items-center">
              <PiEyesDuotone className="text-2xl transform rotate-180" />
              <p className="ml-1">{planHeader.planCount}</p>
            </span>
            <span className="flex items-center">
              <FaRegComment className="text-2xl" />
              <p className="ml-1">0</p>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
