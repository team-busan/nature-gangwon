import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAnimationControls } from "framer-motion";

import PlanStatusBar from "../Components/Plan/PlanStatusBar";
import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuild from "../Components/Plan/PlanBuild";
import PlanPhotos from "../Components/Plan/PlanPhotos";

import { useRecoilState } from "recoil";
import {
  searchQueryState,
  contentTypeState,
  sigunguCodeState,
  pageState,
  optionChangedState,
} from "../state/planSearchQueryStates";

const Plan = () => {
  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [foldStage, setFoldStage] = useState(1);
  const [dataState, setDataState] = useState([]);

  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [contentType, setContentType] = useRecoilState(contentTypeState);
  const [sigunguCode, setSigunguCode] = useRecoilState(sigunguCodeState);
  const [page, setPage] = useRecoilState(pageState);
  const [optionChanged, setOptionChanged] = useRecoilState(optionChangedState);

  const control1 = useAnimationControls();
  const control2 = useAnimationControls();
  const control3 = useAnimationControls();
  const foldControl = useAnimationControls();

  const getLocationsInfo = async () => {
    const res = await axios.get(
      `http://localhost:8000/location/list?${
        contentType ? "&locationContenttypeid=" + contentType : ""
      }${
        sigunguCode ? "&locationSigungucode=" + sigunguCode : ""
      }&page=${page}&size=50`
    );
    return res.data.locationList;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["planContent"],
    queryFn: getLocationsInfo,
  });

  useEffect(() => {
    if (data) {
      if (optionChanged) {
        setDataState(data);
      } else {
        setDataState((prev) => [...prev, ...data]);
      }
      setPage((prev) => prev + 1);
    }
  }, [data]);

  useEffect(() => {
    const loadData = async () => {
      await refetch();
    };
    loadData();
    setOptionChanged(false);
  }, [optionChanged]);
  // 작업중인 코드

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
          planStage={planStage}
          setPlanStage={setPlanStage}
          dates={dates}
          setDates={setDates}
          setFoldStage={setFoldStage}
        />
      ) : planStage === 1 ? (
        <PlanBuild
          foldStage={foldStage}
          setFoldStage={setFoldStage}
          foldControl={foldControl}
          dates={dates}
          data={dataState}
          handleFold={handleFold}
          refetch={refetch}
          curData={data}
        />
      ) : (
        <PlanPhotos setPlanStage={setPlanStage} />
      )}
    </div>
  );
};

export default Plan;
