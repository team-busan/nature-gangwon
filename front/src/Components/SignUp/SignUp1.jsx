import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Signup1({ email, setEmail, onVerificationSuccess }) {
  const [verificationCode, setVerificationCode] = useState(""); // 서버 인증코드 확인
  const [emailValid, setEmailValid] = useState(false); // 이메일 주소 유효 확인
  const [emailChecked, setEmailChecked] = useState(false); // 이메일 주소 중ㅂ고 체크
  const [emailAvailable, setEmailAvailable] = useState(false); // 주소가 중복되지 않고 사용 가능한지

  const sendVerificationCode = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:8000/auth/email-send-certification", data),
    onSuccess: () => {
      alert("메일을 발송했습니다");
    },
    onError: () => {
      alert("메일 발송에 실패했습니다. 다시 시도해주세요.");
    }
  });

  const verifyCode = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:8000/auth/certification-check", data),
    onSuccess: () => {
      onVerificationSuccess();
    },
    onError: () => {
      alert("인증 코드가 유효하지 않습니다.");
    },
  });

  const checkEmailAvailability = useMutation({
    mutationFn: (data) =>
      axios.post("http://localhost:8000/auth/email-check", data),
    onSuccess: (response) => {
      setEmailChecked(true);
      setEmailAvailable(response.data.code !== "DE");
    },
    onError: () => {
      setEmailChecked(true);
      setEmailAvailable(false);
    },
  });

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!emailChecked || !emailAvailable) {
      alert("이메일 중복 체크를 해주세요.");
      return;
    }
    sendVerificationCode.mutate({ userEmail: email });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    verifyCode.mutate({ userEmail : email, certificationCode: verificationCode });
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailPattern.test(emailValue));

    setEmailChecked(false);
    setEmailAvailable(false);
  };

  const handleEmailCheck = () => {
    if (emailValid) {
      checkEmailAvailability.mutate({ userEmail: email });
    }
  };

  return (
    <div className="h-136">
      <form onSubmit={handleSendCode}>
        <label>Email</label>
        <div className="flex">
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일 주소"
            className="border border-gray-300 p-2 rounded-md w-full mb-2 mr-2"
            required
          />
          <button
            type="button"
            onClick={handleEmailCheck}
            className="bg-gray-400 text-white w-20 h-10 rounded-lg"
            disabled={!emailValid}
          >
            중복확인
          </button>
        </div>
        <div className="flex items-center">
          <FaCircle className={emailValid ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
          <p>{emailValid ? "올바른 이메일 형식입니다." : "올바르지 않은 이메일 형식입니다."}</p>
        </div>
        <div className="flex items-center mt-1">
          <FaCircle className={emailAvailable ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"} />
          <p>
            {emailChecked
              ? emailAvailable
                ? "사용 가능한 이메일입니다."
                : "중복된 이메일입니다!"
              : "이메일 중복 체크를 해주세요."}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-green transition duration-300"
          disabled={!emailValid || !emailAvailable}
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
          disabled={!verificationCode}
        >
          인증번호 확인
        </button>
      </form>
      <Link to="./">이미 계정이 있으신가요? 로그인하기</Link>
    </div>
  );
}
