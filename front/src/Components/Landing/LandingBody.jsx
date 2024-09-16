import { useState } from "react";
import LandingSelectItem from "./LandingSelectItem";
import LandingResult from "./LandingResult";

const LandingBody = ({ worldCupIndex, setWorldCupIndex }) => {
  const [userSelectList, setUserSelectList] = useState([-1, -1, -1, -1]);

  const worldCupList = [
    [
      {
        image: "",
        text: "산은 자연의 아름다움과 고요함을 제공하며, 하이킹과 등산으로 모험과 힐링을 즐길 수 있는 장소입니다.",
      },
      {
        image: "",
        text: "바다는 끝없는 수평선과 맑은 물, 다양한 해양 생물로 가득한 휴식과 레저의 공간입니다.",
      },
    ],
    [
      {
        image: "",
        text: "활기찬 장소는 사람들로 붐비며, 다양한 활동과 즐길 거리가 가득합니다.",
      },
      {
        image: "",
        text: "인적 드문 곳은 고요하고 한적하며, 조용히 휴식을 취할 수 있는 공간입니다.",
      },
    ],
    [
      {
        image: "",
        text: "휴양은 편안한 환경에서 휴식과 재충전을 목적으로 하는 활동입니다.",
      },
      {
        image: "",
        text: "관광은 새로운 장소를 방문하여 문화와 명소를 체험하는 활동입니다.",
      },
    ],
    [
      {
        image: "",
        text: "펜션은 자연 속에서 편안한 숙박과 휴식을 제공하는 아늑한 숙소입니다.",
      },
      {
        image: "",
        text: "호텔은 다양한 편의시설과 서비스를 제공하는 고급 숙박 시설입니다.",
      },
    ],
  ];

  const render = () => {
    if (worldCupIndex < 4) {
      return worldCupList[worldCupIndex].map((item, index) => {
        return (
          <LandingSelectItem
            key={index}
            item={item}
            index={index}
            worldCupIndex={worldCupIndex}
            setWorldCupIndex={setWorldCupIndex}
            setUserSelectList={setUserSelectList}
          />
        );
      });
    } else {
      return <LandingResult userSelectList={userSelectList} />;
    }
  };

  return <div className="flex gap-20 mx-auto mt-6">{render()}</div>;
};

export default LandingBody;
