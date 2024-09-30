import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaEyeSlash } from "react-icons/fa";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { userState } from "../state/userState";
import Swal from "sweetalert2";
import naverLoginImg from "../img/btnG_축약형.png";
import kokooLoginImg from "../img/kakao_login_small.png";
import gogleLoginImg from "../img/web_neutral_rd_SU@2x.png";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["token"]);
  const queryClient = useQueryClient();
  const setUser = useSetRecoilState(userState); // Recoil 상태 업데이트 함수

  const fetchUserData = async (token) => {
    const response = await axios.get("http://nature-gangwon.shop:8000/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        "http://nature-gangwon.shop:8000/auth/sign-in",
        {
          userEmail: data.email,
          userPassword: data.password,
        }
      );
      return response.data;
    },
    onSuccess: async (data) => {
      if (data.code === "SU") {
        setCookie("token", data.token, {
          path: "/" /* 전역에서 쿠키접근 가능 */,
          maxAge: data.expirationTime /* 쿠키 유효기간 설정 */,
        });
        try {
          const userData = await fetchUserData(data.token); // 토큰 보내면 유저 정보 받아서 저장
          setUser({
            userEmail: userData.userEmail,
            userNickname: userData.userNickname,
            userProfile: userData.userProfile,
          });
          Swal.fire({
            title: "로그인 성공!",
            icon: "success",
            confirmButtonText: "확인",
            confirmButtonColor: "green",
          });
          queryClient.invalidateQueries("user");
          console.log(data.token);
          navigate("/");
        } catch (err) {
          setError("에러 발생");
        }
      } else {
        setError("로그인 실패: " + data.message);
      }
    },
    onError: () => {
      setError("로그인 실패, 아이디나 패스워드를 다시 확인 해주세요!");
    },
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
          <h1 className="text-4xl text-gray-800">Nature 로그인</h1>
        </span>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              이메일
            </label>
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
            <label htmlFor="password" className="block text-gray-700 mb-2">
              비밀번호
            </label>
            <div className="relative">
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
              <span className="absolute top-3 right-3 text-lg">
                <FaEyeSlash />
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300"
          >
            로그인
          </button>
        </form>
        <div className="mt-4">
          <Link to="/FindPassword">비밀번호를 잊으셨나요?</Link>
          <p className="text-gray-400 mt-4">
            계정이 없으신가요?{" "}
            <Link to="/SignUp" className="text-black border-b border-black">
              Nature에 가입하기
            </Link>
          </p>
        </div>
        <div className="flex flex-row mt-2">
          <Link to="http://nature-gangwon.shop/auth/oauth2/kakao">
            <img
              className=" h-8 bg-cover mr-2"
              src={naverLoginImg}
              alt="로그인이미지"
            />
          </Link>
          <Link to="http://nature-gangwon.shop/auth/oauth2/naver">
            <img
              className=" h-8 bg-cover mr-2"
              src={kokooLoginImg}
              alt="로그인이미지"
            />
          </Link>
          <Link to="http://nature-gangwon.shop/auth/oauth2/google">
            <img
              className=" h-8 bg-cover"
              src={gogleLoginImg}
              alt="로그인이미지"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
