import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const MyPhotos = () => {
  const [cookies, setCookies] = useCookies(["token"]);
  const [photos, setPhotos] = useState([]);

  const getMyPhotos = async () => {
    const res = await axios.get("/api/plan/photo-list", {
      headers: {
        Authorization: `Bearer ${cookies.token}`,
      },
    });
    setPhotos(res.data.photoList);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["photoList"],
    queryFn: getMyPhotos,
  });

  return (
    <ul className="grid grid-cols-4 justify-between gap-6">
      {photos.length === 0 ? (
        <div>아직 업로드한 사진이 없습니다</div>
      ) : (
        photos.map((item, idx) => {
          return item?.photoUrls.map((photo, idx2) => {
            return (
              <div
                key={idx.toString() + idx2.toString()}
                className="flex flex-col gap-2"
              >
                <motion.li
                  initial={{ translateY: 0 }}
                  whileHover={{ translateY: -3 }}
                  className="rounded-xl aspect-square relative cursor-pointer shadow-content"
                  key={idx.toString() + idx2.toString()}
                >
                  <Link to={`/plan/${item.planId}`}>
                    <img
                      src={photo}
                      alt="여행 이미지"
                      className="absolute w-full h-full rounded-xl object-cover"
                    />
                  </Link>
                </motion.li>
                <p>{item.planTitle}</p>
              </div>
            );
          });
        })
      )}
    </ul>
  );
};

export default MyPhotos;
