import React from "react";
import profile from "../../img/house.avif";

export default function PlanDetailHeader({ planHeader, selectedDay, availableDays, setSelectedDay }) {
  return (
    <section className="w-1420">
      <div className="flex mt-3">
        <span className="w-20 h-20">
          <img
            src={profile}
            alt="프로필 이미지"
            className="w-20 h-20 rounded-full"
          />
        </span>
        <span className = "p-2">
          <p>{planHeader.userEmail}</p> {/* 나중에 닉네임으로 대체 해야함!! */}
          <p className = "text-gray-400">{planHeader.planUploadDate}</p>
        </span>
      </div>
      <div className = "flex justify-between">
      <div className="mt-3">
        <h2>{planHeader.planTitle}</h2>
      </div>
      <div>
        <span>
        <select
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              value={selectedDay}
              className="h-14 "
            >
              {availableDays.map((day) => (
                <option key={day} value={day}>
                  Day {day}
                </option>
              ))}
            </select>
        </span>
      </div>
      </div>
    </section>
  );
}
