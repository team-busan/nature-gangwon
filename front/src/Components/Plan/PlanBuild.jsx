import { motion } from "framer-motion";

import NaverMap from "../NaverMap.js";
import PlanSearch from "./PlanSearch";
import PlanMySelect from "./PlanMySelect";
import { MdArrowBackIosNew } from "react-icons/md";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { planList } from "../../state/planState.js";
import { alertState } from "../../state/alertState.js";

const PlanBuild = ({
  foldStage,
  setFoldStage,
  foldControl,
  dates,
  data,
  handleFold,
  refetch,
  curData,
  setPlanStage,
}) => {
  const [plans, setPlans] = useRecoilState(planList);
  const [message, setMessage] = useRecoilState(alertState);
  const lat = "37.8228";
  const lng = "128.1555";

  const foldVariants = {
    fold: { width: "0px", paddingLeft: 0 },
    open: { width: "500px", paddingLeft: "1.5rem" },
    openWide: { width: "1000px", paddingLeft: "1.5rem" },
  };

  const arrowVariants = {
    fold: { rotate: 0 },
    open: { rotate: 0 },
    openWide: { rotate: 180 },
  };

  useEffect(() => {
    if (plans[0].length === 0) {
      setFoldStage(1);
    } else {
      setFoldStage(2);
    }
  }, []);

  useEffect(() => {
    if (message) {
      setFoldStage(2);
    }
  }, [message]);

  return (
    <div className={`h-lvh w-full relative`}>
      <motion.div
        variants={foldVariants}
        animate={foldControl}
        className={`absolute left-[120px] top-0 z-[101] flex justify-between items-center bg-white rounded-r-xl ${
          foldStage === 1 ? "w-[500px]" : "w-[1000px]"
        } h-lvh py-4 pl-6 shadow-lightGreen`}
      >
        <PlanSearch
          foldStage={foldStage}
          setFoldStage={setFoldStage}
          dates={dates}
          data={data}
          refetch={refetch}
          curData={curData}
        />
        {foldStage === 2 ? <PlanMySelect setPlanStage={setPlanStage} /> : null}
        <motion.div
          variants={arrowVariants}
          animate={foldControl}
          className="shrink-0 ml-1 w-8 h-8 rounded-full bg-white flex justify-center items-center"
        >
          <MdArrowBackIosNew
            className={`text-2xl cursor-pointer rotate-180`}
            onClick={handleFold}
          />
        </motion.div>
      </motion.div>
      <div className={`absolute top-0 left-[120px]`}>
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
