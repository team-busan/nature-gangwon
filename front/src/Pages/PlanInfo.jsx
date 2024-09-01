import React, { useEffect, useState } from "react";
import SortButtons from "../Components/LocationInfo/SortButtons";
import PlanMainImage from "../Components/Plan/PlanMainImage";
import planImage from "../img/planImage.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PlanInfoDropDown from "../Components/Plan/PlanInfoDropDown";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import PlanInfoList from "../Components/Plan/PlanInfoList";
import SearchBar from "../Components/LocationInfo/SearchBar";
import { API_URL, axiosInstance } from "../Stores/API";
import ReactPaginate from "react-paginate";

export default function PlanInfo() {
  const [sortOption, setSortOption] = useState("전체");
  const [size] = useState(16);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [selectTravel, setSelectTravel] = useState("전체");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentSort = searchParams.get("sort") || "전체";
  const currentTravel = searchParams.get("filter") || "전체";

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
    if (currentSort !== sortOption) {
      setSortOption(currentSort);
    }
    if (currentTravel !== selectTravel){
      setSelectTravel(currentTravel);
    }
  }, [currentPage, currentSort]);

  const fetchPlanInfo = async({queryKey}) => {
    const [_key, page, sortOption, selectTravel] = queryKey;
    const params = { page, size, sort : sortOption, filter : selectTravel};
    const url = `${axiosInstance.defaults.baseURL}${API_URL.PlanInfo}`;
    const response = await axiosInstance.get(url, {params});
    setTotalPages(response.data.totalPage);
    return response.data;
  }

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    navigate(`/plan/list?page=1&size=${size}&filter=${selectTravel}&sort=${newSortOption}`);
    setPage(1);  // 새로운 정렬 옵션으로 첫 페이지부터 시작
  };

  const handleSelectTravel = (newSortOption) => {
    setSelectTravel(newSortOption)
    navigate(`/plan/list?page=1&size=${size}&filter=${newSortOption}&sort=${sortOption}`);
    setPage(1); 
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    if (selectedPage !== page) {
      setPage(selectedPage);
      navigate(`/plan/list?page=${selectedPage}&size=${size}&filter=${selectTravel}&sort=${sortOption}`);
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["planInfo", page, sortOption, selectTravel],
    queryFn : fetchPlanInfo,
    keepPreviousData : true,
  });


  return (
    <section className = "">
      <PlanMainImage image={planImage} />
      <div className="flex items-center justify-between mb-2">
        <h3 className="mr-5">다양한 여행 계획들을 확인 해보세요!</h3>
        <PlanInfoDropDown
          selectTravel={selectTravel}
          setSelectTravel={handleSelectTravel}
        />
      </div>
      <SortButtons setSortOption={handleSortChange} sortOption = {sortOption} />
      <SearchBar />
      <PlanInfoList data = {data} loading = {isLoading} error = {error}/>
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
