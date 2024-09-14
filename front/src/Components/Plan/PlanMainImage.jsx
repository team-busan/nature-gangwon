import React from "react";
import { Link } from "react-router-dom";

export default function PlanMainImage({ image }) {
  return (
    <section className="w-full h-96 flex justify-center mb-3">
      <div className="relative w-full h-full">
        <img
          src={image}
          alt="메인 이미지"
          className="w-full h-full object-cover"
        />
        <div
          className="flex absolute w-36 h-14 items-center justify-center"
          style={{
            left: "635px",
            top: "185px",
          }}
        >
          <Link to="/plan" className="w-full h-full rounded-lg">
            <button className="w-full h-full bg-orange-400 rounded-lg text-white animate-bounce font-semibold">
              여행 계획 작성
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
