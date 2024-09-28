import React, { useState } from "react";
import EmailInput from './EmailInput';
import { Link } from "react-router-dom";
import { FaCircle } from "react-icons/fa";
import Authenticate from "./Authenticate";

export default function Signup1({ email, setEmail, onVerificationSuccess }) {
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);

  return (
    <div className="h-136">
      <EmailInput
        email={email}
        setEmail={setEmail}
        setEmailChecked={setEmailChecked}
        setEmailAvailable={setEmailAvailable}
      />
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
      <Authenticate email={email} onVerificationSuccess={onVerificationSuccess} />
      <div>
        <span className = "flex">
          <p className = "text-gray-400 mr-2">이미 계정이 있으신가요?</p>
          <p className = "border-b-2 border-black"><Link to="/Login">여기에서 로그인하기</Link></p>
        </span>
      </div>
    </div>
  );
}
