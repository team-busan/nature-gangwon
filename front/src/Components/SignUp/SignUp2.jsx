import React, { useState } from "react";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup2({ email }) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    nickname: ""
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
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
    mutationFn: (data) => axios.post('http://localhost:8000/auth/signup', data),
    onSuccess: () => {
      alert("회원가입이 완료되었습니다!");
      navigate('/login');
    },
    onError: () => {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    mutation.mutate({
      email,
      password: formData.password,
      nickname: formData.nickname
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4">회원가입 정보 입력</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            readOnly
            className="border border-gray-300 p-2 rounded-md w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            className="border border-gray-300 p-2 rounded-md w-full"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold mb-2">비밀번호 확인</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            className="border border-gray-300 p-2 rounded-md w-full"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="nickname" className="block text-gray-700 font-semibold mb-2">닉네임</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임"
            className="border border-gray-300 p-2 rounded-md w-full"
            required
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="w-full bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-green transition duration-300">
          회원가입
        </button>
      </form>
    </div>
  );
}
