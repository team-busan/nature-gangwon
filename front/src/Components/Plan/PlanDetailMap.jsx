import React from "react";
import NaverMapWithMarkers from "../NaverMapWithMarkers";

export default function PlanDetailMap({
  locations
}) {
  const markerColors = [
    { marker: "#ff5141", text: "#FFFFFF" },
    { marker: "#FFD700", text: "#000000" },
    { marker: "#4CAF50", text: "#FFFFFF" },
    { marker: "#ffb671", text: "#FFFFFF" },
    { marker: "#8A2BE2", text: "#FFFFFF" },
  ];

  return (
    <>
      <section className="w-1420">
        <div className="flex justify-between">
          <span className="w-8/12">

          </span>
          <div className = "w-4/12 border-solid-black border-2" style = {{height : '500px'}}>
            <div className = "p-2">
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
