import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";
import { MdDragHandle } from "react-icons/md";

const PlanStatusBar = ({ planStage, setPlanStage }) => {
  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();

  const variants = {
    active: { scale: 1.2 },
    inactive: { scale: 1 },
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
      <div className="flex bg-blue-200 rounded-r-xl">
        <div>content</div>
        <div className="flex justify-center items-center">
          <MdDragHandle className="text-2xl rotate-90 cursor-col-resize" />
        </div>
      </div>
    </div>
  );
};

export default PlanStatusBar;
