import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WORLDCUP_RESULT_LIST } from "../../Stores/mockData";
import { useState } from "react";
import Swal from "sweetalert2";

const LandingResult = ({ userSelectList }) => {
  const [list, setList] = useState(WORLDCUP_RESULT_LIST);

  const headerList = [
    ["산을", "바다를"],
    ["활기찬 장소를", "인적 드문 장소를"],
    ["휴양을", "관광을"],
    ["펜션을", "호텔을"],
  ];

  const onClick = (item, e) => {
    if (item.id === null) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "준비중",
        text: "현재 숙박, 음식점의 상세 정보는 제공되지 않습니다.",
        showCloseButton: true,
        timer: 1500,
      });
      return;
    }
  };

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-6">
        {list.map((item, idx) => {
          const content =
            item[userSelectList[idx]][
              Math.floor(Math.random() * item[userSelectList[idx]].length)
            ];
          return (
            <Link
              to={`/destination/${content.id}`}
              key={idx}
              onClick={(e) => onClick(content, e)}
              className="flex flex-col gap-6"
            >
              <h6 className="text-center">
                {headerList[idx][userSelectList[idx]] + " 선택하셨습니다"}
              </h6>
              <motion.img
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                src={content.img}
                alt={headerList[idx][userSelectList[idx]] + " 선택지 후보"}
                className="w-[300px] h-[300px] rounded-xl bg-blue-300 shadow-content object-cover"
              />
              <h6 className="text-center">{content.title}</h6>
            </Link>
          );
        })}
      </div>
      <p className="text-center text-gray-400">
        사진을 클릭하여 더 자세히 알아보세요
      </p>
    </div>
  );
};

export default LandingResult;
