import { useState } from "react";
import LandingSelectItem from "./LandingSelectItem";
import LandingResult from "./LandingResult";
import { WORLDCUP_SELECT_LIST } from "../../Stores/mockData";

const LandingBody = ({ worldCupIndex, setWorldCupIndex }) => {
  const [userSelectList, setUserSelectList] = useState([-1, -1, -1, -1]);
  const [list, setList] = useState(WORLDCUP_SELECT_LIST);

  const render = () => {
    if (worldCupIndex < 4) {
      return list[worldCupIndex].map((item, index) => {
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
