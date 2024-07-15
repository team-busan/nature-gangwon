import React from 'react';
import { FaStar } from "react-icons/fa";

const LocationItem = ({ item }) => (
  <div className="w-1/4 p-2">
    <ul className="bg-white rounded-lg shadow">
      <li className="w-full h-40">
        <img
          src={item.img}
          className="w-full h-full object-cover rounded-t-lg"
          alt="관광지 이미지"
        />
      </li>
      <li className="p-2">
        <div className="flex justify-between">
          <p className = "text-gray-400">{item.region}</p>
          <div className = "flex">
            <span className = "text-gray-400">comment</span>
            <span className = "w-10 bg-green rounded-md ml-2">
              <p className = "text-center text-white ">{item.comments}</p>
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <p>{item.name}</p>
          <span className = "w-10 flex items-center justify-between">
            <span><FaStar className = "text-yellow-400"/></span>
            <p className = "text-center font-medium">
              {item.rating}
            </p>
          </span>
        </div>
      </li>
    </ul>
  </div>
);

export default LocationItem;
