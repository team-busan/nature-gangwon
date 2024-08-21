import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";

const LocationItem = ({ item }) => (
  <div className="w-full h-full">
    <ul className="bg-white rounded-lg shadow">
      <li className="w-full h-40">
        <img
          src={item.detailFirstimage}
          className="w-full h-full object-cover rounded-t-lg"
          alt="관광지 이미지"
        />
      </li>
      <li className="p-2">
        <div className="flex justify-between">
          <p className="text-gray-400 truncate" style={{ maxWidth: "28ch" }}>
            {item.detailAddress}
          </p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <p className="text-lg font-medium truncate">{item.detailTitle}</p>
          <div className="flex">
            <span className="flex items-center">
              <FaRegComment className="text-green mr-1" />
              <p className="text-center font-medium">{item.detailTotalComment}</p>
            </span>
            <span className="flex items-center ml-2">
              <FaStar className="text-yellow-400 mr-1" />
              <p className="text-center font-medium">{item.detailTotalScore}</p>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
);

export default LocationItem;
