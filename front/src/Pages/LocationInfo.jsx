import React, { useState } from 'react';
import mainImg from '../img/LocationMain.jpg';

export default function LocationInfo() {
  const locations = [
    "전체", "강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", 
    "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", 
    "홍천군", "화천군", "횡성군"
  ];

  const [selectedLocation, setSelectedLocation] = useState("전체");

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="">
      <section className="w-screen h-104">
        <img 
          src={mainImg}
          alt="메인 이미지"
          className="w-screen h-full bg-cover"
        />
      </section>
      <section className="w-1420 mx-auto">
        <h2 className="text-xl font-semibold mb-4 p-2">강원도 지역을 선택해보세요!</h2>
        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationClick(location)}
              className={`px-4 py-2 border rounded-full ${
                selectedLocation === location ? 'bg-green text-white' : 'bg-white text-black'
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
