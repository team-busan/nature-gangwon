import React, { useEffect, useState } from "react";
import { API_URL, axiosInstance } from "../Stores/API";
import MainImage from "../Components/LocationInfo/MainImage";
import LocationSelector from "../Components/LocationInfo/LocationSelector";
import SortButtons from "../Components/LocationInfo/SortButtons";
import SearchBar from "../Components/LocationInfo/SearchBar";
import LocationList from "../Components/LocationInfo/LocationList";

export default function LocationInfo() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [size] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const handleLocationClick = (location) => {
    setSelectedLocation(location === "전체" ? "all" : location);
    setPage(1); // 지역 선택 시 첫 페이지로 이동
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(API_URL.LocationInfo, { params: { page, size, region: selectedLocation } })
      .then((response) => {
        setData(response.data.data);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [page, size, selectedLocation]);

  return (
    <div className="w-full overflow-x-hidden">
      <MainImage />
      <LocationSelector
        selectedLocation={selectedLocation === "all" ? "전체" : selectedLocation}
        onLocationClick={handleLocationClick}
      />
      <SortButtons />
      <SearchBar />
      <LocationList data={data} loading={loading} error={error} />
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 mx-1 border rounded"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-1">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 mx-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
