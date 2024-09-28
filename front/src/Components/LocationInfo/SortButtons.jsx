import React from "react";

const SortButtons = ({ setSortOption, sortOption }) => {
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  return (
    <section className="w-full h-16 mb-1">
      <div className="w-1420 h-full mx-auto flex items-center p-2 bg-smLightGreen shadow-lg text-black">
        <button
          onClick={() => handleSortChange("전체")}
          className={`mr-5 p-3 ${sortOption === "전체" ? "font-bold" : ""}`}
        >
          전체
        </button>
        <button
          onClick={() => handleSortChange("인기순")}
          className={`mr-5 p-3 ${sortOption === "인기순" ? "font-bold" : ""}`}
        >
          인기순
        </button>
        <button
          onClick={() => handleSortChange("댓글순")}
          className={`mr-5 p-3 ${sortOption === "댓글순" ? "font-bold" : ""}`}
        >
          댓글순
        </button>
      </div>
    </section>
  );
};

export default SortButtons;
