import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Signup1 from '../Components/SignUp/SignUp1';
import Signup2 from '../Components/SignUp/SignUp2';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [certificationCode, setCertificationCode] = useState(""); // 인증코드 저장
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleVerificationSuccess = (code) => {
    setCertificationCode(code); // 인증코드 저장
    handleNextStep(); // 다음 페이지 이동
  };

  return (
    <div className="signup-container flex justify-center items-center w-full h-full mt-10">
      <div className="w-6/12 bg-white rounded-lg shadow-lg p-8">
        <h1 className = "text-center mb-4">Nature 회원가입</h1>
        {currentStep === 1 && (
          <Signup1
            email={email}
            setEmail={handleEmailChange} // 이메일 저장
            onVerificationSuccess={handleVerificationSuccess} // 인증코드 받아옴
          />
        )}
        {currentStep === 2 && (
          <Signup2 email={email} certificationCode={certificationCode} /> // 받아온 이메일, 인증코드 보냄
        )}
      </div>
    </div>
  );
}
