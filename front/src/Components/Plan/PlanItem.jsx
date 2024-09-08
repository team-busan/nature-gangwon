import { motion } from "framer-motion";
import DefaultImage from "../DefaultImage";

const PlanItem = ({ item, handleClick }) => {
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
    <motion.li
      initial={{ backgroundColor: "#ffffff" }}
      whileHover={{ backgroundColor: "#C7F7C6" }}
      key={item.locationBasedId}
      onClick={() => handleClick(item)}
      className="w-full flex gap-4 cursor-pointer p-2 rounded-lg shadow-md border-[1px] border-gray-200"
    >
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
      <div className="flex flex-col gap-2 w-full">
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
    </motion.li>
  );
};

export default PlanItem;
