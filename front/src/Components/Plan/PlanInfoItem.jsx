import React from "react";
import PlanInfoSchedule from "./PlanInfoSchedule";
import travelIng from "../../img/여행중.png";
import { FaRegComment } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import travelCompleted from "../../img/여행완료.png";
import travelBefore from "../../img/여행준비.png";

export default function PlanInfoItem({ item }) {
  const getImage = (status) => {
    switch (status) {
      case "여행 중":
        return travelIng;
      case "여행 완료":
        return travelCompleted;
      case "여행 전":
        return travelBefore;
      default:
        return null;
    }
  };
  return (
    <div className="w-full">
      <ul>
        <li className="w-full h-56 relative">
          <img
            src={getImage(item.travelStatus)}
            alt={item.travelStatus}
            className="w-full h-full object-cover"
          />
          <PlanInfoSchedule data={item.travelStatus} />
        </li>
        <li>
          <div className="">
            <h4>{item.planTitle}</h4>
          </div>
          <div className=" flex justify-between">
            <p className="text-gray-400">{item.userNickname}</p>
            <div className = "flex">
              <span className="flex items-center mr-2">
                <FaRegComment className="mr-2 text-green"/>
                <p>{item.commentCount}</p>
              </span>
              <span className="flex items-center">
                <IoHeartOutline className="mr-2 text-xl text-red-500" />
                <p>{item.markCount}</p>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
