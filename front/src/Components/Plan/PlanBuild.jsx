import { motion } from "framer-motion";

import NaverMapWithMarkers from "../NaverMapWithMarkers.js";
import PlanSearch from "./PlanSearch";
import PlanMySelect from "./PlanMySelect";
import { FaAngleLeft } from "react-icons/fa6";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { planList, mapDisplayPlansState } from "../../state/planState.js";
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
  const [mapDisplayPlans, setMapDisplayPlans] =
    useRecoilState(mapDisplayPlansState);

  const markerColors = [
    { marker: "#1E3A8A", text: "#FFFFFF" }, // Navy Blue
    { marker: "#B22222", text: "#FFFFFF" }, // Brick Red
    { marker: "#FFD700", text: "#000000" }, // Golden Yellow
    { marker: "#228B22", text: "#FFFFFF" }, // Forest Green
    { marker: "#6A0DAD", text: "#FFFFFF" }, // Royal Purple
  ];

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
    <div className="h-lvh w-full relative">
      <motion.div
        variants={foldVariants}
        animate={foldControl}
        className={`absolute left-[150px] top-0 z-[101] flex justify-between items-center bg-white rounded-r-xl ${
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
        <div
          onClick={handleFold}
          className="bg-white w-10 h-20 rounded-r-xl flex items-center justify-center cursor-pointer"
        >
          <motion.div
            variants={arrowVariants}
            animate={foldControl}
            className="shrink-0 ml-1 w-8 h-8 rounded-full bg-white flex justify-center items-center"
          >
            <FaAngleLeft className="text-2xl rotate-180" />
          </motion.div>
        </div>
      </motion.div>
      <div className={`absolute top-0 left-[120px]`}>
        <NaverMapWithMarkers
          width={"calc(100vw - 130px)"}
          height={"100vh"}
          locations={mapDisplayPlans}
          markerColors={markerColors}
        />
      </div>
    </div>
  );
};

export default PlanBuild;
