import { motion } from "framer-motion";

import { Draggable } from "@hello-pangea/dnd";
import { MdOutlineDragIndicator } from "react-icons/md";

const PlanDraggableItem = ({ item, idx2 }) => {
  return (
    <Draggable draggableId={idx2.toString()} index={idx2}>
      {(provided) => (
        <motion.li
          initial={{ backgroundColor: "#ffffff" }}
          whileHover={{ backgroundColor: "#C7F7C6" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="w-full flex items-center gap-4 cursor-pointer p-2 rounded-lg shadow-md border-[1px] border-gray-200"
        >
          <div {...provided.dragHandleProps}>
            <MdOutlineDragIndicator className="text-2xl" />
          </div>
          {item.locationFirstimage === "" ? (
            <div className="w-28 h-28 rounded-lg flex justify-center items-center bg-gray-300">
              이미지 준비중
            </div>
          ) : (
            <img
              src={item.locationFirstimage}
              alt={item.locationTitle}
              className="object-cover w-28 h-28 rounded-lg"
            />
          )}
          <div className="flex flex-col h-[112px] gap-2">
            <p className="line-clamp-1">{item.locationTitle}</p>
            <p className="">{item.locationAdd1}</p>
          </div>
        </motion.li>
      )}
    </Draggable>
  );
};

export default PlanDraggableItem;
