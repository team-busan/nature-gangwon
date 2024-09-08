import { useRecoilState } from "recoil";
import { userState } from "../../state/userState.js";

import defaultImage from "../../img/profile.jpg";

const ProfileCard = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    <div className="w-[350px] h-[500px] py-10 rounded-lg bg-random bg-cover flex flex-col items-center justify-between">
      <img
        className="w-[150px] h-[150px] rounded-full"
        src={
          user.userProfile === "/image/profile.jpg"
            ? defaultImage
            : user.userProfile
        }
        alt={user.userNickname}
      />
      <div className="bg-black/75 py-1 px-2 rounded-xl">
        <span className="text-white text-xl">{user.userNickname} 님</span>
      </div>
    </div>
  );
};

export default ProfileCard;
