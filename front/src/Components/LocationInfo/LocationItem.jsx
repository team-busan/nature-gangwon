import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa6";
import FestivalSchedule from "../FestivalInfo/FestivalSchedule";

const LocationItem = ({ item, type = "" }) => {
  // 타입에 따라 적절한 변수명을 매핑
  const title = type.includes("festival") ? item.festivalTitle : item.detailTitle;
  const address = type.includes("festival") ? item.festivalAddress : item.detailAddress;
  const image = type.includes("festival") ? item.festivalFirstImage : item.detailFirstimage;
  const totalScore = type.includes("festival") ? item.festivalTotalScore : item.detailTotalScore;
  const totalComments = type.includes("festival") ? item.festivalTotalComment : item.detailTotalComment;
  const startDate = type.includes("festival") ? item.festivalStartDate.split(' ')[0] : null;
  const endDate = type.includes("festival") ? item.festivalEndDate.split(' ')[0] : null;
  
  return (
    <div className="w-full h-full relative shadow-lg">
      {type.includes("festival") ? 
        <FestivalSchedule type={type} startDate = {startDate}/> : null}
      <ul className="bg-white rounded-lg shadow">
        <li className="w-full h-40">
          <img
            src={image}
            className="w-full h-full object-cover rounded-t-lg"
            alt={type.includes("festival") ? "축제 이미지" : "관광지 이미지"}
          />
        </li>
        <li className="p-2">
          <div className="flex flex-col justify-between">
            <p className="text-gray-400 truncate" style={{ maxWidth: "28ch" }}>
              {address}
            </p>
            {type.includes("festival") ? <p className="text-gray-400">{startDate} ~ {endDate}</p> : null}
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-lg font-medium truncate">{title}</p>
            <div className="flex">
              <span className="flex items-center">
                <FaRegComment className="text-green mr-1" />
                <p className="text-center font-medium">{totalComments}</p>
              </span>
              <span className="flex items-center ml-2">
                <FaStar className="text-yellow-400 mr-1" />
                <p className="text-center font-medium">{totalScore}</p>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default LocationItem;
