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

  const { data: destination, isLoading, isError, refetch } = useQuery({
    queryKey: ["locationDetail", detailId],
    queryFn: fetchLocationDetail,
    enabled: !!detailId,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading details</p>;

  const description = destination.detailDescriptionEntity.detailOverview;

  const detailEntity = {
    Title: destination.detailEntity.detailTitle,
    Address: destination.detailEntity.detailAddress,
    Tel: destination.detailEntity.detailTel,
    TotalScore: destination.detailEntity.detailTotalScore,
    Views: destination.detailEntity.detailViews,
    Mapx: destination.detailEntity.detailMapx,
    Mapy: destination.detailEntity.detailMapy,
    Firstimage: destination.detailEntity.detailFirstimage,
  };

  const information = {
    lat: destination.detailEntity.detailMapy,
    lng: destination.detailEntity.detailMapx,
    tel: destination.detailEntity.detailTel,
    address: destination.detailEntity.detailAddress,
    homepage: destination.detailDescriptionEntity.detailHomepage,
  };

  const images = destination.getDetailImageDto
    ? [
        destination.getDetailImageDto.detailImage1,
        destination.getDetailImageDto.detailImage3,
        destination.getDetailImageDto.detailImage4,
        destination.getDetailImageDto.detailImage5,
        destination.getDetailImageDto.detailImage6,
        destination.getDetailImageDto.detailImage7,
      ].filter(image => image)
    : [];

  return (
    <>
      <DetailHeader header={detailEntity} />
      <DetailSlider images={images} />
      <DetailDescription description={description} />
      <DetailInformation information={information} />
      <DetailComment
        comments={destination.detailCommentList}
        refetchComments={refetch}
      />
    </>
  );
}
