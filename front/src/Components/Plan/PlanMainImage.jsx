import React from "react";
import { Link } from "react-router-dom";

export default function PlanMainImage({ image }) {
  return (
    <section className="w-full h-96 flex justify-center mb-5">
      <div className="relative w-full h-full">
        <img
          src={image}
          alt="메인 이미지"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Link
            to="/plan"
            className="px-4 py-2 rounded-lg h-20 text-xl hover:text-green "
          >
            여기를 눌러서 계획 작성을 시작해 보세요!
          </Link>
        </span>
      </div>
    </section>
  );
}
