import { useState, useRef } from "react";
import useDetectClose from "../../Hooks/useDetectClose.js";
import { format } from "date-fns";

import PlanItem from "./PlanItem.jsx";
import { MdOutlineSearch, MdOutlineAddCircle } from "react-icons/md";

import { useRecoilState } from "recoil";
import { planList } from "../../state/planState.js";
import { alertState } from "../../state/alertState.js";
import PlanSelect from "./PlanSelect.jsx";

const SearchBar = ({ searchValue, setSearchValue }) => {
  const [sigungu, setSigungu] = useState("");
  const [contentTypeId, setContentTypeId] = useState("");

  const sigunguRef = useRef();
  const contentTypeIdRef = useRef();

  const [sigunguOpen, setSigunguOpen] = useDetectClose(sigunguRef, false);
  const [contentTypeIdOpen, setContentTypeIdOpen] = useDetectClose(
    contentTypeIdRef,
    false
  );

  const sigunguList = [
    "",
    "강릉시",
    "고성군",
    "동해시",
    "삼척시",
    "속초시",
    "양구군",
    "양양군",
    "영월군",
    "원주시",
    "인제군",
    "정선군",
    "철원군",
    "춘천시",
    "태백시",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ];
  const contentTypeIdList = ["", "관광지", "숙박", "음식점", "축제"];

  return (
    <div className="my-4 flex flex-col gap-4">
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
      <PlanSelect
        label="시군구"
        id="sigungu"
        value={sigungu}
        setValue={setSigungu}
        open={sigunguOpen}
        setOpen={setSigunguOpen}
        list={sigunguList}
      />
      <PlanSelect
        label="관광 타입"
        id="contentTypeId"
        value={contentTypeId}
        setValue={setContentTypeId}
        open={contentTypeIdOpen}
        setOpen={setContentTypeIdOpen}
        list={contentTypeIdList}
      />
    </div>
  );
};

const SearchList = ({ data, setFoldStage }) => {
  const [plans, setPlans] = useRecoilState(planList);
  const [message, setMessage] = useRecoilState(alertState);

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
        if (i === plansCopy.length - 1) {
          setMessage("더이상 장소를 선택할 수 없습니다. (하루에 5개까지)");
        } else {
          continue;
        }
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
    <ul className="flex flex-col gap-4 pr-4">
      {data?.map((item, idx) => (
        <PlanItem key={idx} item={item} handleClick={handleClick} />
      ))}
    </ul>
  );
};

const PlanSearch = ({ foldStage, setFoldStage, dates, data }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div
      className={`${
        foldStage === 0
          ? "hidden"
          : foldStage === 1
          ? "w-full block"
          : "w-1/2 block"
      } overflow-y-scroll pr-4 bg-white`}
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
