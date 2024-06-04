import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/member/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.isSuccess) {
        localStorage.setItem('accessToken', data.result.accessToken); // Access Token 저장
        localStorage.setItem('refreshToken', data.result.refreshToken); // Refresh Token 저장
        navigate('/'); // 메인 페이지로 리디렉션
      } else {
        alert('로그인 실패: ' + data.message); // 에러 처리
      }
    } catch (error) {
      console.error('Error:', error);
      alert('로그인 중 오류가 발생했습니다.'); // 에러 처리
    }
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="p-8 w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">아이디</label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
            <label htmlFor="remember" className="text-gray-600 ml-2">로그인 상태 유지</label>
          </div>
          <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">비밀번호 찾기</a>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full">
            로그인
          </button>
        </form>
        <div className="mt-6 text-blue-500 text-center">
          <a href="/register" className="hover:underline">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
