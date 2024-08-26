import React, { useState, useRef } from "react";
import { FaStar } from "react-icons/fa";
import { IoHeartOutline } from "react-icons/io5";
import { LuShare2 } from "react-icons/lu";
import { PiEyesDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import ShareModal from "../Comment/ShareModal";

export default function DetailHeader({ header }) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const shareButtonRef = useRef(null);

  const toggleShareModal = () => {
    // 모달이 열려 있는 상태에서 버튼을 클릭하면 모달을 닫기만 한다
    setIsShareModalOpen((prev) => !prev);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!");
  };

  return (
    <section className="w-1420 flex flex-col p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex justify-between w-full">
          <span>
            <h1 className="flex text-darkGreen">{header.Title}</h1>
          </span>
          <div className="flex gap-3 relative">
            <button className="">
              <IoHeartOutline className="w-6 h-6 text-red-500" />
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
          <p>0</p>
        </span>
      </div>
      <div className="flex justify-center w-full mt-3">
        <hr className="border-t-2 bg-gray-600 w-full" />
      </div>
    </section>
  );
}