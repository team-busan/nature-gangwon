import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Signup1 from '../Components/SignUp/SignUp1';
import Signup2 from '../Components/SignUp/SignUp2';

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleVerificationSuccess = () => {
    setIsVerified(true);
    handleNextStep();
  };

  return (
    <div className="signup-container flex justify-center items-center w-full h-full mt-10">
      <div className="w-6/12 bg-white rounded-lg shadow-lg p-8">
        <h1 className = "text-center mb-4">Nature 회원가입</h1>
        {currentStep === 1 && (
          <Signup1
            email={email}
            setEmail={handleEmailChange}
            onVerificationSuccess={handleVerificationSuccess}
          />
        )}
        {currentStep === 2 && (
          <Signup2 email={email} />
        )}
      </div>
    </div>
  );
}
