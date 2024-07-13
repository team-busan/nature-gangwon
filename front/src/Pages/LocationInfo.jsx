import React, { useEffect, useState } from "react";
import mainImg from "../img/LocationMain.jpg";
import { API_URL, axiosInstance } from "../Stores/API";

export default function LocationInfo() {
  const locations = [
    "전체",
    "강릉시",
    "고성군",
    "동해시",
    "삼척시",
    "속초시",
    "양구군",
    "양양군",
    "영월군",
    "원주시",
    "인제군",
    "정선군",
    "철원군",
    "춘천시",
    "태백시",
    "평창군",
    "홍천군",
    "화천군",
    "횡성군",
  ];

  const [selectedLocation, setSelectedLocation] = useState("전체");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(API_URL.LocationInfo)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <section className="w-screen h-104">
        <img
          src={mainImg}
          alt="메인 이미지"
          className="w-screen h-full bg-cover"
        />
      </section>
      <section className="w-1420 mx-auto mb-5">
        <h2 className="text-xl font-semibold mb-4 p-2">
          강원도 지역을 선택해보세요!
        </h2>
        <div className="flex flex-wrap gap-2">
          {locations.map((location, index) => (
            <button
              key={index}
              onClick={() => handleLocationClick(location)}
              className={`px-4 py-2 border rounded-full ${
                selectedLocation === location
                  ? "bg-green text-white"
                  : "bg-white text-black"
              }`}
            >
              {location}
            </button>
          ))}
        </div>
      </section>
      <section className="w-screen bg-lightGreen h-16 mb-5">
        <div className="w-1420 h-full mx-auto flex items-center p-2">
          <button className="font-bold mr-5">전체</button>
          <button className="font-bold mr-5">인기순</button>
          <button className="font-bold mr-5">후기순</button>
        </div>
      </section>
      <section className="w-screen">
        <div className="w-1420 mx-auto p-2">
          <input
            placeholder="강원도 관광지를 검색 해보세요!"
            className="w-5/12 rounded-full mr-5 p-3 border border-black"
          />
          <button className="bg-green rounded-full text-white p-3 w-20">
            검색
          </button>
        </div>
      </section>
      <section className="w-full overflow-x-hidden">
        {loading && <p>Loading...</p>}
        {!loading && !error && (
          <div className="w-1420 mx-auto p-2 flex flex-wrap">
            {data.map((item) => (
              <div key={item.id} className="w-1/4 p-2">
                <ul className="bg-white rounded-lg shadow">
                  <li className="w-full h-40">
                    <img
                      src={item.img}
                      className="w-full h-full object-cover rounded-t-lg"
                      alt="관광지 이미지"
                    />
                  </li>
                  <li className="p-2">
                    <div className="flex justify-between">
                      <p>{item.region}</p>
                      <p>{item.comments}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>{item.name}</p>
                      <p>{item.rating}</p>
                    </div>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
