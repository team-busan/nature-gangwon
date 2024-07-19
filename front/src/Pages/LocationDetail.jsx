import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance, API_URL } from '../Stores/API';
import LocationImage from '../Components/LocationDetail/LocationImage';

export default function LocationDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance.get(`${API_URL.LocationDetail}/${id}`)
      .then(response => {
        setDetail(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading details</p>;

  return (
    <div className = "w-full">
      <LocationImage image = {detail.detail_firstimage}/>
{/*       <h1>{detail.detail_title}</h1>
      <p>{detail.detail_address}</p>
      <p>{detail.detail_total_score}</p>
      <img src={detail.detail_firstimage2} alt={detail.detail_title} />
      <p>{detail.detail_totalComments} comments</p> */}
    </div>
  );
}
