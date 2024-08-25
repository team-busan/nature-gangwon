import { motion } from "framer-motion";

import { Draggable } from "@hello-pangea/dnd";
import {
  MdOutlineDragIndicator,
  MdOutlineRemoveCircleOutline,
} from "react-icons/md";

const PlanDraggableItem = ({ item, idx, idx2, handleDelete }) => {
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

  return (
    <Draggable draggableId={idx2.toString()} index={idx2}>
      {(provided) => (
        <motion.li
          initial={{ backgroundColor: "#ffffff" }}
          whileHover={{ backgroundColor: "#C7F7C6" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full flex items-center justify-between gap-4 cursor-pointer p-2 rounded-lg shadow-md border-[1px] border-gray-200"
        >
          <div {...provided.dragHandleProps}>
            <MdOutlineDragIndicator className="text-2xl" />
          </div>
          {item.locationFirstimage === "" ? (
            <div className="w-28 h-28 rounded-lg flex justify-center items-center bg-gray-300 shrink-0">
              이미지 준비중
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
          {provided.placeholder}
        </motion.li>
      )}
    </Draggable>
  );
};

export default PlanDraggableItem;
