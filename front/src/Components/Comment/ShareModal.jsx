import React, { useRef, useEffect } from "react";
import { SiNaver } from "react-icons/si";
import { MdContentCopy } from "react-icons/md";
import { RiKakaoTalkFill } from "react-icons/ri";

export default function ShareModal({ isOpen, onClose, onCopy, shareButtonRef }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // 공유 버튼과 모달 외부를 클릭했을 때만 모달을 닫음
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, shareButtonRef]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={modalRef}
      className="absolute top-full mt-2 right-0 bg-white border border-gray-300 rounded shadow-lg p-4 z-10 w-36"
    >
      <h2 className="text-base font-semibold mb-2">공유하기</h2>
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          <button
            className="flex items-center justify-center w-10 h-10 bg-yellow-300 rounded-full"
            onClick={() => {
              window.open(
                `https://story.kakao.com/share?url=${window.location.href}`,
                "_blank"
              );
              onClose();
            }}
          >
            <RiKakaoTalkFill className="w-6 h-6 text-brown-700" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-green rounded-full"
            onClick={() => {
              window.open(
                `https://share.naver.com/web/shareView.nhn?url=${window.location.href}`,
                "_blank"
              );
              onClose();
            }}
          >
            <SiNaver className="w-6 h-6 text-white" />
          </button>
        </div>
        <button
          className="flex items-center gap-2 p-2 bg-gray-200 rounded"
          onClick={() => {
            onCopy();
            onClose();
          }}
        >
          <MdContentCopy className="w-5 h-5 text-gray-600" />
          <span className="text-sm">링크 복사</span>
        </button>
      </div>
    </div>
  );
}
