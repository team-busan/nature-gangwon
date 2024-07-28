import React, { useState } from "react";

export default function Signup() {
  const [customDomain, setCustomDomain] = useState(false);

  return (
    <div className="signup-container flex justify-center items-center w-full h-full mt-10">
      <div className="w-6/12 bg-white rounded-lg shadow-lg p-8">
        <span className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Nature 회원가입</h1>
        </span>
        <form>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <div className="email-input flex items-center">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="아이디"
                className="border border-gray-300 p-2 rounded-l-md w-full"
                required
              />
              <span className="mx-2">@</span>
              <select
                id="email-domain"
                name="email-domain"
                className="border border-gray-300 p-2 rounded-r-md"
                onChange={(e) => setCustomDomain(e.target.value === "custom")}
              >
                <option value="gmail.com">gmail.com</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.net">daum.net</option>
                <option value="custom">기타</option>
              </select>
              {customDomain && (
                <input
                  type="text"
                  id="custom-domain"
                  name="custom-domain"
                  placeholder="도메인 입력"
                  className="border border-gray-300 p-2 mt-2 rounded-md w-full"
                />
              )}
            </div>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호"
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
            <small className="text-gray-600">
              8자 이상 20자 미만, 숫자 또는 문자를 하나 이상 포함해야 합니다.
            </small>
          </div>

          <div className="form-group mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">비밀번호 확인</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="비밀번호 확인"
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
            <small className="text-gray-600">입력한 비밀번호가 일치하는지 확인하세요.</small>
          </div>

          <div className="form-group mb-6">
            <label htmlFor="nickname" className="block text-gray-700 font-semibold mb-2">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임"
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
          </div>

          <button type="submit" className="w-full bg-green text-white p-3 rounded-md font-semibold hover:bg-green-600 transition duration-300">
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
