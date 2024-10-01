import React, { useState } from "react";
import { FaEyeSlash, FaCircle } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function FindPasswordStep2({ email }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [passwordValid1, setPasswordValid1] = useState(false);
  const [passwordValid2, setPasswordValid2] = useState(false);
  const [samePassword, setSamePassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newFormData = { ...prevData, [name]: value };

      const passwordPattern1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,19}$/;
      setPasswordValid1(passwordPattern1.test(newFormData.password));

      const passwordPattern2 = /[a-zA-Z0-9]+/;
      setPasswordValid2(passwordPattern2.test(newFormData.password));

      setSamePassword(newFormData.password === newFormData.confirmPassword);

      return newFormData;
    });
  };

  const mutation = useMutation({
    mutationFn: (data) => axios.patch("/proxy/api/user/password", data),
    onSuccess: () => {
      Swal.fire({
        title: "비밀번호가 성공적으로 변경되었습니다!",
        confirmButtonColor: "green",
      });
      navigate("/Login");
    },
    onError: () => {
      Swal.fire({
        title: "비밀번호 변경에 실패했습니다.",
        confirmButtonColor: "red",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!samePassword || !passwordValid1 || !passwordValid2) {
      Swal.fire({
        title: "비밀번호를 올바르게 입력해주세요.",
        confirmButtonColor: "red",
      });
      return;
    }
    mutation.mutate({
      userPassword: formData.password,
      userEmail: email,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block text-gray-700 mb-2">
          이메일
        </label>
        <input
          type="email"
          value={email}
          required
          placeholder="이메일을 입력 해주세요"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          disabled
        />

        <label htmlFor="password" className="block text-gray-700 mb-2">
          새 비밀번호
        </label>
        <span className="relative">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="새로운 비밀번호를 입력해주세요"
            className="border border-gray-300 p-2 rounded-md w-full"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <span className="absolute top-0 right-5 text-lg">
            <FaEyeSlash />
          </span>
        </span>
        <div className="flex items-center mt-1">
          <FaCircle
            className={
              passwordValid1
                ? "text-green mr-1 text-xs"
                : "text-red-600 mr-1 text-xs"
            }
          />
          <p>
            {passwordValid1
              ? "8자 이상 20자 미만입니다."
              : "8자 이상 20자 미만으로 입력해주세요"}
          </p>
        </div>
        <div className="flex items-center mt-1">
          <FaCircle
            className={
              passwordValid2
                ? "text-green mr-1 text-xs"
                : "text-red-600 mr-1 text-xs"
            }
          />
          <p>
            {passwordValid2
              ? "숫자 또는 문자가 하나 이상입니다"
              : "숫자 또는 문자 하나 이상 입력해주세요"}
          </p>
        </div>
        <label
          htmlFor="confirmPassword"
          className="block text-gray-700 mb-2 mt-4"
        >
          비밀번호 확인
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="비밀번호를 다시 입력해주세요"
          className="border border-gray-300 p-2 rounded-md w-full"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="flex items-center mt-1">
          <FaCircle
            className={
              samePassword
                ? "text-green mr-1 text-xs"
                : "text-red-600 mr-1 text-xs"
            }
          />
          <p>
            {samePassword
              ? "비밀번호가 일치합니다."
              : "비밀번호가 일치하지 않습니다."}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300 mt-4"
        >
          비밀번호 변경
        </button>
      </form>
    </div>
  );
}
