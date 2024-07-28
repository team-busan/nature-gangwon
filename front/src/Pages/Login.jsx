import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="login-container flex justify-center w-full h-screen mt-10">
      <div className="w-6/12 h-5/6 bg-white rounded-lg shadow-xl p-8">
        <span className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Nature 로그인</h1>
        </span>
        <form>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="아이디 또는 이메일"
              className="border border-gray-300 p-2 rounded-md w-full"
              required
            />
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
          </div>
          <button type="submit" className="w-full bg-green text-white p-3 rounded-md font-semibold hover:bg-blue-600 transition duration-300">
            로그인
          </button>
        </form>
        <span>
          <p>비밀번호를 잊으셨나요?</p>
          <hr/>
        </span>
        <span className = "flex">
          <p>계정이 없으신가요?</p>
          <Link to = "/SignUp">
            <p>Nature에 가입하기</p>
          </Link>
        </span>
      </div>
    </div>
  );
}
