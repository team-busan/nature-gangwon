import React from "react";
import { FaEyeSlash, FaCircle } from "react-icons/fa";

const ConfirmPasswordInput = ({ confirmPassword, onChange, samePassword }) => (
  <div className="form-group mb-4">
    <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">
      비밀번호 확인
    </label>
    <span className="relative">
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        placeholder="비밀번호 확인"
        className="border border-gray-300 p-2 rounded-md w-full"
        required
        value={confirmPassword}
        onChange={onChange}
      />
      <span className="absolute top-0 right-5 text-lg">
        <FaEyeSlash />
      </span>
    </span>
    <div className="flex items-center mt-1">
      <FaCircle className={samePassword ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
      <p>{samePassword ? "비밀번호가 일치합니다" : "비밀번호를 다시 확인 해주세요"}</p>
    </div>
  </div>
);

export default ConfirmPasswordInput;
