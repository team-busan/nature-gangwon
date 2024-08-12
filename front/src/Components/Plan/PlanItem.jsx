import { motion } from "framer-motion";

const PlanItem = ({ item, handleClick }) => {
  return (
    <motion.li
      initial={{ backgroundColor: "#ffffff" }}
      whileHover={{ backgroundColor: "#C7F7C6" }}
      key={item.detail_id}
      onClick={handleClick ? () => handleClick(item) : null}
      className="flex gap-4 cursor-pointer p-2 mr-2 rounded-lg"
    >
      <div>
        <img
          src={item.detail_firstimage2}
          alt={item.detail_title}
          className="object-cover w-28 h-28 rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <p className="line-clamp-1">{item.detail_title}</p>
        <p className="line-clamp-1">{item.detail_address}</p>
        <p className="line-clamp-1">⭐{item.detail_total_score}</p>
      </div>
    </motion.li>
  );
};

export default PlanItem;
