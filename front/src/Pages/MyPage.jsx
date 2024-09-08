import ProfileCard from "../Components/MyPage/ProfileCard.jsx";
import MyActivity from "../Components/MyPage/MyActivity.jsx";
import MyPageContentsContainer from "../Components/MyPage/MyPageContentsContainer.jsx";

import { useEffect, useState } from "react";
import { userState } from "../state/userState.js";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const MyPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    if (!user) {
      navigate("/Login");
    }
  }, []);

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
