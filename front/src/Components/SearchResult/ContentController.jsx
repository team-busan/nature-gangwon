import { useRef } from "react";
import useDetectClose from ".././../Hooks/useDetectClose.js";
import ControllerSelect from "./ControllerSelect.jsx";
import { useRecoilState } from "recoil";
import {
  searchResultDisplayNumState,
  searchResultSigunguCodeState,
  searchResultTypeState,
} from "../../state/searchResultState.js";

const ContentController = ({ refetch }) => {
  const [type, setType] = useRecoilState(searchResultTypeState);
  const [sigungu, setSigungu] = useRecoilState(searchResultSigunguCodeState);
  const [displayNum, setDisplayNum] = useRecoilState(
    searchResultDisplayNumState
  );

  const typeRef = useRef(null);
  const sigunguRef = useRef(null);
  const displayNumRef = useRef(null);

  const [typeOpen, setTypeOpen] = useDetectClose(typeRef, false);
  const [sigunguOpen, setSigunguOpen] = useDetectClose(sigunguRef, false);
  const [displayNumOpen, setDisplayNumOpen] = useDetectClose(
    displayNumRef,
    false
  );

  const typeList = ["", "관광지", "축제", "숙박", "음식점"];
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
  const displayNumList = [10, 50, 100];

  return (
    <div className="w-full">
      <div className="sticky top-0">
        <div className="flex flex-col gap-6 shadow-content rounded-xl px-4 py-6 w-full h-min">
          <ControllerSelect
            label="관광타입"
            id="type"
            value={type}
            setValue={setType}
            ref={typeRef}
            open={typeOpen}
            setOpen={setTypeOpen}
            list={typeList}
            refetch={refetch}
          />
          <ControllerSelect
            label="시군구"
            id="sigungu"
            value={sigungu}
            setValue={setSigungu}
            ref={sigunguRef}
            open={sigunguOpen}
            setOpen={setSigunguOpen}
            list={sigunguList}
            refetch={refetch}
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
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentController;
