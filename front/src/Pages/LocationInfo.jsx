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
      const response = await axiosInstance.get(API_URL.LocationInfo, {
        params: { page, size, region: selectedLocation },
      });
      setTotalPages(response.data.totalPages);
      return response.data.data;
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
        selectedLocation={selectedLocation === "all" ? "전체" : selectedLocation}
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
          previousLabel={<FaAngleLeft />}
          nextLabel={<FaAngleRight />}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center w-60 justify-between"}
          subContainerClassName={""}
          pageClassName={"text-xl w-5 text-center"}
          activeClassName={"text-green font-bold"}
          previousClassName={"previous"}
          nextClassName={"next"}
          disabledClassName={"disabled"}
        />
      </div>
    </div>
  );
}