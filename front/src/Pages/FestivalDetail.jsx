import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { festival_detail } from '../Stores/mockData';
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import DetailDescription from '../Components/LocationDetail/DetailDescription';
import DetailInformation from '../Components/LocationDetail/DetailInformation';
import DetailComment from '../Components/LocationDetail/DetailComment';

export default function FestivalDetail() {
  const { id } = useParams();
  const festivalId = Number(id);
  
  const fetchFestivalDetail = async () => {
    // festivalEntity에서 festivalId를 필터링하여 반환
    if (festival_detail.festivalEntity.festivalId === festivalId) {
      return festival_detail;
    } else {
      throw new Error("Festival not found");
    }
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
      <DetailHeader header={festivalEntity} />
      <DetailSlider images={images} />
      <DetailDescription description = {description} type = "festival"/>
      <DetailInformation information = {information} type = "festival"/>
      <DetailComment
        comments = {festival.festivalCommentList}
        refetchComments={refetch}
      />
    </>
  );
}
