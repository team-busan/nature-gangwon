import React from "react";
import { FaStar } from "react-icons/fa";

export default function DetailHeader({ header }) {
  return (
    <section className="w-1420 flex flex-col mb-4">
      <div className="flex flex-row w-full justify-between items-center p-3">
        <h1 className="flex text-green">{header.title}</h1>
        <button>북마크 버튼</button>
      </div>
      <div className = "flex flex-row w-full justify-between items-center p-3">
        <span className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <h3>{header.score}</h3>
        </span>
        <span>
          <p>조회수 : {header.views}</p>
          <p>Comments : {header.comments}</p>
        </span>
      </div>
      <div className = "flex justify-center p-2 w-full">
        <hr className = "border-t-2 bg-gray-600 w-full"/>
      </div>
    </section>
  );
}
