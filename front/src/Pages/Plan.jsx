import { useState } from "react";

import PlanStatusBar from "../Components/Plan/PlanStatusBar";
import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);

  return (
    <div className="relative w-full flex justify-center">
      <PlanStatusBar planStage={planStage} setPlanStage={setPlanStage} />
      {planStage === 0 ? (
        <PlanCalendar
          setPlanStage={setPlanStage}
          dates={dates}
          setDates={setDates}
        />
      ) : planStage === 1 ? (
        <PlanBuild setPlanStage={setPlanStage} />
      ) : (
        <PlanPhotos setPlanStage={setPlanStage} />
      )}
    </div>
  );
};

export default Plan;
