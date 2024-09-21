import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import PlanDefaultImage from "../PlanDefaultImage";
import { Link } from "react-router-dom";

const MarkedFestivals = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [festivals, setFestivals] = useState([]);

  const getFestivals = async () => {
    const res = await axios.get("http://localhost:8000/festival/mark-list", {
      headers: {
        Authorization: `Bearer ${cookie.token}`,
      },
    });
    setFestivals(res.data.markList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["festivalMarkList"],
    queryFn: getFestivals,
  });

  const renderImage = (img1, img2) => {
    if (img1) {
      return (
        <img
          src={img1}
          alt="festival"
          className="absolute object-cover max-w-full max-h-full aspect-square rounded-lg"
        />
      );
    } else if (img2) {
      return (
        <img
          src={img2}
          alt="festival"
          className="absolute object-cover max-w-full max-h-full aspect-square rounded-lg"
        />
      );
    } else {
      return (
        <div className="absolute">
          <PlanDefaultImage />
        </div>
      );
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {festivals.length === 0 ? (
        <Link to="/festival/list">아직 즐겨찾기한 축제가 없습니다</Link>
      ) : (
        festivals.map((item, idx) => {
          return (
            <Link to={`/festival/${item.festivalId}`} key={idx}>
              <div className="rounded-lg shadow-content aspect-square relative">
                {renderImage(item.festivalFirstImage, item.festivalImage3)}
                <div className="w-full h-full absolute bg-black/25 rounded-lg z-10"></div>
                <h6 className="absolute left-4 top-4 text-white z-20">
                  {item.festivalTitle}
                </h6>
                <div className="absolute right-6 bottom-6 text-white z-20 text-right">
                  <p>{item.festivalStartDate.substring(0, 10)} ~</p>
                  <p>{item.festvailEndDate.substring(0, 10)}</p>
                </div>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default MarkedFestivals;
