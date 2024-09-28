import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL, axiosInstance } from "../Stores/API";
import PlanDetailHeader from "../Components/Plan/PlanDetailHeader";
import PlanDetailMap from "../Components/Plan/PlanDetailMap";
import { userState } from "../state/userState";
import { useRecoilState } from "recoil";
import PlanDetailPhoto from "../Components/Plan/PlanDetailPhoto";
import DetailComment from "../Components/LocationDetail/DetailComment";

export default function PlanDetail() {
  const [user] = useRecoilState(userState);
  const { id } = useParams();
  const planId = Number(id);
  const url = API_URL.PlanDetail.replace(":id", planId);

  const fetchPlanDetail = async () => {
    const response = await axiosInstance.get(url);
    return response.data;
  };


  const {
    data: planDetail,
    isLoading: isPlanLoading,
    isError: isPlanError,
    refetch: refetchPlan,
  } = useQuery({
    queryKey: ["planDetail", planId],
    queryFn: fetchPlanDetail,
    enabled: !!planId,
  });

  const markerColors = [
    { marker: "#1E3A8A", text: "#FFFFFF" },
    { marker: "#B22222", text: "#FFFFFF" },
    { marker: "#FFD700", text: "#000000" },
    { marker: "#228B22", text: "#FFFFFF" },
    { marker: "#6A0DAD", text: "#FFFFFF" },
  ];

  const [selectedDay, setSelectedDay] = useState(1);

  if (isPlanLoading) return <div>Loading...</div>;
  if (isPlanError) return <div>Error loading data.</div>;

  const places = planDetail.getPlaceListItemDto;
  const planHeader = planDetail.planEntity;
  const planMarkUserEmails = planDetail.markedUserEmails;

  const filteredPlaces = places.filter(
    (place) => place.dayNumber === selectedDay
  );

  const availableDays = [...new Set(places.map((place) => place.dayNumber))];
  const writer = user && planHeader && user.userEmail === planHeader.userEmail;


  return (
    <>
      <PlanDetailHeader planHeader={planHeader} planId = {planId} planMarkUserEmails = {planMarkUserEmails} />
      <PlanDetailMap
        markerColors={markerColors}
        planHeader={planHeader}
        selectedDay={selectedDay}
        availableDays={availableDays}
        setSelectedDay={setSelectedDay}
        locations={filteredPlaces}
        writer={writer}
      />
      <PlanDetailPhoto
        locations={filteredPlaces}
        planHeader={planHeader}
        markerColors={markerColors}
      />
      <DetailComment
        apiEndPoint={url}
        Id = {planDetail.planEntity.planId}
        title="plan"
        typeId = {planId}
      />
    </>
  );
}
