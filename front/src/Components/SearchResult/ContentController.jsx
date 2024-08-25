import { useState, useRef } from "react";
import useDetectClose from ".././../Hooks/useDetectClose.js";
import ControllerSelect from "./ControllerSelect.jsx";

const ContentController = () => {
  const [sort, setSort] = useState("관련도순");
  const [type, setType] = useState("전체");
  const [displayNum, setDisplayNum] = useState(50);

  const sortRef = useRef();
  const typeRef = useRef();
  const displayNumRef = useRef();

  const [sortOpen, setSortOpen] = useDetectClose(sortRef, false);
  const [typeOpen, setTypeOpen] = useDetectClose(typeRef, false);
  const [displayNumOpen, setDisplayNumOpen] = useDetectClose(
    displayNumRef,
    false
  );

  const sortList = ["관련도순", "인기순", "리뷰순"];
  const typeList = ["전체", "관광지", "축제", "숙박", "음식점"];
  const displayNumList = [10, 50, 100];

  return (
    <div className="w-full">
      <div className="sticky top-0">
        <div className="flex flex-col gap-6 shadow-content rounded-xl px-4 py-6 w-full h-min">
          <ControllerSelect
            label="정렬"
            id="sort"
            value={sort}
            setValue={setSort}
            ref={sortRef}
            open={sortOpen}
            setOpen={setSortOpen}
            list={sortList}
          />
          <ControllerSelect
            label="관광타입"
            id="type"
            value={type}
            setValue={setType}
            ref={typeRef}
            open={typeOpen}
            setOpen={setTypeOpen}
            list={typeList}
          />
          <ControllerSelect
            label="표시개수"
            id="displayNum"
            value={displayNum}
            setValue={setDisplayNum}
            ref={displayNumRef}
            open={displayNumOpen}
            setOpen={setDisplayNumOpen}
            list={displayNumList}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentController;
