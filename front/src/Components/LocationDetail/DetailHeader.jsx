import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { LuShare2 } from "react-icons/lu";
import { PiEyesDuotone } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";

export default function DetailHeader({ header }) {
  return (
    <section className="w-1420 flex flex-col p-3">
      <div className="flex flex-row w-full justify-between items-center">
        <div className="flex justify-between w-full">
          <span>
            <h1 className="flex text-green">{header.title}</h1>
          </span>
          <div className="flex gap-3">
            <button className="">
              <IoIosHeart className="w-6 h-6 text-red-500" />
            </button>
            <button className="">
              <LuShare2 className="w-6 h-6 text-green" />
            </button>
          </div>
        </div>
      </div>
      <h4 className="text-softGreen">{header.address}</h4>
      <div className="flex flex-row w-full justify-between items-center">
        <span className="flex items-center">
          <FaStar className="text-yellow-400 mr-1" />
          <h3>{header.score}</h3>
        </span>
        <span className="flex items-center">
          <span
            className="mr-2 text-2xl"
            style={{ transform: "rotate(180deg)" }}
          >
            <PiEyesDuotone />
          </span>
          <p className="mr-2">{header.views}</p>
          <span className="mr-2 text-2xl" style={{ transform: "scaleX(-1)" }}>
            <FaRegComment />
          </span>

          <p>{header.comments}</p>
        </span>
      </div>
      <div className="flex justify-center w-full">
        <hr className="border-t-2 bg-gray-600 w-full" />
      </div>
    </section>
  );
}
