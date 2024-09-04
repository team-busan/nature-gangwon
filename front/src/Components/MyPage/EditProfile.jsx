import { useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import NicknameInput from "../SignUp/NicknameInput";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState(user.userProfile);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const profileImgRef = useRef(null);

  const handleProfileImgChange = () => {
    if (profileImgRef.current?.files !== null) {
      setProfileImg(URL.createObjectURL(profileImgRef.current?.files[0]));
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.currentTarget.value);
    setNicknameValid(e.currentTarget.value.length >= 2);
    setNicknameChecked(false);
  };

  const nicknameCheckMutation = useMutation({
    mutationFn: (nickname) =>
      axios.post("http://localhost:8000/auth/nickname-check", {
        userNickname: nickname,
      }),
    onSuccess: (response) => {
      console.log("Nickname check response:", response.data);
      if (response.data.code === "SU") {
        setNicknameValid(true);
        setNicknameChecked(true);
      } else {
        setNicknameValid(false);
        setNicknameChecked(false);
      }
    },
    onError: (error) => {
      console.error("Nickname check error:", error);
      setNicknameValid(false);
      setNicknameChecked(false);
    },
  });

  const handleSubmit = () => {};

  return (
    <div className="w-3/4 mx-auto py-24 px-32 border-[1px] border-gray-200 rounded-xl shadow-lg flex flex-col gap-20">
      <div className="w-full flex justify-center">
        <h3>정보 수정</h3>
      </div>
      <div className="flex flex-col gap-20">
        <img
          src={profileImg}
          alt="사용자 프로필 이미지"
          onClick={() => profileImgRef.current?.click()}
          className="rounded-full bg-random bg-cover w-[150px] h-[150px] mx-auto cursor-pointer"
        />
        <input
          ref={profileImgRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImgChange}
        />
        <NicknameInput
          nickname={nickname}
          onChange={handleNicknameChange}
          nicknameValid={nicknameValid}
          nicknameChecked={nicknameChecked}
          checkNickname={() => nicknameCheckMutation.mutate(nickname)}
        />
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-darkGreen py-2 px-4 rounded-lg text-white"
      >
        저장
      </button>
      <Link to="" className="underline mx-auto">
        비밀번호를 잊으셨나요?
      </Link>
    </div>
  );
};

export default EditProfile;
