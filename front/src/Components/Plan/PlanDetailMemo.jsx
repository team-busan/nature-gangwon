import React from "react";

export default function PlanDetailMemo({ filteredPlaces, writer, markerColors }) {
  return (
    <div className="w-1420 p-2">
      <h3>일정을 위한 메모를 확인해보세요📒</h3>
      <div className="flex flex-wrap gap-5 mt-2 mb-5">
        {filteredPlaces.map((place, index) => (
          <div
            key={place.placeId}
            className="relative w-2/12 flex-1 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 border-2"
          >
            <div
              className="absolute top-2 left-2 flex items-center justify-center w-8 h-8 rounded-full"
              style={{
                backgroundColor: markerColors[index % markerColors.length].marker,
                color: markerColors[index % markerColors.length].text,
              }}
            >
              {index + 1}
            </div>
            <h5 className="text-center text-xl font-semibold text-gray-800 mb-3 mt-4">
              {place.title}
            </h5>
            <section className="mt-3">
              <div className="bg-blue-100 p-2 rounded-lg mb-2">
                <h4 className="text-lg font-medium text-gray-700 mb-1">
                  공유 메모
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {place.note}
                </p>
              </div>
              {writer ? (
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <h4 className="text-lg font-medium text-gray-700 mb-1">
                    개인 메모
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {place.note2}
                  </p>
                </div>
              ) : null}
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}
