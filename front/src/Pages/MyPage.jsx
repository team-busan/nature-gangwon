import ProfileCard from "../Components/MyPage/ProfileCard.jsx";
import MyActivity from "../Components/MyPage/MyActivity.jsx";
import MyPageContentsContainer from "../Components/MyPage/MyPageContentsContainer.jsx";

import { useState } from "react";

const MyPage = () => {
  const [contentNum, setContentNum] = useState(0);

  return (
    <div className="max-w-[1420px] my-[50px]">
      <div className="flex gap-x-8">
        <ProfileCard />
        <MyActivity contentNum={contentNum} setContentNum={setContentNum} />
      </div>
      <MyPageContentsContainer contentNum={contentNum} />
    </div>
  );
};

export default MyPage;
