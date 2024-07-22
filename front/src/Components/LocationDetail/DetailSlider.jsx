import React, { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function DetailSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className = "w-1420 p-3">
        <img src={images[currentIndex]} alt="Main" className="w-full h-160" />
      </div>
      <div className="flex items-center justify-center mt-4 w-full h-44">
        <button className="text-4xl px-2 h-full text-white bg-green" onClick={handlePrevClick}>
          <FaAngleLeft/>
        </button>
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className={`w-44 h-44 mx-2 cursor-pointer transition-transform duration-200 ${currentIndex === index ? 'transform scale-105' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
        <button className="text-4xl px-2 h-full text-white bg-green" onClick={handleNextClick}>
          <FaAngleRight/>
        </button>
      </div>
    </div>
  );
}
