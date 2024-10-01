import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import ContentList from "../Components/SearchResult/ContentList";
import ContentController from "../Components/SearchResult/ContentController";
import { useRecoilState } from "recoil";
import {
  searchResultDisplayNumState,
  searchResultListState,
  searchResultPageState,
  searchResultSigunguCodeState,
  searchResultTypeState,
} from "../state/searchResultState";
import { useLocation } from "react-router-dom";

const SearchResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParam = searchParams.get("query");

  const [list, setList] = useRecoilState(searchResultListState);
  const [type, setType] = useRecoilState(searchResultTypeState);
  const [sigungu, setSigungu] = useRecoilState(searchResultSigunguCodeState);
  const [displayNum, setDisplayNum] = useRecoilState(
    searchResultDisplayNumState
  );
  const [page, setPage] = useRecoilState(searchResultPageState);

  const getLocationsInfo = async () => {
    const response = await axios.get(
      `/api/location/list?locationContenttypeid=${type}&locationSigungucode=${sigungu}&keyword=${queryParam}&page=${page}&size=${displayNum}`
    );
    return response.data;
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["content"],
    queryFn: getLocationsInfo,
  });

  useEffect(() => {
    if (data) {
      setList(data.locationList);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [queryParam]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex gap-[50px] w-[1420px] h-full mt-6">
        <ContentList data={data} refetch={refetch} />
        <ContentController refetch={refetch} />
      </div>
    );
  }
};

export default SearchResult;
