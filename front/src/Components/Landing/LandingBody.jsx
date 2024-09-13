import { useState } from "react";
import LandingSelectItem from "./LandingSelectItem";

const LandingBody = ({ worldCupIndex, setWorldCupIndex }) => {
  const worldCupList = [
    [
      { image: "", text: "1" },
      { image: "", text: "1" },
    ],
    [
      { image: "", text: "2" },
      { image: "", text: "2" },
    ],
    [
      { image: "", text: "3" },
      { image: "", text: "3" },
    ],
    [
      { image: "", text: "4" },
      { image: "", text: "4" },
    ],
  ];

  const render = () => {
    console.log(worldCupIndex);
    if (worldCupIndex < 4) {
      return worldCupList[worldCupIndex].map((item, index) => {
        return (
          <LandingSelectItem
            key={index}
            item={item}
            setWorldCupIndex={setWorldCupIndex}
          />
        );
      });
    } else {
      return <div>result</div>;
    }
  };

  return <div className="flex gap-20 mx-auto mt-6">{render()}</div>;
};

export default LandingBody;
