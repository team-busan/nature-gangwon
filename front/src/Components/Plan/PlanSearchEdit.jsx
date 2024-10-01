import { useRef, useEffect, useState } from "react";
import useDetectClose from "../../Hooks/useDetectClose.js";
import { format } from "date-fns";

import PlanItem from "./PlanItem.jsx";
import { MdOutlineSearch, MdOutlineAddCircle } from "react-icons/md";

import { useRecoilState } from "recoil";
import { mapDisplayPlansState } from "../../state/planState.js";
import { alertState } from "../../state/alertState.js";
import PlanSelect from "./PlanSelect.jsx";
import {
  contentTypeState,
  isScrollState,
  pageState,
  searchQueryState,
  sigunguCodeState,
} from "../../state/planSearchQueryStates.js";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { prevPlanState } from "../../state/editState.js";

const SearchBar = ({ refetch }) => {
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [sigunguCode, setSigunguCode] = useRecoilState(sigunguCodeState);
  const [contentType, setContentType] = useRecoilState(contentTypeState);
  const [page, setPage] = useRecoilState(pageState);

  const sigunguRef = useRef(null);
  const contentTypeIdRef = useRef(null);

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
        <MdOutlineSearch
          className="text-2xl cursor-pointer"
          onClick={async () => {
            await setPage(1);
            refetch();
          }}
        />
        <input
          type="text"
          placeholder="찾으시는 여행지가 있으신가요?"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          className="w-full outline-none"
        />
        {searchQuery ? (
          <MdOutlineAddCircle
            className="text-2xl rotate-45 text-gray-400 cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        ) : null}
      </div>
      <PlanSelect
        label="시군구"
        id="sigungu"
        value={sigunguCode}
        setValue={setSigunguCode}
        open={sigunguOpen}
        setOpen={setSigunguOpen}
        list={sigunguList}
        refetch={refetch}
      />
      <PlanSelect
        label="관광 타입"
        id="contentTypeId"
        value={contentType}
        setValue={setContentType}
        open={contentTypeIdOpen}
        setOpen={setContentTypeIdOpen}
        list={contentTypeIdList}
        refetch={refetch}
      />
    </div>
  );
};

const SearchList = ({ data, setFoldStage, observeRef, refetch }) => {
  const [plans, setPlans] = useRecoilState(prevPlanState);
  const [message, setMessage] = useRecoilState(alertState);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);
  const [mapdisplayPlans, setMapdisplayPlans] =
    useRecoilState(mapDisplayPlansState);

  // 이중 배열 state 컨트롤
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

  // 장소 선택
  const handleClick = (item, idx) => {
    let plansCopy = deepCopy(plans);
    if (plansCopy[idx].length === 5) {
      setMessage("더이상 장소를 선택할 수 없습니다. (하루에 5개까지)");
      return;
    }
    let plansDayCopy = [...plansCopy[idx]];
    item.memo = "";
    item.memo2 = "";
    item.photoUrls = [];
    plansDayCopy.push(item);
    plansCopy.splice(idx, 1, plansDayCopy);
    setPlans(plansCopy);
    setFoldStage(2);

    const mapDisplayArray = [];
    plansCopy.forEach((item) => {
      item.forEach((item) => {
        const displayObject = {
          mapx: item.locationMapx,
          mapy: item.locationMapy,
          title: item.locationTitle,
          photoUrls: [item.locationFirstimage],
        };
        mapDisplayArray.push(displayObject);
      });
    });
    setMapdisplayPlans([...mapDisplayArray]);
    return;
  };

  // 무한 스크롤
  const onIntersection = async (entries) => {
    const firstEntry = entries[0];

    if (firstEntry.isIntersecting) {
      await setIsScroll(true);
      refetch();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observeRef.current) {
      observer.observe(observeRef.current);
    }
    return () => {
      if (observeRef.current) {
        observer.unobserve(observeRef.current);
      }
    };
  }, []);

  return (
    <ul className="flex flex-col gap-4">
      {data?.map((item, idx) => (
        <PlanItem key={idx} item={item} handleClick={handleClick} />
      ))}
    </ul>
  );
};

const PlanSearchEdit = ({ foldStage, setFoldStage, dates }) => {
  const observeRef = useRef(null);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
  const [contentType, setContentType] = useRecoilState(contentTypeState);
  const [sigunguCode, setSigunguCode] = useRecoilState(sigunguCodeState);
  const [page, setPage] = useRecoilState(pageState);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);

  const getLocationsInfo = async () => {
    const res = await axios.get(
      `/proxy/api/location/list?&locationContenttypeid=${contentType}&locationSigungucode=${sigunguCode}&keyword=${searchQuery}&page=${page}&size=50`
    );
    setData(res.data.locationList);
    return res.data.locationList;
  };

  const { planData, planError, planIsLoading, refetch } = useQuery({
    queryKey: ["planContent"],
    queryFn: getLocationsInfo,
  });

  useEffect(() => {
    if (data) {
      if (isScroll) {
        setData((prev) => [...prev, ...data]);
        setIsScroll(false);
      } else {
        setPage(1);
        setData(data);
      }
      setPage((prev) => prev + 1);
    }
  }, [data]);

  return (
    <div
      className={`${
        foldStage === 0
          ? "hidden"
          : foldStage === 1
          ? "w-full block"
          : "w-1/2 block"
      } overflow-y-scroll h-full pr-4 bg-white`}
    >
      <p>장소선택</p>
      <p>
        {format(dates[0], "yyyy M dd")} ~ {format(dates[1], "yyyy M dd")}
      </p>
      <SearchBar refetch={refetch} />
      <SearchList
        data={data}
        setFoldStage={setFoldStage}
        observeRef={observeRef}
        refetch={refetch}
      />
    </div>
  );
};

export default PlanSearchEdit;
