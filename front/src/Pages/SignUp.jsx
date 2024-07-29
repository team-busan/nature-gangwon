import React, { useState } from "react";
import { useMutation, QueryClient} from '@tanstack/react-query';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const queryClient = new QueryClient();

export default function Signup() {
  const [customDomain, setCustomDomain] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    domain: "gmail.com",
    customDomain: "",
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
    if (customDomain && !formData.customDomain) {
      setError("도메인을 입력해주세요.");
      return false;
    }
    setError(null);
    return true;
  };

  const mutation = useMutation({
    mutationFn: (data) => axios.post('http://localhost:8000/auth/sign-up', data),
    onSuccess: () => {
      alert("회원가입이 성공적으로 완료되었습니다!");
      navigate('/login'); 
    },
    onError: (error) => {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const finalEmail = customDomain && formData.customDomain // 커스텀 도메인 선택인지 , 일반 도메인인지
      ? `${formData.email}@${formData.customDomain}`
      : `${formData.email}@${formData.domain}`;

    mutation.mutate({
      userEmail: finalEmail,
      userPassword: formData.password,
      userNickname: formData.nickname
    });
  };

  return (
      <div className="signup-container flex justify-center items-center w-full h-full mt-10">
        <div className="w-6/12 bg-white rounded-lg shadow-lg p-8">
          <span className="flex justify-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Nature 회원가입</h1>
          </span>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form className = "mb-5"onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
              <div className="email-input flex items-center">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="아이디"
                  className="border border-gray-300 p-2 rounded-l-md w-6/12"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <span className="mx-2">@</span>
                <select
                  id="email-domain"
                  name="domain"
                  className="border border-gray-300 p-2 rounded-r-md w-6/12"
                  onChange={(e) => {
                    setCustomDomain(e.target.value === "custom"); // 선택 시 true 반환, setCustomDomain 실행
                    handleChange(e);
                  }}
                  value={formData.domain}
                >
                  <option value="gmail.com">gmail.com</option>
                  <option value="naver.com">naver.com</option>
                  <option value="daum.net">daum.net</option>
                  <option value="custom">기타</option>
                </select>
                {customDomain && (
                  <input
                    type="text"
                    id="custom-domain"
                    name="customDomain"
                    placeholder="도메인 입력"
                    className="border border-gray-300 p-2 mt-2 rounded-md"
                    value={formData.customDomain}
                    onChange={handleChange}
                  />
                )}
              </div>
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
              <small className="text-gray-600">
                8자 이상 20자 미만, 숫자 또는 문자를 하나 이상 포함해야 합니다.
              </small>
            </div>

            <div className="form-group mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-2">비밀번호 확인</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="비밀번호 확인"
                className="border border-gray-300 p-2 rounded-md w-full"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <small className="text-gray-600">입력한 비밀번호가 일치하는지 확인하세요.</small>
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
          <span className = "">
            <Link to = "/login">
              <p className = "text-green">로그인 페이지로 이동</p>
            </Link>
          </span>
        </div>
      </div>
  );
}
