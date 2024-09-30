import { useRecoilState } from "recoil";
import { alertState } from "../../state/alertState.js";

import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { MdCheck, MdEdit } from "react-icons/md";

import PlanDraggableItem from "./PlanDraggableItem.jsx";
import PlanAlert from "./PlanAlert.jsx";
import { useState, useEffect } from "react";
import {
  prevMapDisplayPlansState,
  prevPlanState,
  prevPlanTitleState,
} from "../../state/editState.js";

const PlanMySelectEdit = ({ setPlanStage }) => {
  const [plans, setPlans] = useRecoilState(prevPlanState);
  const [message, setMessage] = useRecoilState(alertState);
  const [planTitle, setPlanTitle] = useRecoilState(prevPlanTitleState);
  const [mapDisplayPlans, setMapDisplayPlans] = useRecoilState(
    prevMapDisplayPlansState
  );
  const [text, setText] = useState("");

  const onDragEnd = ({ destination, source }) => {
    // 드롭 대상이 없는 경우, 아무 작업도 하지 않습니다.
    if (!destination) return;

    const sourceIdx = source.droppableId;
    const destinationIdx = destination.droppableId;
    const sourceItemIdx = source.index;
    const destinationItemIdx = destination.index;

    // 드래그된 아이템과 목적지의 아이템을 가져옵니다.
    const sourceItem = plans[sourceIdx][sourceItemIdx];

    let plansCopy = [...plans];

    if (sourceIdx === destinationIdx) {
      let dayCopy = [...plansCopy[sourceIdx]];
      dayCopy.splice(sourceItemIdx, 1);
      dayCopy.splice(destinationItemIdx, 0, sourceItem);
      if (dayCopy.length >= 6) {
        setMessage("해당 날짜에 이미 5개의 장소가 계획되어 있습니다.");
        return;
      }
      plansCopy.splice(sourceIdx, 1, dayCopy);
    } else {
      let sourceDayCopy = [...plansCopy[sourceIdx]];
      let destinationDayCopy = [...plansCopy[destinationIdx]];

      sourceDayCopy.splice(sourceItemIdx, 1);
      destinationDayCopy.splice(destinationItemIdx, 0, sourceItem);
      if (destinationDayCopy.length >= 6) {
        setMessage("해당 날짜에 이미 5개의 장소가 계획되어 있습니다.");
        return;
      }

      plansCopy.splice(sourceIdx, 1, sourceDayCopy);
      plansCopy.splice(destinationIdx, 1, destinationDayCopy);
    }

    let mapDisplayPlansCopy = [...mapDisplayPlans];
    mapDisplayPlansCopy.splice(
      sourceIdx * plans[sourceIdx].length + sourceItemIdx,
      1
    );
    const tempItem = {
      mapx: sourceItem.locationMapx,
      mapy: sourceItem.locationMapy,
      title: sourceItem.locationTitle,
      photoUrls: [sourceItem.locationFirstimage],
    };
    mapDisplayPlansCopy.splice(
      destinationIdx * plans[destinationIdx].length + destinationItemIdx,
      0,
      tempItem
    );
    setMapDisplayPlans(mapDisplayPlansCopy);
    setPlans(plansCopy);
  };

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const handleDelete = (listIdx, idx) => {
    let plansCopy = [...plans];
    let dayCopy = [...plansCopy[listIdx]];
    dayCopy.splice(idx, 1);
    plansCopy.splice(listIdx, 1, dayCopy);
    let mapDisplayPlansCopy = [...mapDisplayPlans];
    mapDisplayPlansCopy.splice(listIdx * 5 + idx, 1);
    setMapDisplayPlans(mapDisplayPlansCopy);
    setPlans(plansCopy);
  };

  const handleToNext = () => {
    for (let i = 0; i < plans.length; i++) {
      if (plans[i].length === 0) {
        setMessage("하루에 최소 한 곳 이상의 여행지를 추가해주세요.");
        setPlanStage(1);
        return;
      }
    }
    if (!planTitle) {
      setMessage("여행 제목을 입력해주세요.");
      setPlanStage(1);
      return;
    }
    setPlanStage(2);
  };

  return (
    <div className="w-1/2 h-full relative overflow-y-scroll">
      {planTitle ? (
        <h3 className="w-full text-center py-4 flex justify-center items-center gap-4">
          {planTitle}{" "}
          <MdEdit className="text-gray-400" onClick={() => setPlanTitle("")} />
        </h3>
      ) : (
        <div className="p-4 relative">
          <input
            type="text"
            className="w-full py-2 px-4 outline-none border-2 border-paleGreen rounded-full"
            placeholder="여행 제목을 입력해주세요"
            value={text}
            onChange={(e) => setText(e.currentTarget.value)}
          />
          <div
            onClick={() => setPlanTitle(text)}
            className="absolute top-[22px] right-6 bg-paleGreen w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
          >
            <MdCheck className="text-2xl text-white" />
          </div>
        </div>
      )}
      {/* 전체 선택 리스트 */}
      {enabled ? (
        <DragDropContext onDragEnd={onDragEnd}>
          {plans.map((day, idx) => (
            <div key={idx} className="px-4 pb-4 mb-4">
              <h2 className="pb-2">{"Day " + (idx + 1)}</h2>
              {/* 각 날짜별 선택 리스트 */}
              <Droppable droppableId={idx.toString()}>
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-4 min-h-12 bg-gray-100 p-2 rounded-lg"
                  >
                    {/* 리스트 아이템 */}
                    {day.map((item, idx2) => (
                      <PlanDraggableItem
                        key={idx2}
                        day={day}
                        item={item}
                        idx={idx}
                        idx2={idx2}
                        handleDelete={handleDelete}
                      />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}

          <div className="px-4">
            <button
              onClick={() => handleToNext()}
              className="bg-darkGreen w-full py-2 text-white rounded-lg"
            >
              다음으로
            </button>
          </div>
        </DragDropContext>
      ) : null}
      {message ? <PlanAlert /> : null}
    </div>
  );
};

export default PlanMySelectEdit;
