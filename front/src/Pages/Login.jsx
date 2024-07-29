import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post('http://localhost:8000/auth/sign-in', {
        userEmail: data.email,
        userPassword: data.password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.code === "SU") {
        // 성공적으로 로그인되면 토큰을 쿠키에 저장
        document.cookie = `token=${data.token}; path=/; max-age=${data.expirationTime}`;
        alert("로그인 성공");
        navigate('/');
      } else {
        setError("로그인 실패: " + data.message);
      }
    },
    onError: () => {
      setError("로그인 중 오류가 발생했습니다.");
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    mutation.mutate({
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <div className="login-container flex justify-center w-full h-screen mt-10">
      <div className="w-6/12 h-5/6 bg-white rounded-lg shadow-xl p-8">
        <span className="flex justify-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Nature 로그인</h1>
        </span>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="아이디 또는 이메일"
              className="border border-gray-300 p-2 rounded-md w-full"
              required
              value={formData.email}
              onChange={handleChange}
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
          <button type="submit" className="w-full bg-gray-400 text-white p-3 rounded-md font-semibold hover:bg-green transition duration-300">
            로그인
          </button>
        </form>
        <div className="mt-4">
          <p>비밀번호를 잊으셨나요?</p>
          <hr className="my-4"/>
          <p>계정이 없으신가요? <Link to="/SignUp" className="text-green">Nature에 가입하기</Link></p>
        </div>
      </div>
    </div>
  );
}
