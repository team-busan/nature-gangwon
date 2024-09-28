import React from "react";
import PlanDetailPhotoSlider from "./PlanDetailPhotoSlider";

export default function PlanDetailPhoto({ locations, planHeader, markerColors }) {
  return (
    <section className="w-1420 p-4">
      <h3 className="mb-4">
        {planHeader.userNickname}님이 올린 사진들을 확인 해보세요! 📷
      </h3>
      <div className="flex flex-col space-y-4">
        {locations.map((place, index) => (
          <div
            key={place.placeId}
            className="border rounded-lg overflow-hidden shadow-lg p-4 relative"
          >
            <div
              className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                backgroundColor: markerColors[index].marker,
                color: markerColors[index].text,
              }}
            >
              {index + 1}
            </div>
            <h4 className="font-semibold text-lg mb-2 ml-8">{place.title}</h4>
            {place.photoUrls && place.photoUrls.length > 0 ? (
              <PlanDetailPhotoSlider images={place.photoUrls} />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">사진이 없습니다</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
