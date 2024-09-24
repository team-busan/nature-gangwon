import React from "react";

export default function FindPasswordStep1({
  email,
  handleSendCode,
  handleEmailChange,
  handleVerifyCode,
  setVerificationCode,
}) {
  return (
    <div>
      <form onSubmit={handleSendCode} className="flex flex-col">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          이메일
        </label>
        <input
          type="email"
          value={email}
          required
          placeholder="이메일을 입력 해주세요"
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          onChange={(e) => handleEmailChange(e)}
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300"
        >
          인증메일 보내기
        </button>
      </form>
      <form onSubmit={handleVerifyCode} className="flex flex-col mt-4">
        <label className="block text-gray-700 mb-2">인증번호</label>
        <input
          type="text"
          required
          className="border border-gray-300 p-2 rounded-md w-full mb-4"
          onChange={(e) => setVerificationCode(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-gray-400 text-white p-3 rounded-full font-semibold hover:bg-softGreen transition duration-300"
        >
          인증 확인
        </button>
      </form>
    </div>
  );
}
