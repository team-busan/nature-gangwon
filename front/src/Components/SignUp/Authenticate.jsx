import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

export default function Authenticate({ email, onVerificationSuccess }) {
  const [verificationCode, setVerificationCode] = useState("");

  const sendVerificationCode = useMutation({
    mutationFn: (data) =>
      axios.post("/proxy/api/auth/email-send-certification", data),
    onSuccess: () => {
      Swal.fire({
        title: "메일을 발송 했습니다",
        confirmButtonColor: "green",
      });
    },
    onError: () => {
      alert("메일 발송에 실패했습니다. 다시 시도해주세요.");
    },
  });

  const verifyCode = useMutation({
    mutationFn: (data) =>
      axios.post("/proxy/api/auth/certification-check", data),
    onSuccess: () => {
      onVerificationSuccess(verificationCode); // 인증코드 확인
    },
    onError: () => {
      Swal.fire({
        title: "인증코드가 유효하지 않습니다.",
        confirmButtonColor: "red",
      });
    },
  });

  const handleSendCode = (e) => {
    e.preventDefault();
    sendVerificationCode.mutate({ userEmail: email });
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    verifyCode.mutate({
      userEmail: email,
      certificationCode: verificationCode,
    });
  };

  return (
    <div>
      <form onSubmit={handleSendCode}>
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300"
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
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300 mb-4 cursor-pointer"
          disabled={!verificationCode}
        >
          인증번호 확인
        </button>
      </form>
    </div>
  );
}
