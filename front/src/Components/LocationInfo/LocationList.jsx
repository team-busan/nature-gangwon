import React from "react";
import LocationItem from "../LocationInfo/LocationItem";
import { useNavigate } from "react-router-dom";

const LocationList = ({ data, loading, error, type, idKey, routePrefix }) => {
  const navigate = useNavigate();
  console.log(data);

  const handleItemClick = (id) => {
    navigate(`${routePrefix}/${id}`);
  };

  return (
    <section className="w-full">
      {loading && <p>Loading...</p>}
      {error && <p>Error loading data: {error.message}</p>}
      {!loading && !error && data && (
        <div className="w-1420 mx-auto p-2 flex flex-wrap">
          {data.map((item) => (
            <div
              key={item[idKey]} // idKey에 따라 동적으로 key 설정
              className="p-2 cursor-pointer"
              onClick={() => handleItemClick(item[idKey])} // idKey에 따라 동적으로 클릭 핸들러 설정
              style={{ width: "calc(25% - 16px)", margin: "8px" }}
            >
              <LocationItem item={item} type={type} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default LocationList;
