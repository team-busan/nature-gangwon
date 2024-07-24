import { axiosInstance, API_URL } from "../Stores/API.js";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import ContentList from "../Components/SearchResult/ContentList";
import ContentController from "../Components/SearchResult/ContentController";

const SearchResult = () => {
  const getLocationsInfo = async () => {
    const response = await axiosInstance.get(API_URL.SEARCH);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["content"],
    queryFn: getLocationsInfo,
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex gap-[50px] w-[1420px] h-full">
        <ContentList data={data} />
        <ContentController />
      </div>
    );
  }
};

export default SearchResult;
