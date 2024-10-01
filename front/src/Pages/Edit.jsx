import { useState, useEffect } from "react";
import { useAnimationControls } from "framer-motion";

import PlanCalendar from "../Components/Plan/PlanCalendar";
import PlanBuildEdit from "../Components/Plan/PlanBuildEdit";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";
import {
  prevMapDisplayPlansState,
  prevPlanState,
  prevPlanTitleState,
} from "../state/editState";
import { userState } from "../state/userState";
import PlanPhotosEdit from "../Components/Plan/PlanPhotosEdit";
import PlanStatusBarEdit from "../Components/Plan/PlanStatusBarEdit";
import PlanChooseThumbnailEdit from "../Components/Plan/PlanChooseThumbnailEdit";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  const [prevPlan, setPrevPlan] = useState({});
  const [plan, setPlan] = useRecoilState(prevPlanState);
  const [title, setTitle] = useRecoilState(prevPlanTitleState);
  const [mapDisplayPlans, setMapDisplayPlans] = useRecoilState(
    prevMapDisplayPlansState
  );

  const getPlanData = async () => {
    const res = await axios.get(`https://nature-gangwon.shop/plan/${id}`);
    if (res.data.planEntity.userEmail !== user.userEmail) {
      navigate("/");
    }
    setPrevPlan(res.data);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["planEdit"],
    queryFn: getPlanData,
  });

  const [planStage, setPlanStage] = useState(0);
  const [dates, setDates] = useState([new Date(), new Date()]);
  const [foldStage, setFoldStage] = useState(1);

  useEffect(() => {
    if (prevPlan) {
      if (prevPlan.planEntity) {
        setDates([prevPlan.planEntity.startDate, prevPlan.planEntity.endDate]);
        setTitle(prevPlan.planEntity.planTitle);
      }
    }

    if (prevPlan) {
      if (prevPlan.getPlaceListItemDto) {
        const ary = [];
        prevPlan.getPlaceListItemDto.forEach((item, idx) => {
          if (!ary[item.dayNumber - 1]) {
            ary.push([]);
          }

          const obj = {
            locationAdd1: item.placeAdd1,
            locationBasedId: item.locationBasedId,
            locationContenttypeid: item.locationContenttypeid,
            locationFirstimage: item.locationFirstimage,
            locationFirstimage2: "",
            locationMapx: item.mapx,
            locationMapy: item.mapy,
            locationTitle: item.title,
            memo: item.note,
            memo2: item.note2,
            photoUrls: item.photoUrls,
          };

          ary[item.dayNumber - 1].push(obj);
        });

        setPlan([...ary]);

        const mapDisplayArray = [];
        prevPlan.getPlaceListItemDto.forEach((item) => {
          const displayObject = {
            mapx: item.mapx,
            mapy: item.mapy,
            title: item.title,
            photoUrls: [item.locationFirstimage],
          };
          mapDisplayArray.push(displayObject);
        });
        setMapDisplayPlans([...mapDisplayArray]);
      }
    }
  }, [prevPlan]);

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
        <PlanBuildEdit
          foldStage={foldStage}
          setFoldStage={setFoldStage}
          foldControl={foldControl}
          dates={dates}
          handleFold={handleFold}
          setPlanStage={setPlanStage}
        />
      );
    } else if (planStage === 2) {
      return <PlanPhotosEdit setPlanStage={setPlanStage} />;
    } else {
      return (
        <PlanChooseThumbnailEdit setPlanStage={setPlanStage} dates={dates} />
      );
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <PlanStatusBarEdit
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

export default Edit;
