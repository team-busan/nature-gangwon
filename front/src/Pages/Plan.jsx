import { useState } from "react";

import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);

  if (planStage === 0) {
    return <PlanCalendar setPlanStage={setPlanStage} />;
  } else if (planStage === 1) {
    return <PlanBuild setPlanStage={setPlanStage} />;
  } else {
    return <PlanPhotos setPlanStage={setPlanStage} />;
  }
};

export default Plan;
