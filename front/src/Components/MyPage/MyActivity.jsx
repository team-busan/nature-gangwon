import MyActivityButton from "./MyActivityButton";
import { motion } from "framer-motion";

import {
  MdOutlineAirplaneTicket,
  MdOutlineNoteAlt,
  MdFavoriteBorder,
  MdOutlineInsertPhoto,
  MdSafetyDivider,
  MdOutlineEdit,
} from "react-icons/md";

const MyActivity = ({ contentNum, setContentNum }) => {
  const activities = [
    {
      Icon: MdOutlineAirplaneTicket,
      title: "계획",
    },
    {
      Icon: MdOutlineNoteAlt,
      title: "메모",
    },
    {
      Icon: MdFavoriteBorder,
      title: "즐겨찾기",
    },
    {
      Icon: MdOutlineInsertPhoto,
      title: "사진",
    },
    {
      Icon: MdSafetyDivider,
      title: "경비분할",
    },
    {
      Icon: MdOutlineEdit,
      title: "정보수정",
    },
  ];

  return (
    <div className="h-[500px] flex flex-col justify-between">
      <h4>내 활동</h4>
      <motion.div className="bg-lightGreen w-[660px] h-[450px] rounded-xl grid grid-cols-3 place-items-center shadow-content">
        {activities.map((activity, idx) => (
          <MyActivityButton
            key={idx}
            Icon={activity.Icon}
            title={activity.title}
            selected={contentNum === idx}
            setContentNum={() => setContentNum(idx)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MyActivity;
