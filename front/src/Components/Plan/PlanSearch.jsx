import { useState } from "react";
import { format } from "date-fns";

import PlanItem from "./PlanItem.jsx";
import { MdOutlineSearch, MdOutlineAddCircle } from "react-icons/md";

import { useRecoilState } from "recoil";
import { planList } from "../../atoms";

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

const SearchList = ({ data, setFoldStage }) => {
  const [plans, setPlans] = useRecoilState(planList);

  const deepCopy = (obj) => {
    // 배열 타입인 경우
    if (Array.isArray(obj)) {
      const result = [];
      for (let item of obj) {
        result.push(deepCopy(item));
      }
      return result;
    } // 객체 타입인 경우
    else if (typeof obj === "object") {
      const result = {};
      for (let key in obj) {
        result[key] = deepCopy(obj[key]);
      }
      return result;
    }
    return obj;
  };

  const handleClick = (item) => {
    let plansCopy = deepCopy(plans);
    for (let i = 0; i < plansCopy.length; i++) {
      if (plansCopy[i].length === 5) {
        continue;
      } else {
        let plansDayCopy = [...plansCopy[i]];
        plansDayCopy.push(item);
        plansCopy.splice(i, 1, plansDayCopy);
        setPlans(plansCopy);
        setFoldStage(2);
        return;
      }
    }
  };

  return (
    <ul className="overflow-y-scroll h-full flex flex-col gap-4">
      {data.map((item, idx) => (
        <PlanItem key={idx} item={item} handleClick={handleClick} />
      ))}
    </ul>
  );
};

const PlanSearch = ({ foldStage, setFoldStage, dates, data }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`w-full ${
        foldStage === 0 ? "hidden" : "block"
      } overflow-hidden bg-white`}
    >
      <p>장소선택</p>
      <p>
        {format(dates[0], "yyyy M dd")} ~ {format(dates[1], "yyyy M dd")}
      </p>
      <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      <SearchList data={data} setFoldStage={setFoldStage} />
    </div>
  );
};

export default PlanSearch;
