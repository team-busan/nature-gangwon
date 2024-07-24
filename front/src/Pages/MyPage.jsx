import ProfileCard from "../Components/MyPage/ProfileCard.jsx";
import MyActivity from "../Components/MyPage/MyActivity.jsx";
import MyPageContentsContainer from "../Components/MyPage/MyPageContentsContainer.jsx";

import { user_info, plan } from "../Stores/mockData.js";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance, API_URL } from "../Stores/API.js";

const MyPage = () => {
  const user = user_info[0];

  const [contentNum, setContentNum] = useState(0);

  const getData = async () => {
    const res = await axiosInstance.get(API_URL.SEARCH);
    return res.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["myPageData"],
    queryFn: getData,
  });

  const samplePhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="max-w-[1420px] my-[50px]">
      <div className="flex gap-x-8">
        <ProfileCard
          user_nickname={user.user_nickname}
          user_profile={user.user_profile}
        />
        <MyActivity contentNum={contentNum} setContentNum={setContentNum} />
      </div>
      <MyPageContentsContainer
        contentNum={contentNum}
        data={data}
        plan={plan}
        samplePhotos={samplePhotos}
      />
    </div>
  );
};

export default MyPage;
