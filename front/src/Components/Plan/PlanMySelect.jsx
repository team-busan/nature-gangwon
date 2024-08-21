import { useRecoilState } from "recoil";
import { planList } from "../../state/planState.js";
import { alertState } from "../../state/alertState.js";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import PlanDraggableItem from "./PlanDraggableItem.jsx";
import PlanAlert from "./PlanAlert.jsx";
import { useState, useEffect } from "react";

const PlanMySelect = () => {
  const [plans, setPlans] = useRecoilState(planList);

  const [message, setMessage] = useRecoilState(alertState);

  const onDragEnd = ({ destination, source }) => {
    console.log(destination);
    console.log(source);
    // 드롭 대상이 없는 경우, 아무 작업도 하지 않습니다.
    if (!destination) return;

    const sourceIdx = source.droppableId;
    const destinationIdx = destination.droppableId;
    const sourceItemIdx = source.index;
    const destinationItemIdx = destination.index;

    // 드래그된 아이템과 목적지의 아이템을 가져옵니다.
    const sourceItem = plans[sourceIdx][sourceItemIdx];

    // 드롭하려는 day의 items가 5개 이상이면 아무 작업도 하지 않음
    if (plans[destinationIdx].length >= 5) {
      setMessage("해당 날짜에 이미 5개의 장소가 계획되어 있습니다.");
      return;
    }

    let plansCopy = [...plans];

    if (sourceIdx === destinationIdx) {
      let dayCopy = [...plansCopy[sourceIdx]];
      dayCopy.splice(sourceItemIdx, 1);
      dayCopy.splice(destinationItemIdx, 0, sourceItem);
      plansCopy.splice(sourceIdx, 1, dayCopy);
    } else {
      let sourceDayCopy = [...plansCopy[sourceIdx]];
      let destinationDayCopy = [...plansCopy[destinationIdx]];

      sourceDayCopy.splice(sourceItemIdx, 1);
      destinationDayCopy.splice(destinationItemIdx, 0, sourceItem);

      plansCopy.splice(sourceIdx, 1, sourceDayCopy);
      plansCopy.splice(destinationIdx, 1, destinationDayCopy);
    }

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

  return (
    <div className="w-1/2 h-full relative overflow-y-scroll">
      <h3 className="w-full text-center py-4">내가 선택한 장소</h3>
      {enabled ? (
        <DragDropContext onDragEnd={onDragEnd}>
          {plans.map((day, idx) => (
            <div key={idx} className="px-4 pb-4">
              {idx === 0 ? null : (
                <div className="w-full h-4 bg-gray-100 rounded mb-4"></div>
              )}
              <h2 className="pb-2">{"Day " + (idx + 1)}</h2>
              <Droppable droppableId={idx.toString()}>
                {(provided) => (
                  <ul
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col gap-4"
                  >
                    {day.map((item, idx2) => (
                      <PlanDraggableItem key={idx2} item={item} idx2={idx2} />
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      ) : null}
      {message ? <PlanAlert /> : null}
    </div>
  );
};

export default PlanMySelect;
