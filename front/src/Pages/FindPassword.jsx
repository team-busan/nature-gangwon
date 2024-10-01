import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import FindPasswordStep1 from "../Components/SignUp/FindPasswordStep1";
import FindPasswordStep2 from "../Components/SignUp/FindPasswordStep2";

export default function FindPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const sendVerificationCode = useMutation({
    mutationFn: (data) =>
      axios.post(
        "https://nature-gangwon.shop/auth/member/email-send-certification",
        data
      ),
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
      axios.post("https://nature-gangwon.shop/auth/certification-check", data),
    onSuccess: () => {
      setCurrentStep(currentStep + 1);
    },
    onError: () => {
      Swal.fire({
        title: "인증코드가 유효하지 않습니다.",
        confirmButtonColor: "red",
      });
    },
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

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
    <div className="flex justify-center w-full h-screen mt-10">
      <div className="w-6/12 h-5/6 bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-center">비밀번호 찾기</h1>
        {currentStep === 1 && (
          <FindPasswordStep1
            email={email}
            handleSendCode={handleSendCode}
            handleEmailChange={handleEmailChange}
            handleVerifyCode={handleVerifyCode}
            setVerificationCode={setVerificationCode}
          />
        )}
        {currentStep === 2 && <FindPasswordStep2 email={email} />}
      </div>
    </div>
  );
}
