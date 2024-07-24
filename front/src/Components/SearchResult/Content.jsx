import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import sampleImage from "../../img/LocationMain.jpg";

const MotionLink = motion(Link);

const Content = ({ content }) => {
  return (
    <li>
      <MotionLink
        initial={{ translateY: 0, backgroundColor: "#FFFFFF" }}
        whileHover={{ translateY: -3, backgroundColor: "#C7F7C6" }}
        className="w-[1020px] h-[200px] rounded-xl shadow-content border-[rgba(0, 0, 0, 0.15)] border-[1px] flex gap-4 p-5"
        to={`/LocationDetail/${content.detail_id}`}
      >
        <img
          className="w-40 h-40 rounded-xl object-cover"
          src={sampleImage}
          alt="Sample Image"
        />
        <div className="flex flex-col justify-between w-full">
          <div className="flex justify-between">
            <span>{content.detail_title}</span>
            <span className="bg-lightGreen rounded px-2 py-1">숙박</span>
          </div>
          <p>{content.detail_address}</p>
          <p className="line-clamp-1">
            개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요개요
          </p>
        </div>
      </MotionLink>
    </li>
  );
};

export default Content;
