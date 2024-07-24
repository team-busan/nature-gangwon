import React from "react";
import { FaStar } from "react-icons/fa";
import Comments from "../Comments";

export default function DetailComment({comments}) {
  console.log(comments);
  return (
    <section className="w-1420 p-3">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex w-80 justify-between items-center">
            <h3 className = "text-green">관광지 후기</h3>
            <span className="flex">
              <span className="text-yellow-400">
                <FaStar />
              </span>
              <p>4.0</p>
              <p>(4)댓글개수</p>
            </span>
          </div>
          <div>
            <button className="bg-green text-white p-2 rounded-lg w-20 text-center">
              댓글작성
            </button>
          </div>
        </div>
        <ul className="flex border-b-2 border-gray-300 pb-5">
          <li className="mr-5">
            최신순
          </li>
          <li>후기순</li>
        </ul>
      </div>
      <Comments comments = {comments}/>
    </section>
  );
}
