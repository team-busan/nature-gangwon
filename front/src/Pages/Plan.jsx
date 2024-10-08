import { useState, useEffect } from "react";
import { useAnimationControls } from "framer-motion";

import PlanStatusBar from "../Components/Plan/PlanStatusBar";
import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";
import PlanChooseThumbnail from "../Components/Plan/PlanChooseThumbnail";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [foldStage, setFoldStage] = useState(1);

  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const control4 = useAnimationControls();
  const foldControl = useAnimationControls();

  useEffect(() => {
    if (planStage === 0) {
      control1.start("active");
      control2.start("inactive");
      control3.start("inactive");
      control4.start("inactive");
    } else if (planStage === 1) {
      control1.start("inactive");
      control2.start("active");
      control3.start("inactive");
      control4.start("inactive");
    } else if (planStage === 2) {
      control1.start("inactive");
      control2.start("inactive");
      control3.start("active");
      control4.start("inactive");
    } else {
      control1.start("inactive");
      control2.start("inactive");
      control3.start("inactive");
      control4.start("active");
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

  const render = () => {
    if (planStage === 0) {
      return (
        <PlanCalendar
          planStage={planStage}
          setPlanStage={setPlanStage}
          dates={dates}
          setDates={setDates}
          setFoldStage={setFoldStage}
        />
      );
    } else if (planStage === 1) {
      return (
        <PlanBuild
          foldStage={foldStage}
          setFoldStage={setFoldStage}
          foldControl={foldControl}
          dates={dates}
          handleFold={handleFold}
          setPlanStage={setPlanStage}
        />
      );
    } else if (planStage === 2) {
      return <PlanPhotos setPlanStage={setPlanStage} />;
    } else {
      return <PlanChooseThumbnail setPlanStage={setPlanStage} dates={dates} />;
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
        control4={control4}
      />
      {render()}
    </div>
  );
};

export default Plan;
