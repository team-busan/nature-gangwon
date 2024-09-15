import { Link } from "react-router-dom";
import DefaultImage from "../DefaultImage";
import { motion } from "framer-motion";

const MotionLink = motion(Link);

const LocationCard = ({ location }) => {
  return (
    <MotionLink
      initial={{ translateY: 0 }}
      whileHover={{ translateY: -10 }}
      to={`/destination/${location.detailId}`}
      className="w-[430px] h-[430px] rounded-lg shadow-xl bg-white flex flex-col justify-end p-4 relative"
    >
      {location.detailImageDto.detailImage3 ? (
        <img
          src={
            location.detailImageDto.detailImage1
              ? location.detailImageDto.detailImage1
              : location.detailImageDto.detailImage3
          }
          alt="관광지 사진"
          className="absolute w-[430px] h-[430px] top-0 left-0 rounded-lg"
        />
      ) : (
        <div className="w-[430px] h-[430px] absolute top-0 left-0 rounded-lg">
          <DefaultImage />
        </div>
      )}
      <div className="bg-black/50 py-2 px-4 rounded-lg z-10 w-fit">
        <p className="text-lg text-white">{location.detailTitle}</p>
      </div>
    </MotionLink>
  );
};

export default LocationCard;
