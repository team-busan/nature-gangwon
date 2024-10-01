import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import ConfirmPasswordInput from "./ConfirmPasswordInput";
import NicknameInput from "./NicknameInput";

export default function Signup2({ email, certificationCode }) {
  const [passwordValid1, setPasswordValid1] = useState(false);
  const [passwordValid2, setPasswordValid2] = useState(false);
  const [samePassword, setSamePassword] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    nickname: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };

      const passwordPattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,19}$/;
      setPasswordValid1(passwordPattern1.test(newFormData.password));

      const passwordPattern2 = /[a-zA-Z0-9]+/;
      setPasswordValid2(passwordPattern2.test(newFormData.password));

      setSamePassword(newFormData.password === newFormData.confirmPassword);

      if (name === "nickname") {
        setNicknameValid(value.length >= 2);
        setNicknameChecked(false);
      }

      return newFormData;
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return false;
    }
    setError(null);
    return true;
  };

  const mutation = useMutation({
    mutationFn: (data) => axios.post("/proxy/api/auth/sign-up", data),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate("/login");
    },
    onError: () => {
      setError("회원가입 중 오류가 발생했습니다.");
    },
  });

  const nicknameCheckMutation = useMutation({
    mutationFn: (nickname) =>
      axios.post("/proxy/api/auth/nickname-check", {
        userNickname: nickname,
      }),
    onSuccess: (response) => {
      if (response.data.code === "SU") {
        setNicknameValid(true);
        setNicknameChecked(true);
      } else {
        setNicknameValid(false);
        setNicknameChecked(false);
      }
    },
    onError: (error) => {
      setNicknameValid(false);
      setNicknameChecked(false);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate({
      userEmail: email,
      userPassword: formData.password,
      userNickname: formData.nickname,
      certificationCode: certificationCode,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="form-group mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
            className="border border-gray-300 p-2 rounded-md w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <PasswordInput
          password={formData.password}
          onChange={handleChange}
          passwordValid1={passwordValid1}
          passwordValid2={passwordValid2}
        />

        <ConfirmPasswordInput
          confirmPassword={formData.confirmPassword}
          onChange={handleChange}
          samePassword={samePassword}
        />

        <NicknameInput
          nickname={formData.nickname}
          onChange={handleChange}
          nicknameValid={nicknameValid}
          nicknameChecked={nicknameChecked}
          checkNickname={() => nicknameCheckMutation.mutate(formData.nickname)}
        />

        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300"
        >
          회원가입
        </button>
      </form>
      <div classname="">
        <span className="flex">
          <p className="text-gray-400 mr-2">이미 계정이 있으신가요?</p>
          <p className="border-b-2 border-black">
            <Link to="/Login">여기에서 로그인하기</Link>
          </p>
        </span>
      </div>
    </div>
  );
}
