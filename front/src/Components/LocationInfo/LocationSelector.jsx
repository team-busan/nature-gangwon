import React from 'react';

const locations = [
  "전체",
  "강릉시",
  "고성군",
  "동해시",
  "삼척시",
  "속초시",
  "양구군",
  "양양군",
  "영월군",
  "원주시",
  "인제군",
  "정선군",
  "철원군",
  "춘천시",
  "태백시",
  "평창군",
  "홍천군",
  "화천군",
  "횡성군",
];

const LocationSelector = ({ selectedLocation, onLocationClick }) => (
  <section className="w-1420 mx-auto mb-5">
    <h2 className="text-xl font-semibold mb-4 p-2">
      강원도 지역을 선택해보세요!
    </h2>
    <div className="flex flex-wrap gap-2">
      {locations.map((location, index) => (
        <button
          key={index}
          onClick={() => onLocationClick(location)}
          className={`px-4 py-2 border rounded-full ${
            selectedLocation === location ? "bg-green text-white" : "bg-white text-black"
          }`}
        >
          {location}
        </button>
      ))}
    </div>
  </section>
);

export default LocationSelector;
