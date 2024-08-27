import React, { useEffect, useState } from "react";
import MainImage from "../Components/LocationInfo/MainImage";
import SortButtons from "../Components/LocationInfo/SortButtons";
import LocationList from "../Components/LocationInfo/LocationList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { festival_info } from "../Stores/mockData";
import ReactPaginate from "react-paginate";
import { FaFireAlt } from "react-icons/fa";
import { API_URL, axiosInstance } from "../Stores/API";

export default function FestivalInfo() {
  const [size] = useState(16);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage]);

  const mainImage =
    "http://tong.visitkorea.or.kr/cms/resource/07/3112107_image2_1.jpg";

  const fetchFestivalInfo = async ({ queryKey }) => {
    const [_key, page] = queryKey;

    const params = { page, size }
    const url = `${axiosInstance.defaults.baseURL}${API_URL.FestivalInfo}`;
    const response = await axiosInstance.get(url, {params});
    setTotalPages(response.data.upComing.totalPage);
    console.log(response.data);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["festivalInfo", page],
    queryFn: fetchFestivalInfo,
    keepPreviousData: true,
  });

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (selectedPage !== page) {
      setPage(selectedPage);
      navigate(`/festival/list?page=${selectedPage}&size=${size}`);
    }
  };

  return (
    <section className=" overflow-x-hidden">
      <MainImage image={mainImage} />
      {/* 진행 중인 축제 */}
      <div className = "mb-1">
        <div className=" p-4 flex items-center bg-orange-300 shadow-md mt-7">
          <h3 className="font-semibold">진행중인 축제 🔥</h3>
        </div>
        <LocationList
          data={data.onGoing}
          loading={false}
          error={null}
          type="festival_ing"
          idKey="festivalId"
          routePrefix="/festival"
        />
      </div>
      {/* 예정된 축제*/}
      <div className = "bg-lightGreen shadow-md">
        <h3 className="p-4 font-semibold">다가오는 축제 ⏱️</h3>
      </div>
      <SortButtons/>
      <LocationList
        data={data.upComing.festivals}
        loading={isLoading}
        error={error}
        type="festival"
        idKey="festivalId" 
        routePrefix="/festival"
      />
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={<FaAngleLeft />} // 이전 페이지 버튼의 라벨
          nextLabel={<FaAngleRight />} // 다음 페이지 버튼의 라벨
          breakLabel={"..."} // 페이지 번호 사이에 "..."를 표시하는 라벨
          breakClassName={"break-me"} // "..."의 클래스 이름
          pageCount={totalPages} // 총 페이지 수
          marginPagesDisplayed={0} // 시작과 끝 부분에서 표시할 페이지 번호의 수
          pageRangeDisplayed={5} // 현재 페이지 주변에 표시할 페이지 번호의 수
          onPageChange={handlePageClick} // 페이지 변경 시 호출될 함수
          containerClassName={"flex items-center w-60 justify-between"} // 페이지네이션 컨테이너의 클래스 이름
          subContainerClassName={""} // 서브 컨테이너의 클래스 이름
          pageClassName={"text-xl w-5 text-center"} // 페이지 번호의 클래스 이름
          activeClassName={"text-green font-bold"} // 활성화된 페이지 번호의 클래스 이름
          previousClassName={"previous"} // 이전 페이지 버튼의 클래스 이름
          nextClassName={"next"} // 다음 페이지 버튼의 클래스 이름
          disabledClassName={"disabled"} // 비활성화된 페이지 버튼의 클래스 이름
          forcePage={page - 1} // 현재 페이지를 강제로 설정
        />
      </div>
    </section>
  );
}
