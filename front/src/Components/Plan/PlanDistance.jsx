import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowDownLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { millisecondsToHours, millisecondsToMinutes } from "date-fns";

const PlanDistance = ({ nextItem, x1, y1, x2, y2 }) => {
  const [distance, setDistance] = useState(0);
  const [minute, setMinute] = useState(0);

  const getResult = async (x1, y1, x2, y2) => {
    // CORS 에러 처리 함, package.json에 "proxy" 추가
    const res = await axios.get(
      `/driving?start=${x1.substring(0, 10)},${y1.substring(
        0,
        9
      )}&goal=${x2.substring(0, 10)},${y2.substring(0, 9)}`,
      {
        headers: {
          "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_CLIENT_ID,
          "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_API_KEY,
        },
      }
    );

    if (res.data.code === 0) {
      return res.data.route.traoptimal[0].summary;
    } else {
      return {
        distance: -1,
        duration: -1,
      };
    }
  };

  useEffect(() => {
    getResult(x1, y1, x2, y2).then((res) => {
      setDistance(res.distance);
      setMinute(res.duration);
    });
  }, [nextItem]);

  return (
    <Link
      to={`https://map.naver.com/p/directions/${x1},${y1}/${x2},${y2}`}
      className="flex items-center self-center gap-2"
    >
      <FaArrowDownLong />
      <span>
        {distance === -1 ? "0Km" : (distance / 1000).toFixed(1) + "Km"}
      </span>
      {minute === -1 ? (
        "0분"
      ) : (
        <div>
          <span>{millisecondsToHours(minute) + "시간"}</span>
          <span>{(millisecondsToMinutes(minute) % 60) + "분"}</span>
        </div>
      )}
      <span></span>
    </Link>
  );
};

export default PlanDistance;
