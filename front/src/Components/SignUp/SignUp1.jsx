import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Signup1({ email, setEmail, onVerificationSuccess }) {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState(null);

  const sendVerificationCode = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:8000/auth/send-verification", data),
    onSuccess: () => {
      alert("인증 코드가 이메일로 전송되었습니다.");
    },
    onError: () => {
      setError("인증 코드를 발송하는 중 오류가 발생했습니다.");
    },
  });

  const verifyCode = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:8000/auth/verify-code", data),
    onSuccess: () => {
      onVerificationSuccess();
    },
    onError: () => {
      setError("인증 코드가 유효하지 않습니다.");
    },
  });

  const handleSendCode = (e) => {
    e.preventDefault();
    sendVerificationCode.mutate({ email });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    verifyCode.mutate({ email, code: verificationCode });
  };

  return (
    <div className="h-136">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSendCode}>
        <label>Email</label>
        <span className = "flex">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일 주소"
            className="border border-gray-300 p-2 rounded-md w-full mb-2 mr-2"
            required
          />
          <button className = "bg-gray-400 text-white w-20 h-10 rounded-lg">
            중복확인
          </button>
        </span>
        <span className="flex items-center">
          <FaCircle className="text-red-600 mr-1 text-xs" />
          <p>올바르지 않은 이메일 형식입니다</p>
        </span>
        <span className="flex items-center">
          <FaCircle className="text-red-600 mr-1 text-xs" />
          <p>이메일 중복 체크 버튼을 눌러주세요</p>
        </span>
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-green transition duration-300"
        >
          인증번호 보내기
        </button>
      </form>
      <form onSubmit={handleVerifyCode} className="mt-4">
        <label>인증번호</label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="인증 코드 입력"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-green transition duration-300 mb-4"
        >
          인증번호 확인
        </button>
      </form>
      <Link to="./">이미 계정이 있으신가요? 로그인하기</Link>
    </div>
  );
}
