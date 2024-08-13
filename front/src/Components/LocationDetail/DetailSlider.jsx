import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function DetailSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0); // 메인 이미지 인덱스
  const slidesToShow = 5;  // 한 번에 보여줄 이미지 개수

  const handlePrevClick = () => { 
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    ); // 현재 이미지가 0 이면 마지막으로, 아니라면 그냥 이전으로
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % images.length
    ); // 마지막 이미지면 첫번째로 돌아감
  };

  const handleImageClick = (index) => {
    setCurrentIndex(index); // 이미지 클릭시 해당 이미지가 메인 이미지로 전환
  };

  return (
    <div className="flex flex-col items-center w-1420">
      <div className="w-full p-3">
        <img src={images[currentIndex]} alt="Main" className="w-full h-160 object-cover" />
      </div>
      <div className="flex items-center justify-center mt-4 w-1410 h-44 bg-gray-100">
        <button className="text-4xl px-2 h-full text-white bg-green" onClick={handlePrevClick}>
          <FaAngleLeft />
        </button>
        <div className="flex overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${(currentIndex % images.length) * (100 / slidesToShow)}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0 mr-1" style={{ width: `${100 / slidesToShow}%` }}>
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-full h-44 object-cover cursor-pointer ${currentIndex === index ? 'border-4 border-softGreen' : ''}`}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button className="text-4xl px-2 h-full text-white bg-green" onClick={handleNextClick}>
          <FaAngleRight />
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 mx-1 rounded-full cursor-pointer ${currentIndex === index ? 'bg-softGreen' : 'bg-gray-300'}`}
            onClick={() => handleImageClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
