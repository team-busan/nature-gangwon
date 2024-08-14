import { useRecoilState } from "recoil";
import { planList } from "../../state/planState.js";
import { alertState } from "../../state/alertState.js";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import PlanItem from "./PlanItem";
import PlanDraggableItem from "./PlanDraggableItem.jsx";
import PlanAlert from "./PlanAlert.jsx";
import { useState, useEffect } from "react";

import { MdOutlineDragIndicator } from "react-icons/md";

const PlanMySelect = () => {
  const [plans, setPlans] = useRecoilState(planList);
  let pushIdx = 0;

  const [message, setMessage] = useRecoilState(alertState);

  const onDragEnd = () => {};

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
