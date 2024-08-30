import ProfileCard from "../Components/MyPage/ProfileCard.jsx";
import MyActivity from "../Components/MyPage/MyActivity.jsx";
import MyPageContentsContainer from "../Components/MyPage/MyPageContentsContainer.jsx";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const MyPage = () => {
  const [contentNum, setContentNum] = useState(0);

  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["myPageData"],
  //   queryFn: getData,
  // });

  const samplePhotos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="max-w-[1420px] my-[50px]">
      <div className="flex gap-x-8">
        <ProfileCard />
        <MyActivity contentNum={contentNum} setContentNum={setContentNum} />
      </div>
      <MyPageContentsContainer
        contentNum={contentNum}
        // data={data}
        // plan={plan}
        // samplePhotos={samplePhotos}
      />
    </div>
  );
};

export default MyPage;
