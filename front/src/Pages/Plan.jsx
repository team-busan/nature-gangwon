import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, API_URL } from "../Stores/API.js";
import { useAnimationControls } from "framer-motion";
import { differenceInDays } from "date-fns";

import PlanStatusBar from "../Components/Plan/PlanStatusBar";
import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";

import { useRecoilState } from "recoil";
import { planList } from "../atoms.js";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [foldStage, setFoldStage] = useState(1);

  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const foldControl = useAnimationControls();

  const [plans, setPlans] = useRecoilState(planList);

  useEffect(() => {
    console.log(plans);
  }, [plans]);

  const getLocationsInfo = async () => {
    const res = await axiosInstance.get(API_URL.SEARCH);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["planContent"],
    queryFn: getLocationsInfo,
  });

  useEffect(() => {
    if (planStage === 1) {
      const days = differenceInDays(dates[1], dates[0]);
      console.log(days);
      let emptyList = [];
      for (let i = 0; i <= days; i++) {
        emptyList.push([]);
      }
      setPlans(emptyList);
    }
  }, [planStage]);

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

  return (
    <div className="relative w-full flex justify-center">
      <PlanStatusBar
        planStage={planStage}
        setPlanStage={setPlanStage}
        control1={control1}
        control2={control2}
        control3={control3}
      />

      {planStage === 0 ? (
        <PlanCalendar
          setPlanStage={setPlanStage}
          dates={dates}
          setDates={setDates}
          setFoldStage={setFoldStage}
        />
      ) : planStage === 1 ? (
        <PlanBuild
          foldStage={foldStage}
          foldControl={foldControl}
          dates={dates}
          data={data}
          handleFold={handleFold}
        />
      ) : (
        <PlanPhotos setPlanStage={setPlanStage} />
      )}
    </div>
  );
};

export default Plan;
