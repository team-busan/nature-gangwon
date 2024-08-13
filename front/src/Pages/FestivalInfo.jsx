import React, { useState } from 'react'
import MainImage from '../Components/LocationInfo/MainImage'
import SortButtons from '../Components/LocationInfo/SortButtons'
import LocationList from '../Components/LocationInfo/LocationList'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function FestivalInfo() {
  const [size] = useState(16);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const mainImage = "http://tong.visitkorea.or.kr/cms/resource/07/3112107_image2_1.jpg"

  const fetchFestivalInfo = async ({queryKey}) => {
    const [_key, page] = queryKey;

  }

  const {data, error, isLoading} = useQuery({
    queryKey : ["festivalInfo", page],
    queryFn : fetchFestivalInfo,
    keepPreviousData : true,
  })
  return (
    <section>
      <MainImage image = {mainImage}/>
      <SortButtons/>
      <LocationList/>
    </section>
  )
}
