import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import DefaultImage from "../DefaultImage";

const MarkedLocations = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [locations, setLocations] = useState([]);

  const getLocations = async () => {
    const res = await axios.get(
      "http://nature-gangwon.shop:8000/destination/mark-list",
      {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      }
    );
    setLocations(res.data.markList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["locationMarkList"],
    queryFn: getLocations,
  });

  const renderImage = (img1, img2) => {
    if (img1) {
      return (
        <img
          src={img1}
          alt="관광지 이미지"
          className="w-full h-full object-cover rounded-lg absolute"
        />
      );
    } else if (img2) {
      return (
        <img
          src={img2}
          alt="관광지 이미지"
          className="w-full h-full object-cover rounded-lg absolute"
        />
      );
    } else {
      return <DefaultImage />;
    }
  };

  return (
    <div className="grid grid-cols-4 gap-6">
      {locations.length === 0 ? (
        <Link to="/destination/list">아직 즐겨찾기한 관광지가 없습니다</Link>
      ) : (
        locations.map((item, idx) => {
          return (
            <Link
              to={`/destination/${item.detailId}`}
              key={idx}
              className="aspect-square shadow-content rounded-lg relative"
            >
              {renderImage(item.detailFirstImage, item.detailImage3)}
              <div className="bg-black/25 rounded-lg absolute w-full h-full left-0 top-0 flex items-end justify-end p-6">
                <p className="text-white">{item.detailTitle}</p>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default MarkedLocations;
