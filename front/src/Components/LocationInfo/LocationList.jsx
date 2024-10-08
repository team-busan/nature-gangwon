import React from "react";
import LocationItem from "../LocationInfo/LocationItem";
import { useNavigate } from "react-router-dom";

const LocationList = ({ data, loading, error, type, idKey, routePrefix }) => {
  const navigate = useNavigate();

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
              key={item[idKey]}
              className="p-2 cursor-pointer"
              onClick={() => handleItemClick(item[idKey])}
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
