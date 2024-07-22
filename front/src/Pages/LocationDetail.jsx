import { useParams } from 'react-router-dom';
import { axiosInstance, API_URL } from '../Stores/API';
import { useQuery } from '@tanstack/react-query';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import { FaStar } from "react-icons/fa";
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailDescription from '../Components/LocationDetail/DetailDescription';

export default function LocationDetail() {
  const { id } = useParams();

  const fetchLocationDetail = async ({queryKey}) => {
    const [_key, id] = queryKey;
    const response = await axiosInstance.get(`${API_URL.LocationDetail}/${id}`);
    return response.data;
  }

  const {data : detail, error, isLoading} = useQuery({
    queryKey : ["locationDetail", id],
    queryFn : fetchLocationDetail
  })

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading details</p>;

  const images = [
    detail.detail_firstimage,
    detail.detail_firstimage2,
    detail.detail_firstimage3,
    detail.detail_firstimage4,
  ]

  const detailHeader = {
    title : detail.detail_title,
    score : detail.detail_total_score,
    views : detail.detail_views,
    comments : detail.detail_totalComments,
  }

  const description = {
    description : detail.detail_description
  }
  
  return (
    <>
      <DetailHeader header = {detailHeader}/>
      <DetailSlider images = {images}/>
      <DetailDescription description = {description}/>
    </>
  );
}
