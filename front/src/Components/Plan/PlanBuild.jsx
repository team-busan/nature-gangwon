import { motion } from "framer-motion";

import NaverMap from "../NaverMap.js";
import PlanSearch from "./PlanSearch";
import PlanMySelect from "./PlanMySelect";
import { MdArrowBackIos } from "react-icons/md";
import { PLAN_STATUSBAR_WIDTH } from "../../Constants/constants.js";

const PlanBuild = ({ foldStage, foldControl, dates, data, handleFold }) => {
  const lat = "37.5665";
  const lng = "126.9780";

  const foldVariants = {
    fold: { width: "0px", paddingLeft: 0 },
    open: { width: "400px", paddingLeft: "1.5rem" },
    openWide: { width: "800px", paddingLeft: "1.5rem" },
  };

  const arrowVariants = {
    fold: { rotate: 0 },
    open: { rotate: 0 },
    openWide: { rotate: 180 },
  };

  return (
    <div className={`h-lvh w-full relative`}>
      <motion.div
        variants={foldVariants}
        animate={foldControl}
        className={`absolute left-[121px] top-0 z-50 flex justify-between bg-white rounded-r-xl w-[400px] h-lvh py-4 pl-4 pr-8 shadow-lightGreen`}
      >
        <PlanSearch foldStage={foldStage} dates={dates} data={data} />
        {foldStage === 2 ? <PlanMySelect /> : null}
        <div className="relative">
          <motion.div
            variants={arrowVariants}
            animate={foldControl}
            className={`absolute ${
              foldStage === 0 ? "-right-6" : "-right-6"
            } top-1/2`}
          >
            <MdArrowBackIos
              className={`text-2xl cursor-pointer rotate-180`}
              onClick={handleFold}
            />
          </motion.div>
        </div>
      </motion.div>
      <div className={`absolute top-0 left-[${PLAN_STATUSBAR_WIDTH}px]`}>
        <NaverMap
          lat={lat}
          lng={lng}
          width={"calc(100vw - 130px)"}
          height={"100vh"}
        />
      </div>
    </div>
  );
};

export default PlanBuild;
