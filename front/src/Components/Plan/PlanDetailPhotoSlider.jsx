import React, { useState } from 'react';

export default function PlanDetailPhotoSlider({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full h-40">
      <div className="flex flex-wrap gap-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`이미지 ${index + 1}`}
            className="w-56 h-40 object-cover cursor-pointer"
            onClick={() => handleImageClick(image)}
          />
        ))}
      </div>

      {/* 확대 이미지 모달 */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img src={selectedImage} alt="확대 이미지" className="max-w-full max-h-screen" />
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
