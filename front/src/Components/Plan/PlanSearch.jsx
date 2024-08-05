import { useState } from "react";
import { format } from "date-fns";

import { MdOutlineSearch, MdOutlineAddCircle } from "react-icons/md";

const SearchBar = ({ searchValue, setSearchValue }) => {
  return (
    <div className="my-4">
      <div className="flex gap-1 bg-white py-2 px-3 rounded-lg shadow">
        <MdOutlineSearch className="text-2xl" />
        <input
          type="text"
          placeholder="찾으시는 여행지가 있으신가요?"
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className="w-full outline-none"
        />
        {searchValue ? (
          <MdOutlineAddCircle
            className="text-2xl rotate-45 text-gray-400 cursor-pointer"
            onClick={() => setSearchValue("")}
          />
        ) : null}
      </div>
    </div>
  );
};

const SearchList = ({ data }) => {
  return (
    <ul className="overflow-y-scroll h-full flex flex-col gap-4">
      {data.map((item) => (
        <li key={item.detail_id} className="flex gap-4">
          <div>
            <img
              src={item.detail_firstimage2}
              alt={item.detail_title}
              className="object-cover w-28 h-28 rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-between">
            <p className="line-clamp-1">{item.detail_title}</p>
            <p className="line-clamp-1">{item.detail_address}</p>
            <p className="line-clamp-1">⭐{item.detail_total_score}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const PlanSearch = ({ foldStage, dates, data }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`w-full ${
        foldStage === 0 ? "hidden" : "block"
      } overflow-y-hidden`}
    >
      <p>장소선택</p>
      <p>
        {format(dates[0], "yyyy M dd")} ~ {format(dates[1], "yyyy M dd")}
      </p>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <SearchList data={data} />
    </div>
  );
};

export default PlanSearch;
