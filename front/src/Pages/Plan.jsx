import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, API_URL } from "../Stores/API.js";

import PlanStatusBar from "../Components/Plan/PlanStatusBar";
import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [foldStage, setFoldStage] = useState(1);
  const [selectedList, setSelectedList] = useState([[]]);

  const getLocationsInfo = async () => {
    const res = await axiosInstance.get(API_URL.SEARCH);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["planContent"],
    queryFn: getLocationsInfo,
  });

  return (
    <div className="relative w-full flex justify-center">
      <PlanStatusBar
        planStage={planStage}
        setPlanStage={setPlanStage}
        foldStage={foldStage}
        setFoldStage={setFoldStage}
        dates={dates}
        data={data}
      />

      {planStage === 0 ? (
        <PlanCalendar
          setPlanStage={setPlanStage}
          dates={dates}
          setDates={setDates}
          setFoldStage={setFoldStage}
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
