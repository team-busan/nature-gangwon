import { Link } from "react-router-dom";

const LandingResult = ({ userSelectList }) => {
  const headerList = [
    ["산을", "바다를"],
    ["활기찬 장소를", "인적 드문 장소를"],
    ["휴양을", "관광을"],
    ["펜션을", "호텔을"],
  ];

  const resultList = [
    [[{ img: "", id: 1 }], [{ img: "", id: 2 }]],
    [[{ img: "", id: 3 }], [{ img: "", id: 4 }]],
    [[{ img: "", id: 5 }], [{ img: "", id: 6 }]],
    [[{ img: "", id: 7 }], [{ img: "", id: 8 }]],
  ];

  return (
    <div className="flex flex-col gap-16">
      <div className="flex gap-6">
        {resultList.map((item, idx) => {
          return (
            <Link
              to={`/destination/${item[userSelectList[idx]][0].id}`}
              key={idx}
              className="flex flex-col gap-6"
            >
              <h6 className="text-center">
                {headerList[idx][userSelectList[idx]] + " 선택하셨습니다"}
              </h6>
              <img
                src={item[userSelectList[idx]][0].img}
                alt={headerList[idx][userSelectList[idx]] + " 선택지 후보"}
                className="w-[300px] h-[300px] rounded-xl bg-blue-300 shadow-content"
              />
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
