import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL, axiosInstance } from "../Stores/API";
import MainImage from "../Components/LocationInfo/MainImage";
import LocationSelector from "../Components/LocationInfo/LocationSelector";
import SortButtons from "../Components/LocationInfo/SortButtons";
import SearchBar from "../Components/LocationInfo/SearchBar";
import LocationList from "../Components/LocationInfo/LocationList";
import ReactPaginate from "react-paginate";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";

export default function LocationInfo() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [size] = useState(16);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const region = searchParams.get("region") || "all";

  useEffect(() => {
    setSelectedLocation(region);
    setPage(currentPage);
  }, [currentPage, region]);

  const handleLocationClick = (location) => {
    const newRegion = location === "전체" ? "all" : location;
    setSelectedLocation(newRegion);
    setPage(1); // 지역 선택 시 첫 페이지로 이동
    setSearchParams({ page: 1, region: newRegion });
  };

  const fetchLocationInfo = async ({ queryKey }) => {
    const [_key, page, selectedLocation] = queryKey;
    try {
      const params = { page, size };
      if (selectedLocation !== "all") {
        params.detailSigungucode = selectedLocation;
      }
      const url = `${axiosInstance.defaults.baseURL}${API_URL.LocationInfo}`;
      const response = await axiosInstance.get(url, { params });
      console.log("Request URL:", url, params); // 요청 URL 출력
      console.log("Response Data:", response.data); // 응답 데이터 출력
      setTotalPages(response.data.totalPage);
      return response.data.detailPageList;
    } catch (error) {
      throw new Error(error);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["locationInfo", page, selectedLocation],
    queryFn: fetchLocationInfo,
    keepPreviousData: true, // 페이지 전환 시 이전 데이터 유지하면서 새로운 데이터 페칭
  });

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
    setSearchParams({ page: selectedPage, region: selectedLocation });
  };

  return (
    <div className="w-full overflow-x-hidden">
      <MainImage />
      <LocationSelector
        selectedLocation={
          selectedLocation === "all" ? "전체" : selectedLocation
        }
        onLocationClick={handleLocationClick}
      />
      <SortButtons />
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />
      <LocationList data={data} loading={isLoading} error={error} />
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
        />
      </div>
    </div>
  );
}
