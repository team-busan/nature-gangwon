import { useRecoilState } from "recoil";
import { userState } from "../../state/userState";
import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import NicknameInput from "../SignUp/NicknameInput";
import { Link } from "react-router-dom";
import DefaultImage from "../../img/profile.jpg";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";

const EditProfile = () => {
  const [cookie, setCookie] = useCookies(["token"]);
  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(
    user.userNickname ? user.userNickname : ""
  );
  const [profileImg, setProfileImg] = useState(user.userProfile);
  const [patchProfile, setPatchProfile] = useState("");
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const profileImgRef = useRef(null);

  const handleProfileImgChange = () => {
    if (profileImgRef.current?.files !== null) {
      const formData = new FormData();
      formData.append("file", profileImgRef.current?.files[0]);
      axios
        .post("http://nature-gangwon.shop/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "업로드 완료",
            text: "프로필 이미지가 업로드되었습니다. 아래 저장 버튼을 눌러 변경사항을 저장해주세요.",
            showConfirmButton: true,
            timer: 5000,
          });
          setPatchProfile(res.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "업로드 실패",
            text: "프로필 이미지를 업로드하는데 실패했습니다. 새로고침 후에 다시 시도해주세요.",
            showConfirmButton: true,
            timer: 5000,
          });
          return;
        });
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
      axios.post("https://nature-gangwon.shop/auth/nickname-check", {
        userNickname: nickname,
      }),
    onSuccess: (response) => {
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

  const handleDefaultProfile = () => {
    setProfileImg("/image/profile.jpg");
    setPatchProfile("/image/profile.jpg");
    Swal.fire({
      icon: "success",
      title: "기본 프로필 사진으로 변경 완료",
      text: "프로필 이미지가 기본 이미지로 변경되었습니다. 아래 저장 버튼을 눌러 변경사항을 저장해주세요.",
      showConfirmButton: true,
      timer: 5000,
    });
  };

  const handleSubmit = () => {
    // 변경사항이 없을 경우
    if (user.userProfile === patchProfile && user.userNickname === nickname) {
      return;
    }

    // 프로필 변경
    if (user.userProfile !== patchProfile) {
      axios
        .patch(
          "http://nature-gangwon.shop/user/profile",
          {
            userProfile: patchProfile,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        )
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "수정 실패",
            text: "프로필 이미지를 수정하는데 실패했습니다. 새로고침 후에 다시 시도해주세요.",
            showConfirmButton: true,
            timer: 5000,
          });
          return;
        });
    }

    // 닉네임 변경
    if (user.userNickname !== nickname) {
      axios
        .patch(
          "http://nature-gangwon.shop/user/nickname",
          {
            userNickname: nickname,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          }
        )
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "수정 실패",
            text: "닉네임을 수정하는데 실패했습니다. 새로고침 후에 다시 시도해주세요.",
            showConfirmButton: true,
            timer: 5000,
          });
          return;
        });
    }

    // redux 유저 상태 업데이트
    const userCopy = { ...user };
    userCopy.userProfile = patchProfile;
    userCopy.userNickname = nickname;
    setUser(userCopy);

    Swal.fire({
      icon: "success",
      title: "수정 완료",
      text: "프로필 정보가 수정되었습니다.",
      showConfirmButton: true,
      timer: 5000,
    });
  };

  return (
    <div className="w-3/4 mx-auto py-24 px-32 border-[1px] border-gray-200 rounded-xl shadow-lg flex flex-col gap-20">
      <div className="w-full flex justify-center">
        <h3>정보 수정</h3>
      </div>
      <div className="flex flex-col gap-20">
        <img
          src={profileImg === "/image/profile.jpg" ? DefaultImage : profileImg}
          alt="사용자 프로필 이미지"
          onClick={() => profileImgRef.current?.click()}
          className="rounded-full bg-random bg-cover w-[150px] h-[150px] mx-auto cursor-pointer shadow-content"
        />
        <input
          ref={profileImgRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfileImgChange}
        />
        <button
          onClick={handleDefaultProfile}
          className="bg-darkGreen py-2 px-3 rounded-lg text-white w-fit self-center"
        >
          기본 프로필 사진으로 변경하기
        </button>
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
      <Link to="/FindPassword" className="underline mx-auto">
        비밀번호를 잊으셨나요?
      </Link>
    </div>
  );
};

export default EditProfile;
