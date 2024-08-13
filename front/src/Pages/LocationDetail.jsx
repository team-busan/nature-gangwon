import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import DetailSlider from '../Components/LocationDetail/DetailSlider';
import DetailHeader from '../Components/LocationDetail/DetailHeader';
import DetailDescription from '../Components/LocationDetail/DetailDescription';
import DetailInformation from '../Components/LocationDetail/DetailInformation';
import DetailComment from '../Components/LocationDetail/DetailComment';
import { API_URL, axiosInstance } from '../Stores/API';
import { destination_detail, destination_detail_images, destination_comment } from '../Stores/mockData';

export default function LocationDetail() {
  const { id } = useParams();
  const detailId = Number(id);

  const useMockData = true;

  const fetchLocationDetail = async () => {
    if (useMockData) {
      return {
        detail: destination_detail[0]
      };
    } else {
      const url = API_URL.LocationDetail.replace(':id', detailId);
      const response = await axiosInstance.get(url);
      return { detail: response.data, comments: [] };
    }
  };
  

  const fetchLocationImages = async () => {
    if (useMockData) {
      const detail = destination_detail[0]; // 목 데이터에서 첫 번째 항목 가져오기
      const imagesWithFirstImages = {
        first_image1: detail.detail_firstimage,
        first_image2: detail.detail_firstimage2,
        ...destination_detail_images[0] // 기존 images 객체의 나머지 이미지 추가
      };
      return Object.values(imagesWithFirstImages); // 객체 값을 배열로 변환하여 반환
    } else {
      const url = `${API_URL.LocationDetail.replace(':id', detailId)}/images`;
      const response = await axiosInstance.get(url);
      const imageWithFirstImages = {
        first_image1 : response.detail_firstimage,
        first_image2 : response.detail_firstimage2,
        ...response.images[0],
      }
      return imageWithFirstImages;
    }
  };

  const fetchLocationComments = async () => {
    if (useMockData) {
      const comments = destination_comment.filter(comment => comment.detail_id === detailId);
      return comments;
    } else {
      const url = `${API_URL.LocationDetail.replace(':id', detailId)}/comments`;
      const response = await axiosInstance.get(url);
      return response;
    }
  }

  const fetchLocationOverView = async () => {
    const url = `${API_URL.LocationDetail.replace(':id', detailId)}/overview`
    const response = await axiosInstance.get(url);
    return response;
  }

  const detailQuery = useQuery({
    queryKey: ["locationDetail", detailId],
    queryFn: fetchLocationDetail,
    enabled: !!detailId,
  });

  const imagesQuery = useQuery({
    queryKey: ["locationImages", detailId],
    queryFn: fetchLocationImages,
    enabled: !!detailId,
  });

  const commentQuery = useQuery({
    queryKey : ["locationComments", detailId],
    queryFn : fetchLocationComments
  })

  const overViewQuery = useQuery({
    queryKey : ["locationOverView", detailId],
    queryFn : fetchLocationOverView,
  })

  if (detailQuery.isLoading || imagesQuery.isLoading) return <p>Loading...</p>;
  if (detailQuery.error || imagesQuery.error) return <p>Error loading details</p>;

  const detailData = detailQuery.data.detail;
  const images = imagesQuery.data || [];

  const detailHeader = {
    title: detailData.detailTitle,
    address: detailData.detailAddress,
    score: detailData.detailTotalScore,
    views: detailData.detailViews,
    comments: 0,
  };
  

  const description = {
    description: "Description not available in data",
  };

  const information = {
    tel: detailData.detailTel,
    homepage: "Homepage not available",
    address: detailData.detailAddress,
  };

  const comments = detailQuery.data.comments || [];

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
