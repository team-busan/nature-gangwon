import React from "react";
import { FaCircle } from "react-icons/fa";

const NicknameInput = ({ nickname, onChange, nicknameValid, nicknameChecked, checkNickname }) => (
  <div className="form-group mb-6">
    <label htmlFor="nickname" className="block text-gray-700 font-semibold mb-2">
      닉네임
    </label>
    <span className="flex">
      <input
        type="text"
        id="nickname"
        name="nickname"
        placeholder="닉네임"
        className="border border-gray-300 p-2 rounded-md w-full"
        required
        value={nickname}
        onChange={onChange}
      />
      <button
        type="button"
        onClick={checkNickname}
        className="ml-2 bg-gray-400 text-white rounded-md h-10 w-20 hover:bg-softGreen transition duration-300"
      >
        중복 확인
      </button>
    </span>
    <div className="flex items-center mt-1">
      <FaCircle className={nicknameValid ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
      <p>{nicknameValid ? "2글자 이상입니다" : "2글자 이상 입력해주세요"}</p>
    </div>
    <div className="flex items-center mt-1">
      <FaCircle className={nicknameChecked ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
      <p>{nicknameChecked ? "사용 가능한 닉네임 입니다" : "중복 확인 버튼을 눌러주세요"}</p>
    </div>
  </div>
);

export default NicknameInput;
