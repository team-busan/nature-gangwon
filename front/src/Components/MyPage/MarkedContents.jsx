import { useState } from "react";
import { motion } from "framer-motion";

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

  return (
    <div>
      <div className="grid grid-cols-3">
        <ContentSelect
          title="계획"
          contentNum={contentNum}
          setContentNum={setContentNum}
        />
        <ContentSelect
          title="관광지"
          contentNum={contentNum}
          setContentNum={setContentNum}
        />
        <ContentSelect
          title="축제"
          contentNum={contentNum}
          setContentNum={setContentNum}
        />
      </div>
    </div>
  );
};

export default MarkedContents;
