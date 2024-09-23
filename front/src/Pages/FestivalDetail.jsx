import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import DetailDescription from '../Components/LocationDetail/DetailDescription';
import DetailInformation from '../Components/LocationDetail/DetailInformation';
import DetailComment from '../Components/LocationDetail/DetailComment';
import FestivalDetailComponent from './FestivalDetail';
import { API_URL, axiosInstance } from '../Stores/API';

export default function FestivalDetail() {
  const { id } = useParams();
  const festivalId = Number(id);
  const url = API_URL.FestivalDetails.replace(':id', festivalId);
  
  const fetchFestivalDetail = async () => {
    const response = await axiosInstance.get(url);
    return response.data;
  };

  const { data: festival, isLoading, isError, refetch } = useQuery({
    queryKey: ["festivalDetail", festivalId],
    queryFn: fetchFestivalDetail,
    enabled: !!festivalId, 
  });

  if (isLoading) return <p>Loading</p>;
  if (isError) return <p>Error loading details</p>;

  const festivalEntity = {
    Title: festival.festivalEntity.festivalTitle,
    Address: festival.festivalEntity.festivalAddress,
    Tel: festival.festivalEntity.festivalTel,
    TotalScore: festival.festivalEntity.festivalTotalScore,
    Views: festival.festivalEntity.festivalViews,
    Mapx: festival.festivalEntity.festivalMapx,
    Mapy: festival.festivalEntity.festivalMapy,
    Firstimage: festival.festivalEntity.festivalFirstimage,
  };

  const description = festival.festivalDescriptionEntity.festivalOverview;
  
  const information = {
    lat: festivalEntity.Mapy,
    lng: festivalEntity.Mapx,
    tel: festivalEntity.Tel,
    address: festivalEntity.Address,
    homepage: festival.festivalDescriptionEntity.festivalHomepage,
    startDate : festival.festivalEntity.festivalStartDate,
    endDate : festival.festivalEntity.festivalEndDate,
  }

  const images = festival.getFestivalImageDto ? [
    festival.getFestivalImageDto.festivalImage1,
    festival.getFestivalImageDto.festivalImage3,
    festival.getFestivalImageDto.festivalImage4,
    festival.getFestivalImageDto.festivalImage5,
    festival.getFestivalImageDto.festivalImage6,
    festival.getFestivalImageDto.festivalImage7,
  ].filter(image => image) : [];

  return (
    <>
      <DetailHeader header={festivalEntity} title = "festival" mark = {festival.markedUserEmails} refetch = {refetch} />
      <DetailSlider images={images} />
      <DetailDescription description = {description} type = "festival"/>
      <DetailInformation information = {information} type = "festival"/>
      <DetailComment
        title = "festival"
        apiEndPoint = {url}
        typeId = {festivalId}
        totalScore = {festivalEntity.TotalScore}
      />
    </>
  );
}
