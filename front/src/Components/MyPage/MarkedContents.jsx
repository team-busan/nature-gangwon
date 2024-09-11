import { useState } from "react";
import { motion } from "framer-motion";
import MarkedPlans from "./MarkedPlans";
import MarkedLocations from "./MarkedLocations";
import MarkedFestivals from "./MarkedFestivals";

const ContentSelect = ({ title, contentNum, setContentNum }) => {
  return (
    <motion.div
      layout
      onClick={() => setContentNum(title)}
      className="cursor-pointer relative"
    >
      <div className="text-center py-2">{title}</div>
      <div className="bg-gray-200 w-full h-1"></div>
      {contentNum === title && (
        <motion.div
          layoutId="underline"
          className="bg-paleGreen w-full h-1 absolute bottom-0 left-0"
        ></motion.div>
      )}
    </motion.div>
  );
};

const MarkedContents = () => {
  const [contentNum, setContentNum] = useState("계획");

  const render = () => {
    if (contentNum === "계획") {
      return <MarkedPlans />;
    } else if (contentNum === "관광지") {
      return <MarkedLocations />;
    } else if (contentNum === "축제") {
      return <MarkedFestivals />;
    }
  };

  const selectList = ["계획", "관광지", "축제"];

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3">
        {selectList.map((item, idx) => (
          <ContentSelect
            key={idx}
            title={item}
            contentNum={contentNum}
            setContentNum={setContentNum}
          />
        ))}
      </div>
      <div className="mt-6">{render()}</div>
    </div>
  );
};

export default MarkedContents;
