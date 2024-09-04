import React from "react";
import NaverMapWithMarkers from "../NaverMapWithMarkers";
import PlanDetailMemo from "./PlanDetailMemo";

export default function PlanDetailMap({
  planHeader,
  selectedDay,
  availableDays,
  setSelectedDay,
  locations,
  writer,
}) {
  const markerColors = [
    { marker: "#1E3A8A", text: "#FFFFFF" }, // Navy Blue
    { marker: "#B22222", text: "#FFFFFF" }, // Brick Red
    { marker: "#FFD700", text: "#000000" }, // Golden Yellow
    { marker: "#228B22", text: "#FFFFFF" }, // Forest Green
    { marker: "#6A0DAD", text: "#FFFFFF" }, // Royal Purple
  ];

  return (
    <div className="">
      <section className="w-1420">
        <div className="flex justify-between items-center ">
          <div className="w-8/12">
            <h2>{planHeader.userNickname}님의 여행 루트가 준비됐어요! 🗺️</h2>
          </div>
          <div className="w-4/12">
            <select
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              value={selectedDay}
              className="h-14 cursor-pointer text-2xl focus:outline-none"
            >
              {availableDays.map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="w-8/12">
            <NaverMapWithMarkers
              width="100%"
              height="600px"
              locations={locations}
              markerColors={markerColors}
            />
          </span>
          <ul
            className="w-4/12 p-1 border-2"
            style={{ height: "600px", overflowY: "auto" }}
          >
            {locations.map((place, index) => (
              <li
                key={index}
                className="w-full h-40 mb-2 flex items-center border-2"
              >
                <div className="relative w-56 h-full flex items-center justify-center bg-gray-100">
                  {place.locationFirstimage ? (
                    <img
                      src={place.locationFirstimage}
                      alt="장소 이미지"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500">이미지 없음</div>
                  )}
                  <div
                    className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full"
                    style={{
                      backgroundColor: markerColors[index].marker,
                      color: markerColors[index].text,
                    }}
                  >
                    {index + 1}
                  </div>
                </div>
                <div className="flex-1 p-2">
                  <p>{place.title}</p>
                  <p className="text-gray-400">{place.placeAdd1}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PlanDetailMemo
        filteredPlaces={locations}
        writer={writer}
        markerColors={markerColors}
      />
    </div>
  );
}
