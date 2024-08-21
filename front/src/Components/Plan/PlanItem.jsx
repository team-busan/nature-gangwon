import { motion } from "framer-motion";

const PlanItem = ({ item, handleClick }) => {
  return (
    <motion.li
      initial={{ backgroundColor: "#ffffff" }}
      whileHover={{ backgroundColor: "#C7F7C6" }}
      key={item.locationBasedId}
      onClick={handleClick ? () => handleClick(item) : null}
      className="w-full flex gap-4 cursor-pointer p-2 rounded-lg shadow-md border-[1px] border-gray-200"
    >
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
      <div className="flex flex-col gap-2">
        <p className="line-clamp-1">{item.locationTitle}</p>
        <p className="">{item.locationAdd1}</p>
      </div>
    </motion.li>
  );
};

export default PlanItem;
