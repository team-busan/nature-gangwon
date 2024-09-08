import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import DefaultImage from "../DefaultImage";

const MotionLink = motion(Link);

const Content = ({ content }) => {
  let type = "";
  let color = "";

  if (content.locationContenttypeid === "12") {
    type = "관광지";
    color = "#C7F7C6";
  } else if (content.locationContenttypeid === "32") {
    type = "숙박";
    color = "#F7C9C6";
  } else if (content.locationContenttypeid === "39") {
    type = "음식점";
    color = "#EFFF8B";
  } else if (content.locationContenttypeid === "15") {
    type = "축제";
    color = "#B1ECFF";
  }

  return (
    <li>
      <MotionLink
        initial={{ translateY: 0, backgroundColor: "#FFFFFF" }}
        whileHover={{ translateY: -3, backgroundColor: "#C7F7C6" }}
        className="w-[1020px] h-[200px] rounded-xl shadow-content border-[rgba(0, 0, 0, 0.15)] border-[1px] flex gap-4 p-5"
        to={`/destination/${content.locationBasedId}`}
      >
        {content.locationFirstimage ? (
          <img
            className="w-40 h-40 rounded-xl object-cover"
            src={content.locationFirstimage}
            alt={`${content.locationTitle} 이미지`}
          />
        ) : (
          <div className="w-40 h-40 rounded-lg shrink-0">
            <DefaultImage />
          </div>
        )}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex justify-between">
            <span>{content.locationTitle}</span>
            <span
              className={`rounded px-2 py-1`}
              style={{ backgroundColor: color }}
            >
              {type}
            </span>
          </div>
          <p>{content.locationAdd1}</p>
        </div>
      </MotionLink>
    </li>
  );
};

export default Content;
