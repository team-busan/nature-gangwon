import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailDescription from '../Components/LocationDetail/DetailDescription';
import DetailInformation from '../Components/LocationDetail/DetailInformation';
import { API_URL, axiosInstance } from '../Stores/API';
import DetailComment from './../Components/LocationDetail/DetailComment';

export default function LocationDetail() {
  const { id } = useParams();
  const detailId = Number(id);

  const fetchLocationDetail = async () => {
      const url = API_URL.LocationDetail.replace(':id', detailId);
      const response = await axiosInstance.get(url);
      return response.data;
  };

  const detailQuery = useQuery({
    queryKey: ["locationDetail", detailId],
    queryFn: fetchLocationDetail,
    enabled: !!detailId,
  });


  if (detailQuery.isLoading) return <p>Loading...</p>;
  if (detailQuery.error) return <p>Error loading details</p>;

  const destination = detailQuery.data;

  const information = {
    lat : destination.detailEntity.detailMapy,
    lng : destination.detailEntity.detailMapx,
    tel : destination.detailEntity.detailTel,
    address : destination.detailEntity.detailAddress,
    homepage : destination.detailDescriptionEntity.detailHomepage,
  }

  const images = [
    destination.getDetailImageDto.detailImage1,
    destination.getDetailImageDto.detailImage3,
    destination.getDetailImageDto.detailImage4,
    destination.getDetailImageDto.detailImage5,
    destination.getDetailImageDto.detailImage6,
    destination.getDetailImageDto.detailImage7,
  ].filter(image => image);

  return (
    <>
      <DetailHeader header={destination.detailEntity} />
      <DetailSlider images={images} />
      <DetailDescription description={destination.detailDescriptionEntity} />
      <DetailInformation information={information} />
{/*       <DetailComment /> */}
    </>
  );
}
