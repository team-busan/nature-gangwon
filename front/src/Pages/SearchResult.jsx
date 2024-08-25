import axios from "axios";

import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import ContentList from "../Components/SearchResult/ContentList";
import ContentController from "../Components/SearchResult/ContentController";

const SearchResult = () => {
  const getLocationsInfo = async () => {
    const response = await axios.get(
      "http://localhost:8000/location/list?page=1&size=50"
    );
    return response.data.locationList;
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
      <div className="flex gap-[50px] w-[1420px] h-full mt-6">
        <ContentList data={data} />
        <ContentController />
      </div>
    );
  }
};

export default SearchResult;
