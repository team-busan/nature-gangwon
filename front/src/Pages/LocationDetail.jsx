import { useParams } from 'react-router-dom';
import { axiosInstance, API_URL } from '../Stores/API';
import { useQuery } from '@tanstack/react-query';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import { FaStar } from "react-icons/fa";
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailDescription from '../Components/LocationDetail/DetailDescription';
import DetailInformation from '../Components/LocationDetail/DetailInformation';
import DetailComment from '../Components/LocationDetail/DetailComment';

export default function LocationDetail() {
  const { id } = useParams();

  const fetchLocationDetail = async ({ queryKey }) => {
    const [_key, id] = queryKey;
    const response = await axiosInstance.get(`${API_URL.LocationDetail}/${id}`);
    return response.data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["locationDetail", id],
    queryFn: fetchLocationDetail
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading details</p>;

  const {
    detail_title,
    detail_firstimage,
    detail_firstimage2,
    detail_firstimage3,
    detail_firstimage4,
    detail_total_score,
    detail_views,
    detail_totalComments,
    detail_description,
    detail_tel,
    detail_homepage,
    detail_address,
  } = data.detail;

  const images = [
    detail_firstimage,
    detail_firstimage2,
    detail_firstimage3,
    detail_firstimage4,
  ];

  const detailHeader = {
    title: detail_title,
    score: detail_total_score,
    views: detail_views,
    comments: detail_totalComments,
  };

  const description = {
    description: detail_description
  };

  const information = {
    tel: detail_tel,
    homepage: detail_homepage,
    address: detail_address,
  };

  const comments = data.comments; // 댓글 데이터

  return (
    <>
      <DetailHeader header={detailHeader} />
      <DetailSlider images={images} />
      <DetailDescription description={description} />
      <DetailInformation information={information} />
      <DetailComment comments={comments} />
    </>
  );
}
