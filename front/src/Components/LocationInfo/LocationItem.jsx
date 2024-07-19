import React from 'react';
import { FaStar } from "react-icons/fa";

const LocationItem = ({ item }) => (
  <div className="w-full h-full p-2">
    <ul className="bg-white rounded-lg shadow">
      <li className="w-full h-40">
        <img
          src={item.detail_firstimage2}
          className="w-full h-full object-cover rounded-t-lg"
          alt="관광지 이미지"
        />
      </li>
      <li className="p-2">
        <div className="flex justify-between">
          <p className="text-gray-400">{item.detail_address}</p>
          <div className="flex items-center">
            <span className="text-softGreen mr-2">comment</span>
            <span className="w-10 bg-green rounded-md flex items-center justify-center">
              <p className="text-center text-white">{item.detail_totalComments}</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-medium">{item.detail_title}</p>
          <span className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <p className="text-center font-medium">{item.detail_total_score}</p>
          </span>
        </div>
      </li>
    </ul>
  </div>
);

export default LocationItem;
