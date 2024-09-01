import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL, axiosInstance } from "../Stores/API";
import NaverMapWithMarkers from "./../Components/NaverMapWithMarkers";
import PlanDetailHeader from "../Components/Plan/PlanDetailHeader";
import PlanDetailMap from "../Components/Plan/PlanDetailMap";

export default function PlanDetail() {
  const { id } = useParams();
  const planId = Number(id);

  const fetchPlanDetail = async () => {
    const url = API_URL.PlanDetail.replace(":id", planId);
    const response = await axiosInstance.get(url);
    return response.data;
  };

  const {
    data: planDetail,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["planDetail", planId],
    queryFn: fetchPlanDetail,
    enabled: !!planId,
  });

  const [selectedDay, setSelectedDay] = useState(1);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading plan details.</div>;

  const places = planDetail.getPlaceListItemDto;
  const planHeader = planDetail.planEntity;

  // 선택된 dayNumber에 해당하는 장소들만 필터링
  const filteredPlaces = places.filter(
    (place) => place.dayNumber === selectedDay
  );

  // 사용 가능한 dayNumber 리스트를 추출하고 중복 제거
  const availableDays = [...new Set(places.map((place) => place.dayNumber))];

  console.log(availableDays);

  return (
    <>
      <PlanDetailHeader
        planHeader={planHeader}
        selectedDay={selectedDay}
        availableDays={availableDays}
        setSelectedDay={setSelectedDay}
      />
      <PlanDetailMap
        locations={filteredPlaces}
      />
      <div className=""></div>
      <div>
        <div></div>
      </div>
    </>
  );
}
