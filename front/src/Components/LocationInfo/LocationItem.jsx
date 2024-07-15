import React from 'react';

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
          <p>{item.region}</p>
          <p>{item.comments}</p>
        </div>
        <div className="flex justify-between">
          <p>{item.name}</p>
          <p>{item.rating}</p>
        </div>
      </li>
    </ul>
  </div>
);

export default LocationItem;
