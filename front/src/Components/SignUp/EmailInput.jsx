import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaCircle } from "react-icons/fa";

export default function EmailInput({
  email,
  setEmail,
  setEmailChecked,
  setEmailAvailable,
}) {
  const [emailValid, setEmailValid] = useState(false);

  const checkEmailAvailability = useMutation({
    mutationFn: (data) =>
      axios.post("http://nature-gangwon.shop:8000/auth/email-check", data),
    onSuccess: (response) => {
      setEmailChecked(true);
      setEmailAvailable(response.data.code !== "DE");
    },
    onError: () => {
      setEmailChecked(true);
      setEmailAvailable(false);
    },
  });

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
    <div>
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
          className="bg-gray-400 hover:bg-softGreen transition duration-300
        text-white w-20 h-10 rounded-lg cursor-pointer"
          disabled={!emailValid}
        >
          중복확인
        </button>
      </div>
      <div className="flex items-center">
        <FaCircle
          className={
            emailValid ? "text-green mr-1 text-xs" : "text-red-600 mr-1 text-xs"
          }
        />
        <p>
          {emailValid
            ? "올바른 이메일 형식입니다."
            : "올바르지 않은 이메일 형식입니다."}
        </p>
      </div>
    </div>
  );
}
