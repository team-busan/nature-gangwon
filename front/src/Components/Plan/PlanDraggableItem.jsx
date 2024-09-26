import { useState } from "react";
import { motion } from "framer-motion";
import { planList } from "../../state/planState";
import { useRecoilState } from "recoil";

import { Draggable } from "@hello-pangea/dnd";
import {
  MdClose,
  MdOutlineDragIndicator,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

import DefaultImage from "../DefaultImage";
import PlanDistance from "./PlanDistance";

const PlanDraggableItem = ({ day, item, idx, idx2, handleDelete }) => {
  const [plans, setPlans] = useRecoilState(planList);
  const [isMemoOpen, setIsMemoOpen] = useState(0);
  const [memo, setMemo] = useState("");
  const [memo2, setMemo2] = useState("");

  let type = "";
  let color = "";

  if (item.locationContenttypeid === "12") {
    type = "관광지";
    color = "#C7F7C6";
  } else if (item.locationContenttypeid === "32") {
    type = "숙박";
    color = "#F7C9C6";
  } else if (item.locationContenttypeid === "39") {
    type = "음식점";
    color = "#EFFF8B";
  } else if (item.locationContenttypeid === "15") {
    type = "축제";
    color = "#B1ECFF";
  }

  const handleChange = (e, isMemoOpen) => {
    if (e.currentTarget.value.length > 150) {
      return;
    } else {
      if (isMemoOpen === 1) {
        setMemo(e.currentTarget.value);
      } else {
        setMemo2(e.currentTarget.value);
      }
    }
  };

  const handleWriteMemo = (idx, idx2) => {
    const plansCopy = [...plans];
    const plansDayCopy = [...plansCopy[idx]];
    const itemCopy = { ...plansDayCopy[idx2] };
    if (isMemoOpen === 1) {
      itemCopy.memo = memo;
    } else {
      itemCopy.memo2 = memo2;
    }
    plansDayCopy.splice(idx2, 1, itemCopy);
    plansCopy.splice(idx, 1, plansDayCopy);
    setPlans(plansCopy);
  };

  return (
    <Draggable draggableId={idx2.toString()} index={idx2}>
      {(provided) => (
        <motion.li
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="flex flex-col gap-4"
        >
          <motion.div
            initial={{ backgroundColor: "#ffffff" }}
            whileHover={{ backgroundColor: "#C7F7C6" }}
            className="w-full flex items-center justify-between gap-4 cursor-pointer p-2 rounded-lg shadow-md border-[1px] border-gray-200"
          >
            <div {...provided.dragHandleProps}>
              <MdOutlineDragIndicator className="text-2xl" />
            </div>
            {item.locationFirstimage === "" ? (
              <div className="w-28 h-28 rounded-lg shrink-0">
                <DefaultImage />
              </div>
            ) : (
              <img
                src={item.locationFirstimage}
                alt={item.locationTitle}
                className="object-cover w-28 h-28 rounded-lg shrink-0"
              />
            )}
            <div className="flex flex-col h-[112px] gap-2 w-full">
              <div className="flex justify-between items-center">
                <span>{item.locationTitle}</span>
                <span
                  className="py-1 px-2 rounded-lg shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {type}
                </span>
              </div>
              <p>{item.locationAdd1}</p>
            </div>
            <MdOutlineRemoveCircleOutline
              onClick={() => handleDelete(idx, idx2)}
              className="text-2xl cursor-pointer shrink-0"
            />
          </motion.div>
          <div className="flex gap-4 items-center justify-between relative">
            <div
              onClick={() => setIsMemoOpen(1)}
              className="w-1/2 h-10 bg-lightGreen rounded-lg flex items-center justify-center cursor-pointer shadow"
            >
              공유 메모 추가
            </div>
            <div
              onClick={() => setIsMemoOpen(2)}
              className="w-1/2 h-10 bg-lightGreen rounded-lg flex items-center justify-center cursor-pointer shadow"
            >
              개인 메모 추가
            </div>
            {isMemoOpen === 0 ? null : (
              <motion.div
                transition={{
                  x: { type: "spring", bounce: 0 },
                  opacity: { duration: 0.2 },
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`absolute top-0 w-full h-56 rounded-lg p-4 flex flex-col gap-4 overflow-y-scroll bg-white bg-paper bg-cover z-10 ${
                  isMemoOpen === 1 ? "origin-top-left" : "origin-top-right"
                }`}
              >
                <div className="flex items-center justify-between border-b-2 pb-2 border-black">
                  <h6>{isMemoOpen === 1 ? "공유 메모" : "개인 메모"}</h6>
                  <MdClose
                    onClick={() => setIsMemoOpen(0)}
                    className="text-2xl cursor-pointer"
                  />
                </div>
                <textarea
                  placeholder="메모를 입력하세요 (최대 150자)"
                  className="bg-transparent outline-none w-full h-full resize-none"
                  value={isMemoOpen === 1 ? memo : memo2}
                  onChange={(e) => handleChange(e, isMemoOpen)}
                />
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      handleWriteMemo(idx, idx2);
                      setIsMemoOpen(0);
                    }}
                    className="bg-paleGreen rounded-md py-1 px-3"
                  >
                    저장
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          {day[idx2 + 1] ? (
            <PlanDistance
              nextItem={day[idx2 + 1]}
              x1={item.locationMapx}
              y1={item.locationMapy}
              x2={day[idx2 + 1].locationMapx}
              y2={day[idx2 + 1].locationMapy}
            />
          ) : null}
          {provided.placeholder}
        </motion.li>
      )}
    </Draggable>
  );
};

export default PlanDraggableItem;
