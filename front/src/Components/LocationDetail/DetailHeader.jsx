import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";

export default function DetailHeader({ header }) {
  return (
    <section className="w-1420 flex flex-col mb-2 p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <div>
          <h1 className="flex text-green">{header.title}</h1>
          <h4 className = "text-softGreen">{header.address}</h4>
        </div>
        <div className = "flex gap-3">
          <button className="">
            <IoIosHeart className="w-6 h-6 text-red-500" />
          </button>
          <button className="">
            <LuShare2 className="w-6 h-6 text-green" />
          </button>
        </div>
      </div>
      <div className="flex flex-row w-full justify-between items-center">
        <span className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <h3>{header.score}</h3>
        </span>
        <span>
          <p>조회수 : {header.views}</p>
          <p>Comments : {header.comments}</p>
        </span>
      </div>
      <div className="flex justify-center w-full">
        <hr className="border-t-2 bg-gray-600 w-full" />
      </div>
    </section>
  );
}
