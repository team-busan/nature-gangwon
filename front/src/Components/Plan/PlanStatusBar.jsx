import { useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";

import { MdArrowBackIos } from "react-icons/md";

import PlanSearch from "./PlanSearch";
import PlanMySelect from "./PlanMySelect";

const PlanStatusBar = ({
  planStage,
  setPlanStage,
  foldStage,
  setFoldStage,
  dates,
  data,
}) => {
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const foldControl = useAnimationControls();

  const variants = {
    active: { scale: 1.2 },
    inactive: { scale: 1 },
  };

  const foldVariants = {
    fold: { width: "min-content", paddingLeft: 0 },
    open: { width: "400px", paddingLeft: "1.5rem" },
    openWide: { width: "800px", paddingLeft: "1.5rem" },
  };

  const arrowVariants = {
    fold: { rotate: 0 },
    open: { rotate: 0 },
    openWide: { rotate: 180 },
  };

  useEffect(() => {
    if (planStage === 0) {
      control1.start("active");
      control2.start("inactive");
      control3.start("inactive");
    } else if (planStage === 1) {
      control1.start("inactive");
      control2.start("active");
      control3.start("inactive");
    } else {
      control1.start("inactive");
      control2.start("inactive");
      control3.start("active");
    }
  }, [planStage]);

  useEffect(() => {
    if (foldStage === 0) {
      foldControl.start("fold");
    } else if (foldStage === 1) {
      foldControl.start("open");
    } else {
      foldControl.start("openWide");
    }
  }, [foldStage]);

  const handleFold = () => {
    if (foldStage === 0) {
      setFoldStage(1);
    } else if (foldStage === 1) {
      setFoldStage(2);
    } else {
      setFoldStage(0);
    }
  };

  useEffect(() => {
    console.log(foldStage);
  }, [foldStage]);

  return (
    <div className="absolute left-0 top-0 h-full z-[101] bg-lightGreen flex rounded-r-xl">
      <div className="flex flex-col h-full gap-10">
        <motion.div
          animate={control1}
          variants={variants}
          onClick={() => setPlanStage(0)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 0 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          1. 날짜 선택
        </motion.div>
        <motion.div
          animate={control2}
          variants={variants}
          onClick={() => setPlanStage(1)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 1 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          2. 장소 선택
        </motion.div>
        <motion.div
          animate={control3}
          variants={variants}
          onClick={() => setPlanStage(2)}
          className={`cursor-pointer p-6 w-full  ${
            planStage === 2 ? "text-paleGreen" : "text-gray-400"
          }`}
        >
          3. 사진 추가
        </motion.div>
      </div>
      {planStage === 1 ? (
        <motion.div
          variants={foldVariants}
          animate={foldControl}
          className="flex justify-between bg-white rounded-r-xl py-6 px-8 w-[400px]"
        >
          <PlanSearch foldStage={foldStage} dates={dates} data={data} />
          {foldStage === 2 ? <PlanMySelect /> : null}
          <div className="relative">
            <motion.div
              variants={arrowVariants}
              animate={foldControl}
              className={`absolute ${
                foldStage === 0 ? "-right-6" : "-right-8"
              } top-1/2`}
            >
              <MdArrowBackIos
                className={`text-2xl cursor-pointer rotate-180`}
                onClick={handleFold}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export default PlanStatusBar;
