import React from "react";
import { FaEyeSlash, FaCircle } from "react-icons/fa";

const PasswordInput = ({ password, onChange, passwordValid1, passwordValid2 }) => (
  <div className="form-group mb-4">
    <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
      비밀번호
    </label>
    <span className="relative">
      <input
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호"
        className="border border-gray-300 p-2 rounded-md w-full"
        required
        value={password}
        onChange={onChange}
      />
      <span className="absolute top-0 right-5 text-lg">
        <FaEyeSlash />
      </span>
    </span>
    <div className="flex items-center mt-1">
      <FaCircle className={passwordValid1 ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
      <p>{passwordValid1 ? "8자 이상 20자 미만입니다." : "8자 이상 20자 미만으로 입력해주세요"}</p>
    </div>
    <div className="flex items-center mt-1">
      <FaCircle className={passwordValid2 ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
      <p>{passwordValid2 ? "숫자 또는 문자가 하나 이상입니다" : "숫자 또는 문자 하나 이상 입력해주세요"}</p>
    </div>
  </div>
);

export default PasswordInput;
